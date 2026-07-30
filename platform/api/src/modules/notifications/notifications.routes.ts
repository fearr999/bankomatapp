import { randomBytes } from "node:crypto";
import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";
import { getBotInfo, isTelegramConfigured } from "../../lib/telegram.js";

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
