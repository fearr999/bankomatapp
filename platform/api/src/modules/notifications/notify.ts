import { prisma } from "../../lib/prisma.js";
import { sendTelegramMessage } from "../../lib/telegram.js";

/** Создаёт запись во внутреннем центре уведомлений и, если у пользователя
 * привязан Telegram, пытается отправить туда же то же сообщение. */
export async function notifyUser(userId: string, type: string, title: string, message: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { telegramChatId: true } });

  let delivered = true;
  let channel = "in_app";
  if (user?.telegramChatId) {
    channel = "telegram";
    delivered = await sendTelegramMessage(user.telegramChatId, `<b>${title}</b>\n${message}`);
  }

  return prisma.notification.create({
    data: { userId, type, title, message, channel, delivered },
  });
}
