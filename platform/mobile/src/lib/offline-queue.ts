import { API_BASE } from "./api";

const DB_NAME = "fsm-mobile-offline";
const STORE = "pending-photos";

export interface QueuedPhoto {
  id: number;
  workOrderId: string;
  blob: Blob;
  filename: string;
  lat?: number;
  lng?: number;
  createdAt: number;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function queuePhoto(input: Omit<QueuedPhoto, "id" | "createdAt">): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add({ ...input, createdAt: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function listQueuedPhotos(): Promise<QueuedPhoto[]> {
  const db = await openDb();
  const items = await new Promise<QueuedPhoto[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result as QueuedPhoto[]);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return items;
}

async function removeQueuedPhoto(id: number): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fsm_mobile_token");
}

/** Пытается отправить всё, что накопилось офлайн. Успешные записи удаляются из очереди. */
export async function flushOfflineQueue(): Promise<{ sent: number; failed: number }> {
  const items = await listQueuedPhotos();
  let sent = 0;
  let failed = 0;
  for (const item of items) {
    const form = new FormData();
    form.append("photo", item.blob, item.filename);
    if (item.lat !== undefined) form.append("lat", String(item.lat));
    if (item.lng !== undefined) form.append("lng", String(item.lng));
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/attachments/work-orders/${item.workOrderId}/photos`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: form,
      });
      if (!res.ok) throw new Error(String(res.status));
      await removeQueuedPhoto(item.id);
      sent += 1;
    } catch {
      failed += 1;
    }
  }
  return { sent, failed };
}
