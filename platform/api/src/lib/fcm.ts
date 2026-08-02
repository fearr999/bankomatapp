import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

let app: App | null | undefined;

function getFirebaseApp(): App | null {
  if (app !== undefined) return app;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    app = null;
    return app;
  }

  try {
    const serviceAccount = JSON.parse(raw);
    app = getApps()[0] ?? initializeApp({ credential: cert(serviceAccount) });
  } catch (err) {
    console.error("FIREBASE_SERVICE_ACCOUNT задан, но не распарсился как JSON:", (err as Error).message);
    app = null;
  }
  return app;
}

export function isFcmConfigured(): boolean {
  return Boolean(getFirebaseApp());
}

/** Шлёт push через Firebase Cloud Messaging молча — просроченный/невалидный
 * токен не должен ронять notifyUser(). */
export async function sendFcmPush(token: string, title: string, message: string): Promise<boolean> {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return false;
  try {
    await getMessaging(firebaseApp).send({
      token,
      notification: { title, body: message },
    });
    return true;
  } catch (err) {
    console.error("Отправка FCM push не удалась:", (err as Error).message);
    return false;
  }
}
