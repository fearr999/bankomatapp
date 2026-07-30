/**
 * ============================================================
 *  МЕРЧЕНДАЙЗИНГ — BACKEND НА GOOGLE APPS SCRIPT
 * ============================================================
 * Разверните как Web App:
 *   Deploy -> New deployment -> Type: Web app
 *   Execute as: Me
 *   Who has access: Anyone (URL остаётся секретным + защищён API_KEY)
 *
 * Перед деплоем обязательно задайте Script Properties (File -> Project properties
 * -> Script properties):
 *   API_KEY          — любая длинная случайная строка, та же должна быть в
 *                       lib/config/app_config.dart (apiKey)
 *   DRIVE_FOLDER_ID   — ID папки Google Drive для хранения фото
 *                       (создайте папку, возьмите ID из её URL)
 *
 * Структура листов таблицы — см. SHEETS_SETUP.md в этой же папке.
 * ============================================================
 */

const SESSION_TTL_HOURS = 12;

function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);

    if (!validateApiKey_(requestData)) {
      return jsonOut_({ status: 'error', message: 'Invalid API key' });
    }

    const action = requestData.action;
    switch (action) {
      case 'login':
        return handleLogin_(requestData);
      case 'getBusinesses':
        return handleGetBusinesses_(requestData);
      case 'getTasks':
        return handleGetTasks_(requestData);
      case 'submitCheckIn':
        return handleSubmitCheckIn_(requestData);
      case 'submitCheckOut':
        return handleSubmitCheckOut_(requestData);
      case 'submitReport':
        return handleSubmitReport_(requestData);
      case 'submitChecklist':
        return handleSubmitChecklist_(requestData);
      case 'uploadPhoto':
        return handleUploadPhoto_(requestData);
      case 'getAdminStatus':
        return handleGetAdminStatus_(requestData);
      case 'getCycleOverview':
        return handleGetCycleOverview_(requestData);
      default:
        return jsonOut_({ status: 'error', message: 'Invalid action' });
    }
  } catch (err) {
    return jsonOut_({ status: 'error', message: err.toString() });
  }
}

// ---------------------------------------------------------------
// AUTH
// ---------------------------------------------------------------

function validateApiKey_(data) {
  const expected = PropertiesService.getScriptProperties().getProperty('API_KEY');
  return expected && data.apiKey === expected;
}

function handleLogin_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const users = sheetToObjects_(ss.getSheetByName('Users'));
  const user = users.find(u => String(u.PIN) === String(data.pin));

  if (!user) {
    return jsonOut_({ status: 'error', message: 'Неверный PIN-код' });
  }

  const token = Utilities.getUuid();
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_TTL_HOURS * 60 * 60 * 1000);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    let sessions = ss.getSheetByName('Sessions');
    if (!sessions) {
      sessions = ss.insertSheet('Sessions');
      sessions.appendRow(['Token', 'User_ID', 'Created_At', 'Expires_At']);
    }
    sessions.appendRow([token, user.User_ID, now.toISOString(), expires.toISOString()]);
  } finally {
    lock.releaseLock();
  }

  return jsonOut_({
    status: 'success',
    token: token,
    userId: user.User_ID,
    name: user.Name,
    role: user.Role,
  });
}

/** Возвращает {userId, role} или null, если токен неверный/просрочен */
function checkSession_(token) {
  if (!token) return null;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sessions = ss.getSheetByName('Sessions');
  if (!sessions) return null;
  const rows = sheetToObjects_(sessions);
  const session = rows.find(r => r.Token === token);
  if (!session) return null;
  if (new Date(session.Expires_At) < new Date()) return null;

  const users = sheetToObjects_(ss.getSheetByName('Users'));
  const user = users.find(u => u.User_ID === session.User_ID);
  if (!user) return null;
  return { userId: user.User_ID, role: user.Role, name: user.Name };
}

// ---------------------------------------------------------------
// BUSINESSES (мультибизнес: мерч, банкоматы, и т.д.)
// ---------------------------------------------------------------

function handleGetBusinesses_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Businesses');
  const rows = sheetToObjects_(sheet);

  const businesses = rows.map(b => {
    let schema = [];
    try {
      schema = b.Checklist_Schema_JSON ? JSON.parse(b.Checklist_Schema_JSON) : [];
    } catch (e) {
      schema = [];
    }
    return {
      businessId: b.Business_ID,
      name: b.Name,
      icon: b.Icon || '📋',
      color: b.Color || '#3F51B5',
      taskMode: b.Task_Mode || 'daily',
      checklistSchema: schema,
    };
  });

  return jsonOut_({ status: 'success', businesses: businesses });
}

