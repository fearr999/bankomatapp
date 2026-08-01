import { apiFetch } from "./api";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export interface PushStatus {
  configured: boolean;
  publicKey: string | null;
  subscribed: boolean;
}

export async function getPushStatus() {
  return apiFetch<PushStatus>("/notifications/push/status");
}

/** Регистрирует Web Push подписку через уже зарегистрированный service worker. */
export async function subscribeToPush(publicKey: string) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("Push-уведомления не поддерживаются этим браузером");
  }
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("Доступ к уведомлениям не разрешён");

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  await apiFetch("/notifications/push/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription.toJSON()),
  });
}

export async function unsubscribeFromPush() {
  if (!("serviceWorker" in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) await subscription.unsubscribe();
  await apiFetch("/notifications/push/unsubscribe", { method: "POST" });
}
