import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";
import { notifyUser } from "../notifications/notify.js";

export const workOrdersRouter = Router();
workOrdersRouter.use(authenticate);

const STATUSES = [
  "NEW",
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "WAITING_MATERIALS",
  "WAITING_APPROVAL",
  "COMPLETED",
  "CLOSED",
  "CANCELLED",
] as const;

async function nextOrderNumber(organizationId: string) {
  const count = await prisma.workOrder.count({ where: { organizationId } });
  const year = new Date().getFullYear();
  return `WO-${year}-${String(count + 1).padStart(5, "0")}`;
}

workOrdersRouter.get("/", async (req, res) => {
  const status = req.query.status as string | undefined;
  const assignedToId = req.query.assignedToId as string | undefined;
  const orders = await prisma.workOrder.findMany({
    where: {
      organizationId: req.auth!.organizationId,
      status: status ? (status as (typeof STATUSES)[number]) : undefined,
      assignedToId: assignedToId || undefined,
    },
    include: {
      client: { select: { id: true, name: true } },
      site: { select: { id: true, name: true, address: true, lat: true, lng: true } },
      assignedTo: { select: { id: true, name: true } },
      team: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

workOrdersRouter.get("/:id", async (req, res) => {
  const order = await prisma.workOrder.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
    include: {
      client: true,
      site: true,
      assignedTo: { select: { id: true, name: true } },
      team: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
      attachments: true,
      events: { orderBy: { createdAt: "asc" }, include: { user: { select: { name: true } } } },
    },
  });
  if (!order) return res.status(404).json({ error: "Заявка не найдена" });
  res.json(order);
});

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  clientId: z.string().optional(),
  siteId: z.string().optional(),
  equipmentId: z.string().optional(),
  slaDueAt: z.string().datetime().optional(),
});

workOrdersRouter.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const number = await nextOrderNumber(organizationId);
  const order = await prisma.workOrder.create({
    data: {
      number,
      title: parsed.data.title,
      description: parsed.data.description,
      clientId: parsed.data.clientId,
      siteId: parsed.data.siteId,
      equipmentId: parsed.data.equipmentId,
      slaDueAt: parsed.data.slaDueAt ? new Date(parsed.data.slaDueAt) : undefined,
      createdById: req.auth!.userId,
      organizationId,
      events: {
        create: { type: "created", message: "Заявка создана", userId: req.auth!.userId },
      },
    },
  });
  res.status(201).json(order);
});

const statusSchema = z.object({ status: z.enum(STATUSES), comment: z.string().optional() });

workOrdersRouter.patch("/:id/status", async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existing = await prisma.workOrder.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Заявка не найдена" });

  const order = await prisma.workOrder.update({
    where: { id: req.params.id },
    data: {
      status: parsed.data.status,
      events: {
        create: {
          type: "status_change",
          message: parsed.data.comment ?? `Статус изменён на ${parsed.data.status}`,
          userId: req.auth!.userId,
        },
      },
    },
  });
  res.json(order);
});

const assignSchema = z.object({ assignedToId: z.string().optional(), teamId: z.string().optional() });

workOrdersRouter.patch("/:id/assign", async (req, res) => {
  const parsed = assignSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const existing = await prisma.workOrder.findFirst({ where: { id: req.params.id, organizationId } });
  if (!existing) return res.status(404).json({ error: "Заявка не найдена" });

  if (parsed.data.assignedToId) {
    const assignee = await prisma.user.findFirst({ where: { id: parsed.data.assignedToId, organizationId } });
    if (!assignee) return res.status(400).json({ error: "Сотрудник не найден" });
  }
  if (parsed.data.teamId) {
    const team = await prisma.team.findFirst({ where: { id: parsed.data.teamId, organizationId } });
    if (!team) return res.status(400).json({ error: "Бригада не найдена" });
  }

  const order = await prisma.workOrder.update({
    where: { id: req.params.id },
    data: {
      assignedToId: parsed.data.assignedToId,
      teamId: parsed.data.teamId,
      status: "ASSIGNED",
      events: {
        create: {
          type: "assignment",
          message: "Заявка назначена исполнителю",
          userId: req.auth!.userId,
        },
      },
    },
  });

  if (parsed.data.assignedToId) {
    await notifyUser(
      parsed.data.assignedToId,
      "work_order_assigned",
      "Новая заявка",
      `Вам назначена заявка ${order.number}: ${order.title}`
    );
  }

  res.json(order);
});

workOrdersRouter.post("/:id/comments", async (req, res) => {
  const message = req.body?.message;
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message обязателен" });
  }
  const existing = await prisma.workOrder.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Заявка не найдена" });

  const event = await prisma.workOrderEvent.create({
    data: { workOrderId: req.params.id, type: "comment", message, userId: req.auth!.userId },
  });
  res.status(201).json(event);
});