// ---------------------------------------------------------------
// TASKS / CATALOG
// ---------------------------------------------------------------

function handleGetTasks_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const products = sheetToObjects_(ss.getSheetByName('Products'));
  const productList = products.map(p => ({
    productId: p.Product_ID,
    category: p.Category,
    skuName: p.SKU_Name,
    barcode: p.Barcode,
    price: Number(p.Price) || 0,
  }));

  // Точки без Business_ID (старые строки, добавленные до мультибизнеса) считаем 'merch'
  const requestedBusinessId = data.businessId || 'merch';
  const business = getBusinessRow_(ss, requestedBusinessId);
  const taskMode = (business && business.Task_Mode === 'cycle') ? 'cycle' : 'daily';

  if (taskMode === 'cycle') {
    const result = generateCycleTasks_(ss, session.userId, requestedBusinessId);
    return jsonOut_({
      status: 'success',
      tasks: result.tasks,
      products: productList,
      cycleInfo: result.cycleInfo,
    });
  }

  // --- Старый режим: точки на сегодня, заполняется вручную в листе Tasks ---
  const tasks = sheetToObjects_(ss.getSheetByName('Tasks'));
  const stores = sheetToObjects_(ss.getSheetByName('Stores'));
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

  const myTasks = tasks
    .filter(t => t.User_ID === session.userId && formatDateCell_(t.Scheduled_Date) === today)
    .map(t => {
      const store = stores.find(s => s.Store_ID === t.Store_ID) || {};
      const storeBusinessId = store.Business_ID || 'merch';
      return { t, store, storeBusinessId };
    })
    .filter(x => x.storeBusinessId === requestedBusinessId)
    .map(x => ({
      taskId: x.t.Task_ID,
      storeId: x.t.Store_ID,
      storeName: x.store.Name || '',
      address: x.store.Address || '',
      lat: Number(x.store.Latitude) || 0,
      lng: Number(x.store.Longitude) || 0,
      allowedRadiusMeters: Number(x.store.Allowed_Radius_Meters) || 100,
      status: x.t.Status || 'Pending',
      scheduledDate: x.t.Scheduled_Date,
    }));

  return jsonOut_({ status: 'success', tasks: myTasks, products: productList, cycleInfo: null });
}

// ---------------------------------------------------------------
// ЦИКЛОВЫЙ РЕЖИМ (например, банкоматы) — без ежедневного Tasks:
// устройство закрепляется за работником один раз в листе Stores
// (колонка Assigned_User_ID), а "что осталось убрать" считается
// на лету по факту завершённых визитов с начала текущего цикла.
// Когда все устройства бригады закрыты — цикл сам обнуляется.
// ---------------------------------------------------------------

function getBusinessRow_(ss, businessId) {
  const rows = sheetToObjects_(ss.getSheetByName('Businesses'));
  return rows.find(b => b.Business_ID === businessId) || null;
}

function generateCycleTasks_(ss, userId, businessId) {
  const stores = sheetToObjects_(ss.getSheetByName('Stores'))
    .filter(s => (s.Business_ID || '') === businessId && String(s.Assigned_User_ID || '') === String(userId));

  let cycle = getOrCreateCycle_(ss, userId, businessId);
  let doneIds = getCompletedStoreIdsSince_(ss, userId, cycle.cycleStart);
  let pending = stores.filter(s => !doneIds.has(s.Store_ID));

  // Все устройства закрыты в этом цикле -> сам начинаем новый цикл
  if (stores.length > 0 && pending.length === 0) {
    cycle = advanceCycle_(ss, userId, businessId);
    doneIds = new Set();
    pending = stores;
  }

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const tasks = pending.map(s => ({
    taskId: 'CYC_' + s.Store_ID,
    storeId: s.Store_ID,
    storeName: s.Name || '',
    address: s.Address || '',
    lat: Number(s.Latitude) || 0,
    lng: Number(s.Longitude) || 0,
    allowedRadiusMeters: Number(s.Allowed_Radius_Meters) || 100,
    status: 'Pending',
    scheduledDate: today,
  }));

  return {
    tasks: tasks,
    cycleInfo: {
      cycleNumber: cycle.cycleNumber,
      total: stores.length,
      done: stores.length - pending.length,
    },
  };
}

/** Множество Store_ID, у которых есть завершённый визит этого работника
 *  с CheckIn_Time не раньше начала цикла. */
