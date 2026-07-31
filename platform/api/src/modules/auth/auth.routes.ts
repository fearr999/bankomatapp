import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { hashPassword, signToken, verifyPassword } from "../../lib/auth.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Некорректные данные" });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: "Неверный email или пароль" });
  }

  const token = signToken({
    userId: user.id,
    role: user.role,
    organizationId: user.organizationId,
    contractorOrganizationId: user.contractorOrganizationId,
  });
  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      contractorOrganizationId: user.contractorOrganizationId,
    },
  });
});

const registerSchema = z.object({
  organizationName: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

/// Самостоятельная регистрация новой компании — создаёт Organization и
/// первого пользователя (ADMIN) одной транзакцией, сразу выдаёт токен.
authRouter.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { organizationName, name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email уже используется" });

  const passwordHash = await hashPassword(password);
  const { organization, user } = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({ data: { name: organizationName } });
    const user = await tx.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "ADMIN",
        status: "online",
        organizationId: organization.id,
      },
    });
    return { organization, user };
  });

  const token = signToken({
    userId: user.id,
    role: user.role,
    organizationId: organization.id,
    contractorOrganizationId: null,
  });
  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, contractorOrganizationId: null },
    organization: { id: organization.id, name: organization.name },
  });
});
