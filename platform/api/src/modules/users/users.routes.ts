import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, requireRole } from "../../middleware/authenticate.js";
import { hashPassword } from "../../lib/auth.js";

export const usersRouter = Router();
usersRouter.use(authenticate);

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
      teamId: true,
      team: { select: { id: true, name: true } },
    },
    orderBy: { name: "asc" },
  });
  res.json(users);
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