function getCompletedStoreIdsSince_(ss, userId, sinceDate) {
  const visits = sheetToObjects_(ss.getSheetByName('Visits_Log'));
  const result = new Set();
  visits.forEach(v => {
    if (v.User_ID !== userId) return;
    if (v.Status !== 'Completed') return;
    const checkIn = new Date(v.CheckIn_Time);
    if (isNaN(checkIn.getTime())) return;
    if (checkIn.getTime() >= sinceDate.getTime()) result.add(v.Store_ID);
  });
  return result;
}

function getOrCreateCycle_(ss, userId, businessId) {
  let sheet = ss.getSheetByName('Cycles');
  if (!sheet) {
    sheet = ss.insertSheet('Cycles');
    sheet.appendRow(['User_ID', 'Business_ID', 'Cycle_Number', 'Cycle_Start_Date']);
  }
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(userId) && values[i][1] === businessId) {
      return {
        rowIndex: i + 1,
        cycleNumber: Number(values[i][2]) || 1,
        cycleStart: new Date(values[i][3]),
      };
    }
  }
  const now = new Date();
  sheet.appendRow([userId, businessId, 1, now.toISOString()]);
  return { rowIndex: sheet.getLastRow(), cycleNumber: 1, cycleStart: now };
}

function advanceCycle_(ss, userId, businessId) {
  const sheet = ss.getSheetByName('Cycles');
  const values = sheet.getDataRange().getValues();
  const now = new Date();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(userId) && values[i][1] === businessId) {
      const newNumber = (Number(values[i][2]) || 1) + 1;
      sheet.getRange(i + 1, 3).setValue(newNumber);
      sheet.getRange(i + 1, 4).setValue(now.toISOString());
      return { cycleNumber: newNumber, cycleStart: now };
    }
  }
  // Не нашли строку (не должно происходить, но подстрахуемся)
  sheet.appendRow([userId, businessId, 1, now.toISOString()]);
  return { cycleNumber: 1, cycleStart: now };
}

// ---------------------------------------------------------------
// VISITS (CHECK-IN / CHECK-OUT)
// ---------------------------------------------------------------

function haversineMeters_(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = d => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function handleSubmitCheckIn_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    // Защита от дублей в цикловом режиме (например, банкоматы): если это
    // устройство уже отмечено завершённым в текущем цикле — не создаём
    // ещё одну запись (актуально для повторной отправки из офлайн-очереди).
    if (data.businessId) {
      const business = getBusinessRow_(ss, data.businessId);
      if (business && business.Task_Mode === 'cycle') {
        const cycle = getOrCreateCycle_(ss, session.userId, data.businessId);
        const doneIds = getCompletedStoreIdsSince_(ss, session.userId, cycle.cycleStart);
        if (doneIds.has(data.storeId)) {
          return jsonOut_({ status: 'error', message: 'Это устройство уже отмечено в текущем цикле' });
        }
      }
    }

    const logSheet = ss.getSheetByName('Visits_Log');
    const logId = 'LOG_' + new Date().getTime();

    // Серверная перепроверка расстояния (защита от подделки данных на клиенте)
    const stores = sheetToObjects_(ss.getSheetByName('Stores'));
    const store = stores.find(s => s.Store_ID === data.storeId);
    let serverDistance = data.distanceError;
    if (store) {
      serverDistance = haversineMeters_(
        data.lat, data.lng, Number(store.Latitude), Number(store.Longitude)
      );
    }

    const status = data.isMockLocation ? 'Mock_Location_Flagged' : 'In_Progress';

    logSheet.appendRow([
      logId,
      session.userId,
      data.storeId,
      data.checkInTime,
      '',
      data.lat,
      data.lng,
      serverDistance,
      status,
    ]);

    // Обновляем статус задачи на "В работе"
    const taskSheet = ss.getSheetByName('Tasks');
    const taskValues = taskSheet.getDataRange().getValues();
    for (let i = 1; i < taskValues.length; i++) {
      if (taskValues[i][1] === session.userId && taskValues[i][2] === data.storeId) {
        taskSheet.getRange(i + 1, 4).setValue('In_Progress'); // колонка Status
        break;
      }
    }

    return jsonOut_({ status: 'success', logId: logId, distanceMeters: serverDistance });
  } finally {
    lock.releaseLock();
  }
}

function handleSubmitCheckOut_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const logSheet = ss.getSheetByName('Visits_Log');
    const values = logSheet.getDataRange().getValues();
    let found = false;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === data.logId) {
        logSheet.getRange(i + 1, 5).setValue(data.checkOutTime); // CheckOut_Time
        logSheet.getRange(i + 1, 9).setValue('Completed'); // Status
        found = true;
        break;
      }
    }
    if (!found) return jsonOut_({ status: 'error', message: 'Визит не найден' });
    return jsonOut_({ status: 'success' });
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------
// REPORTS (SKU)
// ---------------------------------------------------------------

