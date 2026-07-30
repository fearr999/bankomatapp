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

usersRouter.get("/", async (_req, res) => {
  const users = await prisma.user.findMany({
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
});

usersRouter.post("/", requireRole("ADMIN"), async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { password, ...rest } = parsed.data;
  const user = await prisma.user.create({
    data: { ...rest, passwordHash: await hashPassword(password) },
  });
  res.status(201).json({ id: user.id });
});

usersRouter.patch("/:id/status", async (req, res) => {
  const status = req.body?.status;
  if (typeof status !== "string") {
    return res.status(400).json({ error: "status обязателен" });
  }
  await prisma.user.update({ where: { id: req.params.id }, data: { status } });
  res.json({ ok: true });
});
