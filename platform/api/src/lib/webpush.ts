import webpush from "web-push";

const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const subject = process.env.VAPID_SUBJECT ?? "mailto:admin@corpi.local";

export const isWebPushConfigured = Boolean(publicKey && privateKey);

if (isWebPushConfigured) {
  webpush.setVapidDetails(subject, publicKey!, privateKey!);
}

export interface StoredPushSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

/** Шлёт push молча — недоставленная/просроченная подписка не должна ронять notifyUser(). */
export async function sendWebPush(subscription: StoredPushSubscription, title: string, message: string) {
  if (!isWebPushConfigured) return false;
  try {
    await webpush.sendNotification(subscription as never, JSON.stringify({ title, message }));
    return true;
  } catch {
    return false;
  }
}
