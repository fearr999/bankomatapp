import { google, type sheets_v4 } from "googleapis";
import { prisma } from "./prisma.js";

// Мы создаём Google Таблицу сами через сервисный аккаунт и открываем к ней
// доступ клиенту по email — без OAuth-флоу и ревью Google (это заняло бы
// недели). GOOGLE_SERVICE_ACCOUNT — JSON-ключ сервисного аккаунта одной
// строкой, тот же формат, что и FIREBASE_SERVICE_ACCOUNT (см. lib/fcm.ts).
// Сервисному аккаунту нужны включённые Google Sheets API и Google Drive API
// в проекте GCP.
//
// GOOGLE_SHARED_DRIVE_ID обязателен: у голого сервисного аккаунта (без
// Google Workspace domain-wide delegation) нет ни байта собственного места
// на Диске — create() в "My Drive" всегда падает с permission-ошибкой,
// сколько бы прав/API ни было включено. Таблицы поэтому создаются внутри
// Общего диска (Shared Drive) Workspace-аккаунта, куда сервисный аккаунт
// добавлен участником (Content Manager) — там есть настоящее хранилище.
let auth: InstanceType<typeof google.auth.GoogleAuth> | null | undefined;

function getAuth() {
  if (auth !== undefined) return auth;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!raw) {
    auth = null;
    return auth;
  }
  try {
    const credentials = JSON.parse(raw);
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"],
    });
  } catch (err) {
    console.error("GOOGLE_SERVICE_ACCOUNT задан, но не распарсился как JSON:", (err as Error).message);
    auth = null;
  }
  return auth;
}

function getSharedDriveId(): string | null {
  return process.env.GOOGLE_SHARED_DRIVE_ID || null;
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(getAuth()) && Boolean(getSharedDriveId());
}

// googleapis/gaxios обрезают текст ошибки до общей фразы вроде "The caller
// does not have permission" — реальная причина (reason/domain/status) лежит
// глубже, в теле HTTP-ответа Google. Достаём её, если она есть.
function describeGoogleError(err: unknown): string {
  const base = err instanceof Error ? err.message : String(err);
  const data = (err as { response?: { data?: unknown } })?.response?.data as
    | { error?: { message?: string; status?: string; errors?: Array<{ reason?: string; domain?: string; message?: string }> } }
    | undefined;
  const apiError = data?.error;
  if (!apiError) return base;
  const parts = [apiError.message ?? base];
  if (apiError.status) parts.push(`status=${apiError.status}`);
  const detail = apiError.errors?.[0];
  if (detail?.reason) parts.push(`reason=${detail.reason}`);
  if (detail?.domain) parts.push(`domain=${detail.domain}`);
  return parts.join(" | ");
}

// Формат таблицы — не наш собственный лог, а сетка «банкомат × дата»,
// повторяющая рабочий шаблон, которым клиент уже пользуется вручную:
// столбец A — банкомат, дальше по столбцу на каждый день уборки; в ячейке —
// ссылка на фото за этот день; строка целиком подсвечивается красным, если
// заявка на уборку этого банкомата закрыта с просрочкой SLA.
const SHEET_TITLE = "Банкоматы";
const DATA_START_ROW = 3; // строки 1-2 — заголовок (дата/день недели)
const DATA_START_COL = 2; // столбец A — банкомат, даты с B
const WEEKDAY_RU = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

