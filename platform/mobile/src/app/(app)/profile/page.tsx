"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, LogOut, MapPin, Moon, RefreshCw, Send, Sun, WifiOff } from "lucide-react";
import { apiFetch, API_BASE, getCurrentUser, logout } from "@/lib/api";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { flushOfflineQueue, listQueuedPhotos } from "@/lib/offline-queue";
import { getPushStatus, subscribeToPush, unsubscribeFromPush, type PushStatus } from "@/lib/push";
import { Button } from "@/components/ui/button";
import { APP_VERSION } from "@/lib/version";

const LONG_PRESS_MS = 600;

function DiagnosticsSection({
  geoStatus,
  geoError,
  queuedCount,
}: {
  geoStatus: string;
  geoError: string | null;
  queuedCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  function startPress() {
    pressTimer.current = setTimeout(() => setOpen((v) => !v), LONG_PRESS_MS);
  }
  function cancelPress() {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }

  return (
    <div className="flex flex-col items-center gap-2 pb-2">
      <p
        onPointerDown={startPress}
        onPointerUp={cancelPress}
        onPointerLeave={cancelPress}
        className="select-none text-xs text-muted-foreground"
      >
        Corpi v{APP_VERSION}
      </p>
      {open && (
        <div className="w-full rounded-lg border border-border p-3 text-xs text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">Диагностика</p>
          <p>API: {API_BASE}</p>
          <p>Сеть: {online ? "онлайн" : "офлайн"}</p>
          <p>GPS: {geoStatus}</p>
          <p>Фото в очереди: {queuedCount}</p>
          {geoError && <p className="text-red-500">Ошибка GPS: {geoError}</p>}
        </div>
      )}
    </div>
  );
}

function PushSection() {
  const [status, setStatus] = useState<PushStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setStatus(await getPushStatus());
    } catch {
      // офлайн — просто не показываем блок
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle() {
    if (!status?.publicKey) return;
    setBusy(true);
    setError(null);
    try {
      if (status.subscribed) {
        await unsubscribeFromPush();
      } else {
        await subscribeToPush(status.publicKey);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось изменить подписку");
    } finally {
      setBusy(false);
    }
  }

  if (!status || !status.configured) return null;

  return (
    <div className="rounded-lg border border-border p-4 text-sm">
      <div className="flex items-center gap-2 font-medium">
        <Bell size={16} />
        Push-уведомления
      </div>
      <p className="mt-1 text-muted-foreground">
        {status.subscribed ? "Включены на этом устройстве" : "Получайте уведомления о заявках даже когда приложение закрыто"}
      </p>
      <Button variant="outline" className="mt-2 w-full" onClick={toggle} disabled={busy}>
        {busy ? "Секунду..." : status.subscribed ? "Отключить" : "Включить"}
      </Button>
      {error && <p className="mt-1 text-red-500">{error}</p>}
    </div>
  );
}

interface TelegramStatus {
  configured: boolean;
  linked: boolean;
}

function TelegramSection() {
  const [status, setStatus] = useState<TelegramStatus | null>(null);
  const [link, setLink] = useState<{ deepLink: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadStatus() {
    setStatus(await apiFetch<TelegramStatus>("/notifications/telegram/status"));
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function requestLink() {
    setBusy(true);
    setError(null);
    try {
      const data = await apiFetch<{ deepLink: string }>("/notifications/telegram/link-code", {
        method: "POST",
      });
      setLink(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось получить ссылку");
    } finally {
      setBusy(false);
    }
  }

  if (!status || !status.configured) return null;

  return (
    <div className="rounded-lg border border-border p-4 text-sm">
      <div className="flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <Send size={16} />
          Telegram
        </div>
        <a href="https://t.me/thecorpibot" target="_blank" rel="noreferrer" className="text-xs font-normal text-muted-foreground">
          @thecorpibot
        </a>
      </div>
      {status.linked ? (
        <p className="mt-1 text-muted-foreground">Подключён — уведомления о заявках приходят туда</p>
      ) : link ? (
        <div className="mt-2 flex flex-col gap-2">
          <a href={link.deepLink} className="rounded-lg bg-primary px-3 py-2 text-center text-primary-foreground">
            Открыть бота
          </a>
          <Button variant="outline" onClick={loadStatus}>
            Я подключил(а) — обновить
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-1 text-muted-foreground">Получайте уведомления о заявках в Telegram</p>
          <Button variant="outline" className="mt-2 w-full" onClick={requestLink} disabled={busy}>
            {busy ? "Готовим ссылку..." : "Подключить"}
          </Button>
          {error && <p className="mt-1 text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
}

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
            <RefreshCw size={14} className={busy ? "animate-spin" : ""} /> {busy ? "Отправляем..." : "Отправить сейчас"}
          </Button>
        )}
      </div>

      <PushSection />
      <TelegramSection />

      {mounted && (
        <div className="flex items-center justify-between rounded-lg border border-border p-4 text-sm">
          <span className="font-medium">Тема</span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border transition-all duration-150 active:scale-95"
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

      <DiagnosticsSection geoStatus={geo.status} geoError={geo.error} queuedCount={queuedCount} />
    </div>
  );
}
