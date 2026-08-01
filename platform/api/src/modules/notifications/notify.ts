import { prisma } from "../../lib/prisma.js";
import { sendTelegramMessage } from "../../lib/telegram.js";
import { sendWebPush, type StoredPushSubscription } from "../../lib/webpush.js";

/** Создаёт запись во внутреннем центре уведомлений и, если у пользователя
 * привязан Telegram и/или подписан на Web Push, дублирует туда же сообщение. */
export async function notifyUser(userId: string, type: string, title: string, message: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { telegramChatId: true, pushSubscription: true },
  });

  let delivered = true;
  let channel = "in_app";
  if (user?.telegramChatId) {
    channel = "telegram";
    delivered = await sendTelegramMessage(user.telegramChatId, `<b>${title}</b>\n${message}`);
  }
  if (user?.pushSubscription) {
    const sent = await sendWebPush(user.pushSubscription as unknown as StoredPushSubscription, title, message);
    if (sent && channel === "in_app") channel = "web_push";
  }

  return prisma.notification.create({
    data: { userId, type, title, message, channel, delivered },
  });
}
