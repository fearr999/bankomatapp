import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

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

async function nextOrderNumber() {
  const count = await prisma.workOrder.count();
  const year = new Date().getFullYear();
  return `WO-${year}-${String(count + 1).padStart(5, "0")}`;
}

workOrdersRouter.get("/", async (req, res) => {
  const status = req.query.status as string | undefined;
  const assignedToId = req.query.assignedToId as string | undefined;
  const orders = await prisma.workOrder.findMany({
    where: {
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
  const order = await prisma.workOrder.findUnique({
    where: { id: req.params.id },
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

  const number = await nextOrderNumber();
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
  res.json(order);
});

workOrdersRouter.post("/:id/comments", async (req, res) => {
  const message = req.body?.message;
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message обязателен" });
  }
  const event = await prisma.workOrderEvent.create({
    data: { workOrderId: req.params.id, type: "comment", message, userId: req.auth!.userId },
  });
  res.status(201).json(event);
});
