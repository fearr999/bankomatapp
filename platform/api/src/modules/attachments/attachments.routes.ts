import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const attachmentsRouter = Router();
attachmentsRouter.use(authenticate);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.join(__dirname, "../../../uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

/// Единая лента фото по всем заявкам — для модуля "Фотоотчёты".
/// Каждая запись уже несёт дату/время (createdAt), координаты (lat/lng),
/// исполнителя (uploadedBy) и объект/заявку (workOrder) — как требует ТЗ.
attachmentsRouter.get("/", async (req, res) => {
  const take = Math.min(Number(req.query.take) || 60, 200);
  const contractorOrganizationId = req.auth!.contractorOrganizationId;
  const attachments = await prisma.attachment.findMany({
    where: {
      kind: "photo",
      workOrder: {
        organizationId: req.auth!.organizationId,
        ...(contractorOrganizationId ? { assignedOrganizationId: contractorOrganizationId } : {}),
      },
    },
    orderBy: { createdAt: "desc" },
    take,
    include: {
      uploadedBy: { select: { id: true, name: true } },
      workOrder: {
        select: {
          id: true,
          number: true,
          title: true,
          site: { select: { name: true, address: true } },
        },
      },
    },
  });
  res.json(attachments);
});

attachmentsRouter.post("/work-orders/:id/photos", upload.single("photo"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не передан" });

  const contractorOrganizationId = req.auth!.contractorOrganizationId;
  const order = await prisma.workOrder.findFirst({
    where: {
      id: req.params.id,
      organizationId: req.auth!.organizationId,
      ...(contractorOrganizationId ? { assignedOrganizationId: contractorOrganizationId } : {}),
    },
  });
  if (!order) return res.status(404).json({ error: "Заявка не найдена" });

  const lat = req.body.lat ? Number(req.body.lat) : undefined;
  const lng = req.body.lng ? Number(req.body.lng) : undefined;

  const attachment = await prisma.attachment.create({
    data: {
      workOrderId: req.params.id,
      url: `/uploads/${req.file.filename}`,
      kind: "photo",
      lat,
      lng,
      uploadedById: req.auth!.userId,
    },
  });

  await prisma.workOrderEvent.create({
    data: {
      workOrderId: req.params.id,
      userId: req.auth!.userId,
      type: "photo",
      message: "Добавлена фотография",
    },
  });

  res.status(201).json(attachment);
});