function handleSubmitReport_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = ss.getSheetByName('Report_Details');
    const rows = data.items.map(item => [
      'RPT_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000),
      data.logId,
      item.productId,
      item.isAvailable,
      item.stockQty,
      item.facingQty,
      item.actualPrice,
    ]);
    if (rows.length > 0) {
      sheet
        .getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length)
        .setValues(rows);
    }
    return jsonOut_({ status: 'success', count: rows.length });
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------
// CHECKLISTS (генерик-отчёт для не-мерч бизнесов, например банкоматы)
// ---------------------------------------------------------------

function handleSubmitChecklist_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const business = getBusinessRow_(ss, data.businessId);
    const store = findStoreByLogId_(ss, data.logId);

    // Если для бизнеса указана таблица клиента — пишем отчёт напрямую туда,
    // с защитой от повторной отправки за тот же день по этой точке.
    if (business && business.Client_Sheet_ID && store) {
      const dup = writeToClientSheet_(business, store, data.answers || {});
      if (dup) {
        return jsonOut_({ status: 'error', message: 'Отчёт по этой точке на сегодня уже отправлен' });
      }
    }

    let sheet = ss.getSheetByName('Checklist_Reports');
    if (!sheet) {
      sheet = ss.insertSheet('Checklist_Reports');
      sheet.appendRow(['Report_ID', 'Log_ID', 'Business_ID', 'Payload_JSON', 'Timestamp']);
    }
    const reportId = 'CHK_' + new Date().getTime();
    sheet.appendRow([
      reportId,
      data.logId,
      data.businessId || '',
      JSON.stringify(data.answers || {}),
      new Date().toISOString(),
    ]);
    return jsonOut_({ status: 'success', reportId: reportId });
  } finally {
    lock.releaseLock();
  }
}

/** Находит строку Stores по Store_ID, привязанному к данному Log_ID в Visits_Log */
function findStoreByLogId_(ss, logId) {
  const logs = sheetToObjects_(ss.getSheetByName('Visits_Log'));
  const log = logs.find(l => l.Log_ID === logId);
  if (!log) return null;
  const stores = sheetToObjects_(ss.getSheetByName('Stores'));
  return stores.find(s => s.Store_ID === log.Store_ID) || null;
}

/** ID-строки для таблицы клиента: числовая часть Store_ID + '.' + ДД.ММ (сегодня). Пример: "1074.30.07" */
function buildClientRowId_(storeId) {
  const digits = String(storeId).replace(/[^0-9]/g, '') || String(storeId);
  const now = new Date();
  const tz = Session.getScriptTimeZone();
  const dd = Utilities.formatDate(now, tz, 'dd');
  const mm = Utilities.formatDate(now, tz, 'MM');
  return digits + '.' + dd + '.' + mm;
}

/** Пишет строку отчёта в таблицу клиента (Business.Client_Sheet_ID).
 *  Возвращает true, если сегодняшний отчёт по этой точке уже есть (дубль), иначе false. */
function writeToClientSheet_(business, store, answers) {
  const clientSs = SpreadsheetApp.openById(business.Client_Sheet_ID);
  const tabName = business.Name || 'Отчёты';
  let sheet = clientSs.getSheetByName(tabName);
  if (!sheet) {
    sheet = clientSs.insertSheet(tabName);
    sheet.appendRow(['ID', 'Store_ID', 'Название', 'Адрес', 'Ответы', 'Время']);
  }

  const rowId = buildClientRowId_(store.Store_ID);

  // Дедупликация: смотрим, нет ли уже сегодняшнего ID в колонке A
  const existingIds = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues().flat();
  if (existingIds.indexOf(rowId) !== -1) {
    return true;
  }

  sheet.appendRow([
    rowId,
    store.Store_ID,
    store.Name || '',
    store.Address || '',
    JSON.stringify(answers),
    new Date().toISOString(),
  ]);
  return false;
}

// ---------------------------------------------------------------
// PHOTOS
// ---------------------------------------------------------------

