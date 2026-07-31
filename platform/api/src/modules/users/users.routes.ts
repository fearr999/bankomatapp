import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, requireRole } from "../../middleware/authenticate.js";
import { hashPassword } from "../../lib/auth.js";

export const usersRouter = Router();
usersRouter.use(authenticate);

const ACTIVE_STATUSES = [
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "WAITING_MATERIALS",
  "WAITING_APPROVAL",
] as const;

/// Подрядчик видит только сотрудников своей организации — не банк и не других подрядчиков.
function contractorScope(req: import("express").Request) {
  return req.auth!.contractorOrganizationId ? { contractorOrganizationId: req.auth!.contractorOrganizationId } : {};
}

usersRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    where: { organizationId: req.auth!.organizationId, ...contractorScope(req) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      specialization: true,
      status: true,
      rating: true,
      lat: true,
      lng: true,
      locationUpdatedAt: true,
      teamId: true,
      executorType: true,
      contractorOrganizationId: true,
      team: { select: { id: true, name: true } },
      assignedOrders: {
        where: { status: { in: [...ACTIVE_STATUSES] } },
        select: { id: true, number: true, title: true, status: true },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { name: "asc" },
  });
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      specialization: true,
      status: true,
      rating: true,
      lat: true,
      lng: true,
      locationUpdatedAt: true,
      createdAt: true,
      team: { select: { id: true, name: true } },
      assignedOrders: {
        select: { id: true, number: true, title: true, status: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      },
    },
  });
  if (!user) return res.status(404).json({ error: "Сотрудник не найден" });

  const { assignedOrders, ...rest } = user;
  const completed = assignedOrders.filter((o) => o.status === "COMPLETED" || o.status === "CLOSED").length;
  const active = assignedOrders.filter(
    (o) => !["COMPLETED", "CLOSED", "CANCELLED"].includes(o.status)
  ).length;

  res.json({
    ...rest,
    stats: { totalOrders: assignedOrders.length, completed, active },
    orderHistory: assignedOrders,
  });
});

const locationSchema = z.object({ lat: z.number(), lng: z.number() });

/// Полевой сотрудник сообщает своё текущее местоположение (мобильное приложение,
/// после перехода с Apps Script на этот API — см. дорожную карту).
usersRouter.post("/me/location", async (req, res) => {
  const parsed = locationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  await prisma.user.update({
    where: { id: req.auth!.userId },
    data: { lat: parsed.data.lat, lng: parsed.data.lng, locationUpdatedAt: new Date(), status: "online" },
  });
  res.json({ ok: true });
});

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "DISPATCHER", "MANAGER", "WORKER"]),
  phone: z.string().optional(),
  specialization: z.string().optional(),
  teamId: z.string().optional(),
  executorType: z
    .enum(["STAFF", "CONTRACTOR", "CLEANING", "CASH_COLLECTOR", "SERVICE_ENGINEER", "LOGISTICIAN", "SECURITY", "OTHER"])
    .optional(),
  contractorOrganizationId: z.string().optional(),
});

usersRouter.post("/", requireRole("ADMIN"), async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { password, teamId, contractorOrganizationId, ...rest } = parsed.data;
  if (teamId) {
    const team = await prisma.team.findFirst({ where: { id: teamId, organizationId: req.auth!.organizationId } });
    if (!team) return res.status(400).json({ error: "Бригада не найдена" });
  }
  if (contractorOrganizationId) {
    const org = await prisma.organization.findFirst({
      where: { id: contractorOrganizationId, parentOrganizationId: req.auth!.organizationId },
    });
    if (!org) return res.status(400).json({ error: "Организация-подрядчик не найдена" });
  }
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return res.status(409).json({ error: "Email уже используется" });
  const user = await prisma.user.create({
    data: {
      ...rest,
      teamId,
      contractorOrganizationId,
      passwordHash: await hashPassword(password),
      organizationId: req.auth!.organizationId,
    },
  });
  res.status(201).json({ id: user.id });
});

usersRouter.patch("/:id/status", async (req, res) => {
  const status = req.body?.status;
  if (typeof status !== "string") {
    return res.status(400).json({ error: "status обязателен" });
  }
  const existing = await prisma.user.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
  });
  if (!existing) return res.status(404).json({ error: "Сотрудник не найден" });
  await prisma.user.update({ where: { id: req.params.id }, data: { status } });
  res.json({ ok: true });
});
