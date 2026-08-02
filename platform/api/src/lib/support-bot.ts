const API_BASE = "https://api.telegram.org";

function getToken(): string | null {
  return process.env.TELEGRAM_SUPPORT_BOT_TOKEN || null;
}

export function isSupportBotConfigured(): boolean {
  return Boolean(getToken());
}

let cachedUsername: string | null = null;

export async function getSupportBotUsername(): Promise<string | null> {
  const token = getToken();
  if (!token) return null;
  if (cachedUsername) return cachedUsername;
  try {
    const res = await fetch(`${API_BASE}/bot${token}/getMe`);
    const data = await res.json();
    if (!data.ok) return null;
    cachedUsername = data.result.username as string;
    return cachedUsername;
  } catch (err) {
    console.error("Support-бот getMe не удался:", (err as Error).message);
    return null;
  }
}

async function sendSupportMessage(chatId: number | string, text: string) {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (err) {
    console.error("Support-бот sendMessage не удался:", (err as Error).message);
  }
}

interface TelegramUpdate {
  update_id: number;
  message?: {
    chat: { id: number };
    text?: string;
    from?: { first_name?: string; username?: string };
  };
}

const WELCOME =
  "Здравствуйте! Это поддержка Corpi. Опишите ваш вопрос или укажите название компании — ответим в ближайшее время.";
const ACK = "Спасибо, сообщение получено — скоро ответим.";

async function handleUpdate(update: TelegramUpdate) {
  const message = update.message;
  if (!message?.text) return;
  const chatId = message.chat.id;

  if (message.text.trim() === "/start") {
    await sendSupportMessage(chatId, WELCOME);
    return;
  }

  // Пересылка владельцу платформы, если задан chat_id получателя — без него
  // бот всё равно отвечает клиенту, просто сообщение никуда не дублируется.
  const adminChatId = process.env.TELEGRAM_SUPPORT_ADMIN_CHAT_ID;
  if (adminChatId) {
    const from = message.from;
    const who = from
      ? `${from.first_name ?? ""}${from.username ? ` (@${from.username})` : ""}`.trim() || "без имени"
      : "неизвестно";
    await sendSupportMessage(
      adminChatId,
      `Сообщение в поддержку Corpi от ${who}, chat_id ${chatId}:\n\n${message.text}`
    );
  }
  await sendSupportMessage(chatId, ACK);
}

let polling = false;

/** Долгий опрос support-бота — отдельный от основного бота уведомлений
 * (TELEGRAM_BOT_TOKEN), отвечает на входящие сообщения от клиентов, у
 * которых истёк пробный период или которые пишут по общим вопросам. */
export async function startSupportBotPolling() {
  const token = getToken();
  if (!token || polling) return;
  polling = true;
  getSupportBotUsername();

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
        console.warn("Support-бот недоступен (проверьте токен/сеть):", (err as Error).message);
        warnedUnreachable = true;
      }
      await new Promise((r) => setTimeout(r, 10_000));
    }
  }
}

export function stopSupportBotPolling() {
  polling = false;
}
