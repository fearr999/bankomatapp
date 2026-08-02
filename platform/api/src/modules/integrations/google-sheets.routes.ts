import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, requireRole } from "../../middleware/authenticate.js";
import { createReportSheet, isGoogleSheetsConfigured } from "../../lib/google-sheets.js";

export const googleSheetsRouter = Router();
googleSheetsRouter.use(authenticate);

googleSheetsRouter.get("/", async (req, res) => {
  const integration = await prisma.googleSheetIntegration.findUnique({
    where: { organizationId: req.auth!.organizationId },
  });
  res.json({ configured: isGoogleSheetsConfigured(), integration });
});

const connectSchema = z.object({ email: z.string().email() });

googleSheetsRouter.post("/connect", requireRole("ADMIN"), async (req, res) => {
  if (!isGoogleSheetsConfigured()) {
    return res.status(503).json({ error: "Интеграция с Google Таблицами не настроена на сервере" });
  }
  const parsed = connectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existing = await prisma.googleSheetIntegration.findUnique({
    where: { organizationId: req.auth!.organizationId },
  });
  if (existing) return res.status(409).json({ error: "Таблица уже подключена" });

  const organization = await prisma.organization.findUnique({ where: { id: req.auth!.organizationId } });
  if (!organization) return res.status(404).json({ error: "Организация не найдена" });

  let sheet: { spreadsheetId: string; spreadsheetUrl: string };
  try {
    sheet = await createReportSheet(organization.name, parsed.data.email);
  } catch (err) {
    return res.status(502).json({ error: "Не удалось создать таблицу в Google", details: (err as Error).message });
  }

  const integration = await prisma.googleSheetIntegration.create({
    data: {
      organizationId: req.auth!.organizationId,
      spreadsheetId: sheet.spreadsheetId,
      spreadsheetUrl: sheet.spreadsheetUrl,
      sharedWithEmail: parsed.data.email,
      createdById: req.auth!.userId,
    },
  });
  res.status(201).json(integration);
});

googleSheetsRouter.post("/disconnect", requireRole("ADMIN"), async (req, res) => {
  await prisma.googleSheetIntegration.deleteMany({ where: { organizationId: req.auth!.organizationId } });
  res.json({ ok: true });
});
