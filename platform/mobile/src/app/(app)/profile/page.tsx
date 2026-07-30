"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LogOut, MapPin, Moon, RefreshCw, Sun, WifiOff } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/api";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { flushOfflineQueue, listQueuedPhotos } from "@/lib/offline-queue";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const user = getCurrentUser();
  const geo = useGeoCheckin(true);
  const [queuedCount, setQueuedCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);

  async function refreshQueue() {
    setQueuedCount((await listQueuedPhotos()).length);
  }

  useEffect(() => {
    setMounted(true);
    refreshQueue();
  }, []);

  async function syncNow() {
    setBusy(true);
    try {
      await flushOfflineQueue();
      await refreshQueue();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <p className="text-xs text-muted-foreground">Сотрудник</p>
        <p className="text-lg font-semibold">{user?.name}</p>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      <div className="rounded-lg border border-border p-4 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <MapPin size={16} />
          GPS check-in
        </div>
        <p className="mt-1 text-muted-foreground">
          {geo.status === "watching" && geo.lastSyncAt
            ? `Позиция синхронизирована: ${geo.lastSyncAt.toLocaleTimeString("ru-RU")}`
            : geo.status === "watching"
              ? "Определяем позицию..."
              : geo.status === "denied"
                ? "Доступ к геолокации запрещён"
                : geo.status === "unsupported"
                  ? "Геолокация не поддерживается устройством"
                  : "Ожидание..."}
        </p>
      </div>

      <div className="rounded-lg border border-border p-4 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <WifiOff size={16} />
          Офлайн-очередь фото
        </div>
        <p className="mt-1 text-muted-foreground">
          {queuedCount === 0 ? "Всё отправлено" : `${queuedCount} фото ждут отправки`}
        </p>
        {queuedCount > 0 && (
          <Button variant="outline" className="mt-2 w-full" onClick={syncNow} disabled={busy}>
            <RefreshCw size={14} /> {busy ? "Отправляем..." : "Отправить сейчас"}
          </Button>
        )}
      </div>

      {mounted && (
        <div className="flex items-center justify-between rounded-lg border border-border p-4 text-sm">
          <span className="font-medium">Тема</span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      )}

      <Button
        variant="outline"
        onClick={() => {
          logout();
          router.replace("/login");
        }}
      >
        <LogOut size={16} /> Выйти
      </Button>
    </div>
  );
}
