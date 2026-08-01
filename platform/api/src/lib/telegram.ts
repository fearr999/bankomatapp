import { prisma } from "./prisma.js";

const API_BASE = "https://api.telegram.org";

function getBotToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN || null;
}

export function isTelegramConfigured(): boolean {
  return Boolean(getBotToken());
}

export async function getBotInfo(): Promise<{ id: number; username: string } | null> {
  const token = getBotToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/bot${token}/getMe`);
    const data = await res.json();
    if (!data.ok) return null;
    return { id: data.result.id, username: data.result.username };
  } catch (err) {
    console.error("Telegram getMe не удался:", (err as Error).message);
    return null;
  }
}

export async function sendTelegramMessage(chatId: string, text: string): Promise<boolean> {
  const token = getBotToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await res.json();
    return Boolean(data.ok);
  } catch (err) {
    console.error("Telegram sendMessage не удался:", (err as Error).message);
    return false;
  }
}

interface TelegramUpdate {
  update_id: number;
  message?: { chat: { id: number }; text?: string };
}

async function handleUpdate(update: TelegramUpdate) {
  const message = update.message;
  if (!message?.text) return;
  const match = message.text.trim().match(/^\/start\s+(\S+)$/);
  if (!match) return;

  const code = match[1];
  const user = await prisma.user.findUnique({ where: { telegramLinkCode: code } });
  if (!user) {
    await sendTelegramMessage(String(message.chat.id), "Код не найден или уже использован.");
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { telegramChatId: String(message.chat.id), telegramLinkCode: null },
  });
  await sendTelegramMessage(
    String(message.chat.id),
    `Готово! Telegram привязан к аккаунту ${user.name}. Теперь сюда будут приходить уведомления о заявках.`
  );
}

let polling = false;

/** Долгий опрос Telegram Bot API — обрабатывает /start <code> для привязки аккаунта.
 * Если токен не задан или Telegram недоступен (сеть/бан) — не валит процесс, просто ждёт и повторяет. */
export async function startTelegramPolling() {
  const token = getBotToken();
  if (!token || polling) return;
  polling = true;

  let offset = 0;
  let warnedUnreachable = false;

  while (polling) {
    try {
      const res = await fetch(`${API_BASE}/bot${token}/getUpdates?timeout=25&offset=${offset}`);
      const data = await res.json();
      if (!data.ok) throw new Error(JSON.stringify(data));
      warnedUnreachable = false;
      for (const update of data.result as TelegramUpdate[]) {
        offset = update.update_id + 1;
        await handleUpdate(update);
      }
    } catch (err) {
      if (!warnedUnreachable) {
        console.warn("Telegram недоступен (проверьте токен/сеть):", (err as Error).message);
        warnedUnreachable = true;
      }
      await new Promise((r) => setTimeout(r, 10_000));
    }
  }
}

export function stopTelegramPolling() {
  polling = false;
}