function columnToLetter(col: number): string {
  let letter = "";
  let n = col;
  while (n > 0) {
    const rem = (n - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}

function formatDateColumn(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export async function createAtmTrackingSheet(organizationId: string, orgName: string, shareWithEmail: string) {
  const authClient = getAuth();
  if (!authClient) throw new Error("Google Sheets не настроен (нет GOOGLE_SERVICE_ACCOUNT)");
  const driveId = getSharedDriveId();
  if (!driveId) throw new Error("Google Sheets не настроен (нет GOOGLE_SHARED_DRIVE_ID)");

  const equipment = await prisma.equipment.findMany({
    where: { organizationId, deviceType: { in: ["atm", "cardomat"] } },
    select: { name: true },
    orderBy: { name: "asc" },
  });

  const sheets = google.sheets({ version: "v4", auth: authClient });
  const drive = google.drive({ version: "v3", auth: authClient });

  // Создаём файл через Drive API внутри Общего диска (не sheets.spreadsheets.create,
  // у которого нет параметра для целевой папки/диска) — тогда файл сразу
  // физически лежит в хранилище Общего диска, а не в несуществующем личном
  // месте сервисного аккаунта.
  let spreadsheetId: string | null | undefined;
  let spreadsheetUrl: string;
  try {
    const created = await drive.files.create({
      requestBody: { name: `Corpi — Банкоматы — ${orgName}`, mimeType: "application/vnd.google-apps.spreadsheet", parents: [driveId] },
      supportsAllDrives: true,
      fields: "id, webViewLink",
    });
    spreadsheetId = created.data.id;
    spreadsheetUrl = created.data.webViewLink ?? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  } catch (err) {
    throw new Error(`drive.files.create: ${describeGoogleError(err)}`);
  }
  if (!spreadsheetId) throw new Error("Google не вернул id созданной таблицы");

  // Новый файл рождается с одним листом ("Sheet1", gid обычно 0) — переименовываем
  // его в наш SHEET_TITLE и настраиваем закреплённые строку/столбец, вместо
  // того чтобы задавать это при создании (как раньше через sheets.spreadsheets.create).
  let sheetId = 0;
  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: "sheets.properties" });
    sheetId = meta.data.sheets?.[0]?.properties?.sheetId ?? 0;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            updateSheetProperties: {
              properties: { sheetId, title: SHEET_TITLE, gridProperties: { frozenRowCount: 2, frozenColumnCount: 1 } },
              fields: "title,gridProperties(frozenRowCount,frozenColumnCount)",
            },
          },
        ],
      },
    });
  } catch (err) {
    throw new Error(`configure sheet: ${describeGoogleError(err)}`);
  }

  // Строка 1 — заголовок столбца A, строка 2 — пусто в столбце A (там, правее,
  // будут дни недели над датами), с 3-й строки — уже сами банкоматы, все
  // текущие точки организации подставляются сразу при создании таблицы.
  const rows: string[][] = [["Банкомат"], [""], ...equipment.map((e) => [e.name])];
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TITLE}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });
  } catch (err) {
    throw new Error(`values.update: ${describeGoogleError(err)}`);
  }

  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: { sheetId, startRowIndex: 0, endRowIndex: 2 },
              cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.93, green: 0.93, blue: 0.95 } } },
              fields: "userEnteredFormat(textFormat,backgroundColor)",
            },
          },
        ],
      },
    });
  } catch (err) {
    throw new Error(`batchUpdate (header format): ${describeGoogleError(err)}`);
  }

  // sendNotificationEmail — клиент получает от Google письмо "с вами
  // поделились таблицей", без единого технического шага с его стороны.
  // Роль "reader" — это авто-генерируемая доска, редактировать её руками
  // не должны, чтобы не сломать структуру синка. supportsAllDrives обязателен —
  // файл живёт в Общем диске, а не в личном пространстве.
  try {
    await drive.permissions.create({
      fileId: spreadsheetId,
      supportsAllDrives: true,
      sendNotificationEmail: true,
      requestBody: { type: "user", role: "reader", emailAddress: shareWithEmail },
    });
  } catch (err) {
    throw new Error(`drive.permissions.create (share): ${describeGoogleError(err)}`);
  }

  return { spreadsheetId, spreadsheetUrl };
}

async function getSheetGid(sheets: sheets_v4.Sheets, spreadsheetId: string, sheetName: string): Promise<number> {
  const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: "sheets.properties" });
  const sheet = meta.data.sheets?.find((s) => s.properties?.title === sheetName);
  return sheet?.properties?.sheetId ?? 0;
}

async function findOrCreateDateColumn(sheets: sheets_v4.Sheets, spreadsheetId: string, date: Date) {
  const dateStr = formatDateColumn(date);
  const header = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!B1:ZZ1` });
  const existing = header.data.values?.[0] ?? [];
  const foundIdx = existing.findIndex((v) => v === dateStr);
  if (foundIdx !== -1) return { col: foundIdx + DATA_START_COL, dateStr };

  const col = existing.length + DATA_START_COL;
  const letter = columnToLetter(col);
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!${letter}1:${letter}2`,
    valueInputOption: "RAW",
    requestBody: { values: [[dateStr], [WEEKDAY_RU[date.getDay()]]] },
  });
  return { col, dateStr };
}

