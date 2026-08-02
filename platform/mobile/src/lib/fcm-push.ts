import { PushNotifications } from "@capacitor/push-notifications";
import { apiFetch } from "./api";

export interface FcmStatus {
  configured: boolean;
  subscribed: boolean;
}

export async function getFcmStatus() {
  return apiFetch<FcmStatus>("/notifications/fcm/status");
}

/** Регистрирует нативный push через Firebase Cloud Messaging (только внутри Capacitor-приложения). */
export async function subscribeToFcm(): Promise<void> {
  const permission = await PushNotifications.requestPermissions();
  if (permission.receive !== "granted") throw new Error("Доступ к уведомлениям не разрешён");

  await new Promise<void>((resolve, reject) => {
    PushNotifications.addListener("registration", async (token) => {
      try {
        await apiFetch("/notifications/fcm/subscribe", {
          method: "POST",
          body: JSON.stringify({ token: token.value }),
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
    PushNotifications.addListener("registrationError", (err) => {
      reject(new Error(err.error || "Не удалось зарегистрировать push"));
    });
    PushNotifications.register();
  });
}

export async function unsubscribeFromFcm() {
  await PushNotifications.unregister();
  await apiFetch("/notifications/fcm/unsubscribe", { method: "POST" });
}
