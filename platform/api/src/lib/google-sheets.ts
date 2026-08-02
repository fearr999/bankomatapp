import { google } from "googleapis";
import { prisma } from "./prisma.js";

// Мы создаём Google Таблицу сами через сервисный аккаунт и открываем к ней
// доступ клиенту по email — без OAuth-флоу и ревью Google (это заняло бы
// недели). GOOGLE_SERVICE_ACCOUNT — JSON-ключ сервисного аккаунта одной
// строкой, тот же формат, что и FIREBASE_SERVICE_ACCOUNT (см. lib/fcm.ts).
// Сервисному аккаунту нужны включённые Google Sheets API и Google Drive API
// в проекте GCP.
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

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(getAuth());
}

const SHEET_TITLE = "Отчёты";
const HEADER_ROW = ["Дата", "Точка", "Адрес", "Бригада", "Тип работ", "Фото", "Ссылки на фото", "Комментарий"];

export async function createReportSheet(orgName: string, shareWithEmail: string) {
  const authClient = getAuth();
  if (!authClient) throw new Error("Google Sheets не настроен (нет GOOGLE_SERVICE_ACCOUNT)");

  const sheets = google.sheets({ version: "v4", auth: authClient });
  const drive = google.drive({ version: "v3", auth: authClient });

  const created = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: `Corpi — Отчёты — ${orgName}` },
      sheets: [{ properties: { title: SHEET_TITLE, gridProperties: { frozenRowCount: 1 } } }],
    },
  });
  const spreadsheetId = created.data.spreadsheetId;
  const spreadsheetUrl = created.data.spreadsheetUrl;
  if (!spreadsheetId || !spreadsheetUrl) throw new Error("Google не вернул id/url созданной таблицы");

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TITLE}!A1`,
    valueInputOption: "RAW",
    requestBody: { values: [HEADER_ROW] },
  });

  const sheetId = created.data.sheets?.[0]?.properties?.sheetId ?? 0;
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.93, green: 0.93, blue: 0.95 } } },
            fields: "userEnteredFormat(textFormat,backgroundColor)",
          },
        },
      ],
    },
  });

  // sendNotificationEmail — клиент получает от Google письмо "с вами
  // поделились таблицей", без единого технического шага с его стороны.
  // Роль "reader" — это авто-генерируемый отчёт, редактировать его руками
  // не должны, чтобы не сломать структуру синка.
  await drive.permissions.create({
    fileId: spreadsheetId,
    sendNotificationEmail: true,
    requestBody: { type: "user", role: "reader", emailAddress: shareWithEmail },
  });

  return { spreadsheetId, spreadsheetUrl };
}

async function appendReportRow(
  spreadsheetId: string,
  row: { date: Date; siteName: string; address: string; teamName: string; requestType: string; photoUrls: string[]; comment: string }
) {
  const authClient = getAuth();
  if (!authClient) return;
  const sheets = google.sheets({ version: "v4", auth: authClient });

  const previewFormula = row.photoUrls[0] ? `=IMAGE("${row.photoUrls[0]}")` : "";
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TITLE}!A:A`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          row.date.toLocaleString("ru-RU"),
          row.siteName,
          row.address,
          row.teamName,
          row.requestType,
          previewFormula,
          row.photoUrls.join("\n"),
          row.comment,
        ],
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
        site: { select: { name: true, address: true } },
        team: { select: { name: true } },
        attachments: { where: { kind: "photo" }, select: { url: true }, orderBy: { createdAt: "asc" } },
      },
    })
    .catch(() => null);
  if (!order) return;

  const integration = await prisma.googleSheetIntegration.findUnique({ where: { organizationId: order.organizationId } }).catch(() => null);
  if (!integration) return;

  try {
    const apiPublicUrl = process.env.API_PUBLIC_URL;
    const photoUrls = apiPublicUrl ? order.attachments.map((a) => `${apiPublicUrl}${a.url}`) : [];

    await appendReportRow(integration.spreadsheetId, {
      date: order.updatedAt,
      siteName: order.site?.name ?? order.title,
      address: order.site?.address ?? "",
      teamName: order.team?.name ?? "",
      requestType: order.requestType,
      photoUrls,
      comment: order.description ?? "",
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