async function findOrCreateEquipmentRow(sheets: sheets_v4.Sheets, spreadsheetId: string, equipmentName: string) {
  const colA = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_TITLE}!A${DATA_START_ROW}:A` });
  const existing = (colA.data.values ?? []).map((r) => r[0]);
  const foundIdx = existing.findIndex((v) => v === equipmentName);
  if (foundIdx !== -1) return foundIdx + DATA_START_ROW;

  const row = existing.length + DATA_START_ROW;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!A${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [[equipmentName]] },
  });
  return row;
}

async function markAtmCleaned(
  spreadsheetId: string,
  params: { equipmentName: string; date: Date; photoUrl?: string; overdue: boolean }
) {
  const authClient = getAuth();
  if (!authClient) return;
  const sheets = google.sheets({ version: "v4", auth: authClient });

  const { col, dateStr } = await findOrCreateDateColumn(sheets, spreadsheetId, params.date);
  const row = await findOrCreateEquipmentRow(sheets, spreadsheetId, params.equipmentName);
  const letter = columnToLetter(col);

  // "UZUM1001" → "1001 28.07" — короткая метка как в референс-таблице клиента.
  const shortCode = params.equipmentName.match(/\d+$/)?.[0];
  const label = shortCode ? `${shortCode} ${dateStr}` : dateStr;
  const cellValue = params.photoUrl ? `=HYPERLINK("${params.photoUrl}","${label}")` : label;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!${letter}${row}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[cellValue]] },
  });

  // Подсветка строки целиком красным при просрочке SLA — аналог красной
  // строки-флага "проблемного" банкомата в референс-таблице клиента; при
  // своевременной уборке подсветка снимается (фон сбрасывается на белый).
  const sheetId = await getSheetGid(sheets, spreadsheetId, SHEET_TITLE);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId, startRowIndex: row - 1, endRowIndex: row, startColumnIndex: 0, endColumnIndex: col },
            cell: {
              userEnteredFormat: {
                backgroundColor: params.overdue ? { red: 0.96, green: 0.4, blue: 0.4 } : { red: 1, green: 1, blue: 1 },
              },
            },
            fields: "userEnteredFormat.backgroundColor",
          },
        },
      ],
    },
  });
}

/// Синк одной завершённой заявки на уборку в подключённую таблицу
/// организации. Никогда не бросает исключение наружу — вызывается из
/// основного потока смены статуса заявки, ошибка Google API не должна
/// мешать сотруднику закрыть заявку.
export async function syncCleaningReportToSheet(workOrderId: string) {
  if (!isGoogleSheetsConfigured()) return;

  const order = await prisma.workOrder
    .findUnique({
      where: { id: workOrderId },
      include: {
        equipment: { select: { name: true } },
        attachments: { where: { kind: "photo" }, select: { url: true }, orderBy: { createdAt: "asc" } },
      },
    })
    .catch(() => null);
  // Заявка не привязана к конкретному банкомату — некуда положить отметку в сетке.
  if (!order || !order.equipment) return;

  const integration = await prisma.googleSheetIntegration.findUnique({ where: { organizationId: order.organizationId } }).catch(() => null);
  if (!integration) return;

  try {
    const apiPublicUrl = process.env.API_PUBLIC_URL;
    const photoUrl = apiPublicUrl && order.attachments[0] ? `${apiPublicUrl}${order.attachments[0].url}` : undefined;
    const overdue = order.slaDueAt ? order.updatedAt > order.slaDueAt : false;

    await markAtmCleaned(integration.spreadsheetId, {
      equipmentName: order.equipment.name,
      date: order.updatedAt,
      photoUrl,
      overdue,
    });

    await prisma.googleSheetIntegration.update({
      where: { id: integration.id },
      data: { status: "active", lastSyncedAt: new Date(), lastError: null },
    });
  } catch (err) {
    console.error("Не удалось синхронизировать заявку в Google Таблицу:", (err as Error).message);
    await prisma.googleSheetIntegration
      .update({ where: { id: integration.id }, data: { status: "error", lastError: (err as Error).message } })
      .catch(() => {});
  }
}
