import { randomBytes } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";
import { getBotInfo, isTelegramConfigured } from "../../lib/telegram.js";
import { isWebPushConfigured } from "../../lib/webpush.js";
import { isMailConfigured } from "../../lib/mail.js";
import { isFcmConfigured } from "../../lib/fcm.js";

export const notificationsRouter = Router();
notificationsRouter.use(authenticate);

notificationsRouter.get("/", async (req, res) => {
  const take = Math.min(Number(req.query.take) || 50, 200);
  const notifications = await prisma.notification.findMany({
    where: { userId: req.auth!.userId },
    orderBy: { createdAt: "desc" },
    take,
  });
  res.json(notifications);
});

notificationsRouter.post("/read-all", async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.auth!.userId, readAt: null },
    data: { readAt: new Date() },
  });
  res.json({ ok: true });
});

notificationsRouter.post("/:id/read", async (req, res) => {
  const notification = await prisma.notification.updateMany({
    where: { id: req.params.id, userId: req.auth!.userId },
    data: { readAt: new Date() },
  });
  if (notification.count === 0) return res.status(404).json({ error: "Не найдено" });
  res.json({ ok: true });
});

notificationsRouter.get("/telegram/status", async (req, res) => {
  const configured = isTelegramConfigured();
  const user = await prisma.user.findUnique({
    where: { id: req.auth!.userId },
    select: { telegramChatId: true },
  });
  res.json({ configured, linked: Boolean(user?.telegramChatId) });
});

notificationsRouter.post("/telegram/link-code", async (req, res) => {
  if (!isTelegramConfigured()) {
    return res.status(400).json({ error: "Telegram-бот не настроен на сервере (нет TELEGRAM_BOT_TOKEN)" });
  }
  const bot = await getBotInfo();
  if (!bot) return res.status(502).json({ error: "Не удалось связаться с Telegram Bot API" });

  const code = randomBytes(6).toString("hex");
  await prisma.user.update({ where: { id: req.auth!.userId }, data: { telegramLinkCode: code } });

  res.json({ code, botUsername: bot.username, deepLink: `https://t.me/${bot.username}?start=${code}` });
});

notificationsRouter.post("/telegram/unlink", async (req, res) => {
  await prisma.user.update({ where: { id: req.auth!.userId }, data: { telegramChatId: null } });
  res.json({ ok: true });
});

notificationsRouter.get("/email/status", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.auth!.userId },
    select: { email: true },
  });
  res.json({ configured: isMailConfigured(), email: user?.email ?? null });
});

notificationsRouter.get("/push/status", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.auth!.userId },
    select: { pushSubscription: true },
  });
  res.json({
    configured: isWebPushConfigured,
    publicKey: process.env.VAPID_PUBLIC_KEY ?? null,
    subscribed: Boolean(user?.pushSubscription),
  });
});

const pushSubscribeSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});

notificationsRouter.post("/push/subscribe", async (req, res) => {
  const parsed = pushSubscribeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  await prisma.user.update({
    where: { id: req.auth!.userId },
    data: { pushSubscription: parsed.data },
  });
  res.json({ ok: true });
});

notificationsRouter.post("/push/unsubscribe", async (req, res) => {
  await prisma.user.update({ where: { id: req.auth!.userId }, data: { pushSubscription: null as never } });
  res.json({ ok: true });
});

notificationsRouter.get("/fcm/status", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.auth!.userId },
    select: { fcmToken: true },
  });
  res.json({ configured: isFcmConfigured(), subscribed: Boolean(user?.fcmToken) });
});

notificationsRouter.post("/fcm/subscribe", async (req, res) => {
  const parsed = z.object({ token: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  await prisma.user.update({ where: { id: req.auth!.userId }, data: { fcmToken: parsed.data.token } });
  res.json({ ok: true });
});

notificationsRouter.post("/fcm/unsubscribe", async (req, res) => {
  await prisma.user.update({ where: { id: req.auth!.userId }, data: { fcmToken: null } });
  res.json({ ok: true });
});
