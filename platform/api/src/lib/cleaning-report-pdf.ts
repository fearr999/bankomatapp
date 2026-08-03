import PDFDocument from "pdfkit";
import type { CleaningSummaryRow } from "./cleaning-report.js";
import { registerCyrillicFonts } from "./pdf-fonts.js";

const DEVICE_LABELS: Record<string, string> = { atm: "Банкомат", cardomat: "Картомат" };

/// PDF-версия месячного отчёта по уборке — та же логика форматирования, что
/// и в work-order-report.ts (pdfkit, без внешних сервисов).
export function generateCleaningSummaryPdf(rows: CleaningSummaryRow[], from: Date, to: Date): PDFKit.PDFDocument {
  const doc = new PDFDocument({ margin: 50, size: "A4" });
  registerCyrillicFonts(doc);

  const period = `${from.toLocaleDateString("ru-RU")} — ${to.toLocaleDateString("ru-RU")}`;
  doc.font("Bold").fontSize(16).text("Отчёт по уборке банкоматов", { underline: true });
  doc.font("Regular");
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor("#555").text(`Период: ${period}`);
  doc.text(`Сформировано: ${new Date().toLocaleString("ru-RU")}`);
  doc.moveDown();

  const total = rows.reduce((sum, r) => sum + r.count, 0);
  const zeroCount = rows.filter((r) => r.count === 0).length;
  doc.fillColor("#000").fontSize(10);
  doc.text(`Всего банкоматов: ${rows.length}`);
  doc.text(`Всего уборок за период: ${total}`);
  if (zeroCount > 0) doc.fillColor("#b91c1c").text(`Не убирались ни разу: ${zeroCount}`);
  doc.moveDown();

  doc.fillColor("#000");
  for (const r of rows) {
    doc
      .fontSize(11)
      .fillColor(r.count === 0 ? "#b91c1c" : "#000")
      .text(`${r.name}${r.siteName ? " — " + r.siteName : ""} (${DEVICE_LABELS[r.deviceType] ?? r.deviceType})`);
    const datesLabel = r.dates.length
      ? r.dates.map((d) => new Date(d).toLocaleDateString("ru-RU")).join(", ")
      : "—";
    doc.fontSize(9).fillColor("#333").text(`  Уборок: ${r.count} — ${datesLabel}`);
    doc.moveDown(0.3);
  }

  doc.end();
  return doc;
}
