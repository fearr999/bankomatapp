import ExcelJS from "exceljs";
import type { CleaningSummaryRow } from "./cleaning-report.js";

const DEVICE_LABELS: Record<string, string> = { atm: "Банкомат", cardomat: "Картомат" };
const ZERO_ROW_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8D7DA" } };

/// Excel-версия месячного отчёта по уборке. Строки банкоматов без единой
/// уборки за период подсвечены красным — та же конвенция "красная строка =
/// проблема", что и в ручной Google-таблице клиента (см. google-sheets.ts).
export async function generateCleaningSummaryWorkbook(
  rows: CleaningSummaryRow[],
  from: Date,
  to: Date
): Promise<ExcelJS.Workbook> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Corpi";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Уборка банкоматов");
  sheet.columns = [
    { header: "Банкомат", key: "name", width: 16 },
    { header: "Объект", key: "site", width: 26 },
    { header: "Тип", key: "type", width: 12 },
    { header: "Кол-во уборок", key: "count", width: 15 },
    { header: "Даты уборок", key: "dates", width: 50 },
  ];
  sheet.getRow(1).font = { bold: true };
  sheet.insertRow(1, [
    `Период: ${from.toLocaleDateString("ru-RU")} — ${to.toLocaleDateString("ru-RU")}`,
  ]);
  sheet.mergeCells("A1:E1");
  sheet.getRow(1).font = { italic: true, color: { argb: "FF666666" } };
  sheet.getRow(2).font = { bold: true };

  for (const r of rows) {
    const row = sheet.addRow({
      name: r.name,
      site: r.siteName ?? "—",
      type: DEVICE_LABELS[r.deviceType] ?? r.deviceType,
      count: r.count,
      dates: r.dates.length ? r.dates.map((d) => new Date(d).toLocaleDateString("ru-RU")).join(", ") : "—",
    });
    if (r.count === 0) {
      row.eachCell((cell) => {
        cell.fill = ZERO_ROW_FILL;
      });
    }
  }

  const totalRow = sheet.addRow({ name: "Итого", count: rows.reduce((sum, r) => sum + r.count, 0) });
  totalRow.font = { bold: true };

  return workbook;
}
