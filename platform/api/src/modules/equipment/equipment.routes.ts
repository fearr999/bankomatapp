import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor } from "../../middleware/authenticate.js";
import { notifyUser } from "../notifications/notify.js";
import { workOrderMessages, notificationMessages } from "../../lib/i18n-messages.js";

export const equipmentRouter = Router();
equipmentRouter.use(authenticate);
// Модуль обслуживания банкоматов (включая суммы инкассации) — банковский,
// вне списка разделов кабинета подрядчика.
equipmentRouter.use(blockContractor);

equipmentRouter.get("/", async (req, res) => {
  const equipment = await prisma.equipment.findMany({
    where: { organizationId: req.auth!.organizationId },
    include: { site: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });
  res.json(equipment);
});

equipmentRouter.get("/:id", async (req, res) => {
  const item = await prisma.equipment.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
    include: {
      site: { select: { id: true, name: true, address: true } },
      workOrders: {
        select: { id: true, number: true, title: true, status: true, priority: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      },
      collections: {
        orderBy: { createdAt: "desc" },
        include: { performedBy: { select: { name: true } } },
      },
      accessLogs: {
        orderBy: { createdAt: "desc" },
        include: { performedBy: { select: { name: true } } },
      },
    },
  });
  if (!item) return res.status(404).json({ error: "Оборудование не найдено" });
  res.json(item);
});

const dateOrNull = z
  .string()
  .optional()
  .transform((v) => (v ? new Date(v) : undefined));

const equipmentSchema = z.object({
  name: z.string().min(1),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  status: z.enum(["operational", "broken", "maintenance"]).optional(),
  deviceType: z.enum(["atm", "cardomat", "other"]).optional(),
  cassetteLevelPercent: z.number().min(0).max(100).optional(),
  siteId: z.string().optional(),
  warrantyUntil: dateOrNull,
  lastServiceAt: dateOrNull,
  nextServiceAt: dateOrNull,
  maintenanceIntervalDays: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

equipmentRouter.post("/", async (req, res) => {
  const parsed = equipmentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const organizationId = req.auth!.organizationId;
  if (parsed.data.siteId) {
    const site = await prisma.site.findFirst({ where: { id: parsed.data.siteId, organizationId } });
    if (!site) return res.status(400).json({ error: "Объект не найден" });
  }
  const item = await prisma.equipment.create({ data: { ...parsed.data, organizationId } });
  res.status(201).json(item);
});

equipmentRouter.patch("/:id", async (req, res) => {
  const parsed = equipmentSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const existing = await prisma.equipment.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Оборудование не найдено" });
  const item = await prisma.equipment.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(item);
});

// --- Специализация под банкоматы/картоматы: инкассация, контроль доступа, аварийный вызов ---

const collectionSchema = z.object({ amount: z.number().optional(), notes: z.string().optional() });

equipmentRouter.post("/:id/collections", async (req, res) => {
  const parsed = collectionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const existing = await prisma.equipment.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Оборудование не найдено" });

  const [record] = await prisma.$transaction([
    prisma.collectionRecord.create({
      data: {
        equipmentId: req.params.id,
        amount: parsed.data.amount,
        notes: parsed.data.notes,
        performedById: req.auth!.userId,
      },
    }),
    prisma.equipment.update({
      where: { id: req.params.id },
      data: { lastCollectionAt: new Date(), cassetteLevelPercent: 0 },
    }),
  ]);
  res.status(201).json(record);
});

const accessLogSchema = z.object({ action: z.enum(["open", "close"]), notes: z.string().optional() });

equipmentRouter.post("/:id/access-log", async (req, res) => {
  const parsed = accessLogSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const existing = await prisma.equipment.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Оборудование не найдено" });

  const log = await prisma.deviceAccessLog.create({
    data: { equipmentId: req.params.id, ...parsed.data, performedById: req.auth!.userId },
  });
  res.status(201).json(log);
});

/// Аварийный вызов — создаёт срочную заявку, привязанную к устройству.
equipmentRouter.post("/:id/emergency", async (req, res) => {
  const organizationId = req.auth!.organizationId;
  const equipment = await prisma.equipment.findFirst({ where: { id: req.params.id, organizationId } });
  if (!equipment) return res.status(404).json({ error: "Оборудование не найдено" });

  const count = await prisma.workOrder.count({ where: { organizationId } });
  const number = `WO-${new Date().getFullYear()}-${String(count + 1).padStart(5, "0")}`;

  const order = await prisma.workOrder.create({
    data: {
      number,
      title: `Аварийный вызов: ${equipment.name}`,
      description: req.body?.description || "Создано из модуля обслуживания банкоматов",
      priority: "urgent",
      equipmentId: equipment.id,
      siteId: equipment.siteId,
      createdById: req.auth!.userId,
      organizationId,
      events: {
        create: {
          type: "created",
          message: workOrderMessages.emergencyCallCreated().ru,
          messageUz: workOrderMessages.emergencyCallCreated().uz,
          userId: req.auth!.userId,
        },
      },
    },
  });
  await prisma.equipment.update({ where: { id: equipment.id }, data: { status: "broken" } });

  const responders = await prisma.user.findMany({
    where: { organizationId, role: { in: ["ADMIN", "DISPATCHER"] } },
    select: { id: true },
  });
  const emergencyNotification = notificationMessages.emergencyCall(order.title, order.number);
  await Promise.all(
    responders.map((u) =>
      notifyUser(
        u.id,
        "emergency_call",
        emergencyNotification.title.ru,
        emergencyNotification.message.ru,
        emergencyNotification.title.uz,
        emergencyNotification.message.uz
      )
    )
  );

  res.status(201).json(order);
});
