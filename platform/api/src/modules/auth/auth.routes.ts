import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { hashPassword, signToken, verifyPassword } from "../../lib/auth.js";
import { passwordSchema } from "../../lib/password.js";
import { authenticate } from "../../middleware/authenticate.js";

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
    tokenVersion: user.tokenVersion,
  });
  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      contractorOrganizationId: user.contractorOrganizationId,
      executorType: user.executorType,
    },
  });
});

const registerSchema = z.object({
  organizationName: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  password: passwordSchema,
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
  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const { organization, user } = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({ data: { name: organizationName, trialEndsAt } });
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
    tokenVersion: user.tokenVersion,
  });
  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      contractorOrganizationId: null,
      executorType: user.executorType,
    },
    organization: { id: organization.id, name: organization.name },
  });
});

/// Статус пробного периода/подписки текущей организации — для баннера
/// "осталось N дней" и экрана блокировки после истечения.
authRouter.get("/subscription", authenticate, async (req, res) => {
  const organization = await prisma.organization.findUnique({
    where: { id: req.auth!.organizationId },
    select: { trialEndsAt: true, subscriptionActive: true },
  });
  if (!organization) return res.status(404).json({ error: "Организация не найдена" });

  const daysLeft = organization.trialEndsAt
    ? Math.max(0, Math.ceil((organization.trialEndsAt.getTime() - Date.now()) / 86_400_000))
    : null;
  const expired =
    !organization.subscriptionActive && !!organization.trialEndsAt && organization.trialEndsAt < new Date();

  res.json({
    trialEndsAt: organization.trialEndsAt,
    subscriptionActive: organization.subscriptionActive,
    daysLeft,
    expired,
  });
});
