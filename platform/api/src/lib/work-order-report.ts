import PDFDocument from "pdfkit";

const STATUS_LABELS: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначена",
  EN_ROUTE: "В пути",
  ARRIVED: "Прибыл",
  IN_PROGRESS: "В работе",
  WAITING_MATERIALS: "Ожидает материалы",
  WAITING_APPROVAL: "Требуется согласование",
  COMPLETED: "Завершена",
  CLOSED: "Закрыта",
  CANCELLED: "Отменена",
};

interface ReportOrder {
  number: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  client: { name: string } | null;
  site: { name: string; address: string | null } | null;
  assignedTo: { name: string } | null;
  team: { name: string } | null;
  events: Array<{ message: string; createdAt: Date; user: { name: string } | null }>;
  checklistSubmissions: Array<{
    createdAt: Date;
    answers: unknown;
    template: { name: string; fields: unknown };
    submittedBy: { name: string } | null;
  }>;
}

/// Генерирует PDF-акт по заявке (pdfkit — без внешних сервисов). Возвращает
/// сам PDFDocument — вызывающий код сам решает, .pipe() в response или в файл.
export function generateWorkOrderReportPdf(order: ReportOrder): PDFKit.PDFDocument {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(18).text(`Акт по заявке ${order.number}`, { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor("#555").text(`Сформировано: ${new Date().toLocaleString("ru-RU")}`);
  doc.moveDown();

  doc.fillColor("#000").fontSize(13).text(order.title);
  if (order.description) doc.fontSize(10).fillColor("#333").text(order.description);
  doc.moveDown(0.5);

  doc.fontSize(10).fillColor("#000");
  doc.text(`Статус: ${STATUS_LABELS[order.status] ?? order.status}`);
  doc.text(`Клиент: ${order.client?.name ?? "—"}`);
  doc.text(`Объект: ${order.site?.name ?? "—"}${order.site?.address ? ", " + order.site.address : ""}`);
  doc.text(`Исполнитель: ${order.assignedTo?.name ?? order.team?.name ?? "—"}`);
  doc.text(`Создана: ${order.createdAt.toLocaleString("ru-RU")}`);
  doc.text(`Обновлена: ${order.updatedAt.toLocaleString("ru-RU")}`);
  doc.moveDown();

  if (order.checklistSubmissions.length) {
    doc.fontSize(13).text("Чек-листы", { underline: true });
    doc.moveDown(0.3);
    for (const sub of order.checklistSubmissions) {
      doc.fontSize(11).text(sub.template.name);
      const fields = Array.isArray(sub.template.fields) ? sub.template.fields : [];
      const answers = (sub.answers ?? {}) as Record<string, unknown>;
      for (const f of fields as Array<{ id: string; label: string }>) {
        doc.fontSize(9).fillColor("#333").text(`  ${f.label}: ${String(answers[f.id] ?? "—")}`);
      }
      doc
        .fontSize(8)
        .fillColor("#888")
        .text(`  ${sub.submittedBy?.name ?? "—"} · ${sub.createdAt.toLocaleString("ru-RU")}`);
      doc.moveDown(0.4);
    }
    doc.fillColor("#000").moveDown(0.3);
  }

  doc.fontSize(13).text("История", { underline: true });
  doc.moveDown(0.3);
  for (const e of order.events) {
    doc.fontSize(9).fillColor("#333").text(`${e.createdAt.toLocaleString("ru-RU")} — ${e.message} (${e.user?.name ?? "система"})`);
  }

  doc.end();
  return doc;
}
