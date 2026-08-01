import { randomBytes } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";
import { notifyUser } from "../notifications/notify.js";
import { eligibleExecutorTypes } from "../../lib/executor-matching.js";
import { generateWorkOrderReportPdf } from "../../lib/work-order-report.js";

const TERMINAL_STATUSES = new Set(["COMPLETED", "CLOSED", "CANCELLED"]);
const AT_RISK_WINDOW_MS = 2 * 60 * 60 * 1000; // «горит» — до срока меньше 2 часов

/// SLA-статус считается на лету из slaDueAt — ничего не хранится, кроме
/// самого дедлайна, чтобы бейдж всегда отражал текущее время.
export function slaStatus(order: { status: string; slaDueAt: Date | null }): "overdue" | "at_risk" | "ok" | null {
  if (!order.slaDueAt || TERMINAL_STATUSES.has(order.status)) return null;
  const msLeft = order.slaDueAt.getTime() - Date.now();
  if (msLeft < 0) return "overdue";
  if (msLeft < AT_RISK_WINDOW_MS) return "at_risk";
  return "ok";
}

function withSlaStatus<T extends { status: string; slaDueAt: Date | null }>(order: T) {
  return { ...order, slaStatus: slaStatus(order) };
}

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

const REQUEST_TYPES = [
  "REPAIR",
  "MAINTENANCE",
  "CLEANING",
  "CASH_COLLECTION",
  "DELIVERY",
  "EQUIPMENT_MOVE",
  "INSTALLATION",
  "DECOMMISSION",
  "INSPECTION",
  "AUDIT",
  "OTHER",
] as const;

/// Подрядчик видит только заявки, назначенные его организации — это
/// дополнительный, более узкий фильтр поверх обычной изоляции по тенанту.
function contractorScope(req: import("express").Request) {
  return req.auth!.contractorOrganizationId ? { assignedOrganizationId: req.auth!.contractorOrganizationId } : {};
}

export async function nextOrderNumber(organizationId: string) {
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
      ...contractorScope(req),
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
  res.json(orders.map(withSlaStatus));
});

/// Автоподбор исполнителей под тип заявки — сотрудники и бригады банка
/// (не других подрядчиков), чей executorType допустим для этого requestType.
workOrdersRouter.get("/eligible-assignees", async (req, res) => {
  const requestType = (req.query.requestType as string) || "OTHER";
  const types = eligibleExecutorTypes(requestType);
  const organizationId = req.auth!.organizationId;

  const users = await prisma.user.findMany({
    where: {
      organizationId,
      ...(types.length ? { executorType: { in: types as never[] } } : {}),
    },
    select: { id: true, name: true, executorType: true, contractorOrganizationId: true },
    orderBy: { name: "asc" },
  });
  const teams = await prisma.team.findMany({
    where: { organizationId },
    select: { id: true, name: true, contractorOrganizationId: true },
    orderBy: { name: "asc" },
  });
  res.json({ users, teams });
});

workOrdersRouter.get("/:id", async (req, res) => {
  const order = await prisma.workOrder.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
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
  res.json(withSlaStatus(order));
});

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  clientId: z.string().optional(),
  siteId: z.string().optional(),
  equipmentId: z.string().optional(),
  slaDueAt: z.string().datetime().optional(),
  requestType: z.enum(REQUEST_TYPES).optional(),
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
      requestType: parsed.data.requestType,
      createdById: req.auth!.userId,
      organizationId,
      publicTrackingToken: randomBytes(12).toString("hex"),
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
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
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

const qrConfirmSchema = z.object({ scannedSiteId: z.string().min(1) });

/// Подтверждение прибытия сканированием QR-кода на объекте — QR кодирует
/// site.id, сверяем с объектом заявки и переводим статус в ARRIVED.
workOrdersRouter.post("/:id/confirm-arrival-qr", async (req, res) => {
  const parsed = qrConfirmSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existing = await prisma.workOrder.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
  });
  if (!existing) return res.status(404).json({ error: "Заявка не найдена" });
  if (!existing.siteId || existing.siteId !== parsed.data.scannedSiteId) {
    return res.status(400).json({ error: "QR-код не совпадает с объектом этой заявки" });
  }

  const order = await prisma.workOrder.update({
    where: { id: req.params.id },
    data: {
      status: TERMINAL_STATUSES.has(existing.status) ? existing.status : "ARRIVED",
      events: {
        create: {
          type: "qr_arrival",
          message: "Прибытие подтверждено сканированием QR-кода объекта",
          userId: req.auth!.userId,
        },
      },
    },
  });
  res.json(order);
});

/// PDF-акт по заявке: карточка + чек-листы + история — для банковской отчётности.
workOrdersRouter.get("/:id/report.pdf", async (req, res) => {
  const order = await prisma.workOrder.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
    include: {
      client: true,
      site: true,
      assignedTo: { select: { id: true, name: true } },
      team: { select: { id: true, name: true } },
      events: { orderBy: { createdAt: "asc" }, include: { user: { select: { name: true } } } },
      checklistSubmissions: { include: { template: true, submittedBy: { select: { name: true } } } },
    },
  });
  if (!order) return res.status(404).json({ error: "Заявка не найдена" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${order.number}.pdf"`);
  generateWorkOrderReportPdf(order).pipe(res);
});

const assignSchema = z.object({ assignedToId: z.string().optional(), teamId: z.string().optional() });

workOrdersRouter.patch("/:id/assign", async (req, res) => {
  const parsed = assignSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const existing = await prisma.workOrder.findFirst({ where: { id: req.params.id, organizationId } });
  if (!existing) return res.status(404).json({ error: "Заявка не найдена" });

  // assignedOrganizationId зеркалит подрядчика исполнителя — это то, по чему
  // подрядчик фильтрует "свои" заявки, поэтому считаем его на каждое назначение.
  let assignedOrganizationId: string | null = null;
  if (parsed.data.assignedToId) {
    const assignee = await prisma.user.findFirst({ where: { id: parsed.data.assignedToId, organizationId } });
    if (!assignee) return res.status(400).json({ error: "Сотрудник не найден" });
    assignedOrganizationId = assignee.contractorOrganizationId;
  }
  if (parsed.data.teamId) {
    const team = await prisma.team.findFirst({ where: { id: parsed.data.teamId, organizationId } });
    if (!team) return res.status(400).json({ error: "Бригада не найдена" });
    assignedOrganizationId = team.contractorOrganizationId ?? assignedOrganizationId;
  }

  const order = await prisma.workOrder.update({
    where: { id: req.params.id },
    data: {
      assignedToId: parsed.data.assignedToId,
      teamId: parsed.data.teamId,
      assignedOrganizationId,
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
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
  });
  if (!existing) return res.status(404).json({ error: "Заявка не найдена" });

  const event = await prisma.workOrderEvent.create({
    data: { workOrderId: req.params.id, type: "comment", message, userId: req.auth!.userId },
  });
  res.status(201).json(event);
});