function handleUploadPhoto_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });

  const ssForBusiness = SpreadsheetApp.getActiveSpreadsheet();
  const business = data.businessId ? getBusinessRow_(ssForBusiness, data.businessId) : null;
  // Если у бизнеса указана своя папка (Businesses.Drive_Folder_ID) — фото идут туда,
  // иначе используется общая DRIVE_FOLDER_ID из Script Properties.
  const folderId = (business && business.Drive_Folder_ID) ||
    PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID');
  if (!folderId) {
    return jsonOut_({ status: 'error', message: 'DRIVE_FOLDER_ID не задан в Script Properties' });
  }

  const folder = DriveApp.getFolderById(folderId);
  const bytes = Utilities.base64Decode(data.fileBase64);
  const blob = Utilities.newBlob(bytes, data.mimeType || 'image/jpeg',
    `${data.logId}_${data.type}_${new Date().getTime()}.jpg`);
  const file = folder.createFile(blob);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = ss.getSheetByName('Photos');
    const photoId = 'PHOTO_' + new Date().getTime();
    sheet.appendRow([photoId, data.logId, data.type, file.getUrl(), data.timestamp]);
    return jsonOut_({ status: 'success', photoId: photoId, url: file.getUrl() });
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------
// ADMIN
// ---------------------------------------------------------------

function handleGetAdminStatus_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });
  if (session.role !== 'Admin') {
    return jsonOut_({ status: 'error', message: 'Доступно только администратору' });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logs = sheetToObjects_(ss.getSheetByName('Visits_Log'));
  const stores = sheetToObjects_(ss.getSheetByName('Stores'));
  const users = sheetToObjects_(ss.getSheetByName('Users'));

  const active = logs
    .filter(l => l.Status === 'In_Progress' || l.Status === 'Mock_Location_Flagged')
    .map(l => {
      const store = stores.find(s => s.Store_ID === l.Store_ID) || {};
      const user = users.find(u => u.User_ID === l.User_ID) || {};
      return {
        logId: l.Log_ID,
        userName: user.Name || l.User_ID,
        storeName: store.Name || l.Store_ID,
        checkInTime: l.CheckIn_Time,
        status: l.Status,
        distanceError: l.Distance_Error_Meters,
      };
    });

  return jsonOut_({ status: 'success', activeVisits: active });
}

/** Для руководителя: прогресс по каждому работнику в каждом цикловом
 *  бизнесе (сколько устройств закрыто из скольких закреплено),
 *  плюс список ещё не закрытых устройств по каждому. */
function handleGetCycleOverview_(data) {
  const session = checkSession_(data.token);
  if (!session) return jsonOut_({ status: 'error', message: 'Сессия истекла, войдите заново' });
  if (session.role !== 'Admin') {
    return jsonOut_({ status: 'error', message: 'Доступно только администратору' });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const businesses = sheetToObjects_(ss.getSheetByName('Businesses'))
    .filter(b => b.Task_Mode === 'cycle');
  const stores = sheetToObjects_(ss.getSheetByName('Stores'));
  const users = sheetToObjects_(ss.getSheetByName('Users'));

  const groups = [];
  businesses.forEach(b => {
    const assignedUserIds = Array.from(new Set(
      stores
        .filter(s => s.Business_ID === b.Business_ID && s.Assigned_User_ID)
        .map(s => String(s.Assigned_User_ID))
    ));

    assignedUserIds.forEach(userId => {
      const userStores = stores.filter(s =>
        s.Business_ID === b.Business_ID && String(s.Assigned_User_ID) === userId);
      const cycle = getOrCreateCycle_(ss, userId, b.Business_ID);
      const doneIds = getCompletedStoreIdsSince_(ss, userId, cycle.cycleStart);
      const user = users.find(u => u.User_ID === userId) || {};

      groups.push({
        businessId: b.Business_ID,
        businessName: b.Name,
        userId: userId,
        userName: user.Name || userId,
        cycleNumber: cycle.cycleNumber,
        cycleStartDate: cycle.cycleStart.toISOString(),
        total: userStores.length,
        done: doneIds.size,
        pendingDevices: userStores
          .filter(s => !doneIds.has(s.Store_ID))
          .map(s => ({ storeId: s.Store_ID, name: s.Name })),
      });
    });
  });

  return jsonOut_({ status: 'success', groups: groups });
}

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------

/** Google Sheets может хранить дату и как объект Date, и как обычную строку —
 * приводим к единому виду 'yyyy-MM-dd' для сравнения. */
function formatDateCell_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(value).slice(0, 10);
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Превращает лист (первая строка — заголовки) в массив объектов */
function sheetToObjects_(sheet) {
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  const result = [];
  for (let i = 1; i < values.length; i++) {
    const obj = {};
    headers.forEach((h, idx) => (obj[h] = values[i][idx]));
    result.push(obj);
  }
  return result;
}
