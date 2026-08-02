import { prisma } from "../../lib/prisma.js";
import { sendTelegramMessage } from "../../lib/telegram.js";
import { sendWebPush, type StoredPushSubscription } from "../../lib/webpush.js";
import { isMailConfigured, sendMail } from "../../lib/mail.js";
import { sendFcmPush } from "../../lib/fcm.js";

/** Создаёт запись во внутреннем центре уведомлений и дублирует её во все
 * подключённые каналы пользователя (Telegram, email, Web Push, нативный FCM push). */
export async function notifyUser(userId: string, type: string, title: string, message: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, telegramChatId: true, pushSubscription: true, fcmToken: true },
  });

  let delivered = true;
  let channel = "in_app";
  if (user?.telegramChatId) {
    channel = "telegram";
    delivered = await sendTelegramMessage(user.telegramChatId, `<b>${title}</b>\n${message}`);
  }
  if (user?.email && isMailConfigured()) {
    const sent = await sendMail(user.email, title, title, message);
    if (sent && channel === "in_app") channel = "email";
  }
  if (user?.fcmToken) {
    const sent = await sendFcmPush(user.fcmToken, title, message);
    if (sent && channel === "in_app") channel = "push";
  } else if (user?.pushSubscription) {
    const sent = await sendWebPush(user.pushSubscription as unknown as StoredPushSubscription, title, message);
    if (sent && channel === "in_app") channel = "web_push";
  }

  return prisma.notification.create({
    data: { userId, type, title, message, channel, delivered },
  });
}
