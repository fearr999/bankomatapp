import { Router } from "express";
import { z } from "zod";
import { authenticate, blockContractor } from "../../middleware/authenticate.js";
import { getCleaningSummary } from "../../lib/cleaning-report.js";
import { generateCleaningSummaryPdf } from "../../lib/cleaning-report-pdf.js";
import { generateCleaningSummaryWorkbook } from "../../lib/cleaning-report-excel.js";

export const reportsRouter = Router();
reportsRouter.use(authenticate);
// Сверка за период — данные банка целиком, подрядчику не видно (как аналитика).
reportsRouter.use(blockContractor);

const rangeSchema = z.object({ from: z.string().min(1), to: z.string().min(1) });

function parseRange(query: unknown): { from: Date; to: Date } | null {
  const parsed = rangeSchema.safeParse(query);
  if (!parsed.success) return null;
  const from = new Date(`${parsed.data.from}T00:00:00.000Z`);
  const to = new Date(`${parsed.data.to}T23:59:59.999Z`);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) return null;
  return { from, to };
}

reportsRouter.get("/cleaning-summary", async (req, res) => {
  const range = parseRange(req.query);
  if (!range) return res.status(400).json({ error: "Некорректный период (from/to)" });
  const rows = await getCleaningSummary(req.auth!.organizationId, range.from, range.to);
  res.json({ from: req.query.from, to: req.query.to, rows });
});

reportsRouter.get("/cleaning-summary.xlsx", async (req, res) => {
  const range = parseRange(req.query);
  if (!range) return res.status(400).json({ error: "Некорректный период (from/to)" });
  const rows = await getCleaningSummary(req.auth!.organizationId, range.from, range.to);
  const workbook = await generateCleaningSummaryWorkbook(rows, range.from, range.to);
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename="cleaning-report-${req.query.from}_${req.query.to}.xlsx"`);
  await workbook.xlsx.write(res);
  res.end();
});

reportsRouter.get("/cleaning-summary.pdf", async (req, res) => {
  const range = parseRange(req.query);
  if (!range) return res.status(400).json({ error: "Некорректный период (from/to)" });
  const rows = await getCleaningSummary(req.auth!.organizationId, range.from, range.to);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="cleaning-report-${req.query.from}_${req.query.to}.pdf"`);
  generateCleaningSummaryPdf(rows, range.from, range.to).pipe(res);
});
