"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Fingerprint, LogOut, MapPin, Moon, RefreshCw, Send, Sun, WifiOff } from "lucide-react";
import { apiFetch, API_BASE, getCurrentUser, logout } from "@/lib/api";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { flushOfflineQueue, listQueuedPhotos } from "@/lib/offline-queue";
import { getPushStatus, subscribeToPush, unsubscribeFromPush, type PushStatus } from "@/lib/push";
import { getFcmStatus, subscribeToFcm, unsubscribeFromFcm, type FcmStatus } from "@/lib/fcm-push";
import { authenticateBiometric, isBiometricEnabled, isBiometryAvailable, isNativeApp, setBiometricEnabled } from "@/lib/biometric";
import { Button } from "@/components/ui/button";
import { APP_VERSION } from "@/lib/version";
import { useLocale } from "@/lib/i18n/context";

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
  const { t } = useLocale();
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
        <div className="w-full rounded-lg border border-border p-3 text-xs text-muted-foreground shadow-sm">
          <p className="mb-1 font-medium text-foreground">{t.profile.diagnostics}</p>
          <p>API: {API_BASE}</p>
          <p>{t.profile.network}: {online ? t.profile.online : t.profile.offline}</p>
          <p>GPS: {geoStatus}</p>
          <p>{t.profile.photosQueuedCount}: {queuedCount}</p>
          {geoError && <p className="text-red-500">{t.profile.gpsError}: {geoError}</p>}
        </div>
      )}
    </div>
  );
}

function PushSection() {
  const { t } = useLocale();
  const native = isNativeApp();
  const [webStatus, setWebStatus] = useState<PushStatus | null>(null);
  const [fcmStatus, setFcmStatus] = useState<FcmStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      if (native) setFcmStatus(await getFcmStatus());
      else setWebStatus(await getPushStatus());
    } catch {
      // офлайн — просто не показываем блок
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribed = native ? fcmStatus?.subscribed : webStatus?.subscribed;
  const configured = native ? fcmStatus?.configured : webStatus?.configured;

  async function toggle() {
    setBusy(true);
    setError(null);
    try {
      if (native) {
        if (fcmStatus?.subscribed) await unsubscribeFromFcm();
        else await subscribeToFcm();
      } else {
        if (!webStatus?.publicKey) return;
        if (webStatus.subscribed) await unsubscribeFromPush();
        else await subscribeToPush(webStatus.publicKey);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.profile.pushError);
    } finally {
      setBusy(false);
    }
  }

  if (!configured) return null;

  return (
    <div className="rounded-lg border border-border p-4 text-sm shadow-sm">
      <div className="flex items-center gap-2 font-medium">
        <Bell size={16} />
        {t.profile.pushNotifications}
      </div>
      <p className="mt-1 text-muted-foreground">
        {subscribed ? t.profile.pushEnabled : t.profile.pushPromo}
      </p>
      <Button variant="outline" className="mt-2 w-full" onClick={toggle} disabled={busy}>
        {busy ? t.profile.second : subscribed ? t.profile.disable : t.profile.enable}
      </Button>
      {error && <p className="mt-1 text-red-500">{error}</p>}
    </div>
  );
}

function BiometricSection() {
  const { t } = useLocale();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    isBiometryAvailable().then(setAvailable);
    setEnabled(isBiometricEnabled());
  }, []);

  async function toggle() {
    setBusy(true);
    setError(null);
    try {
      if (enabled) {
        setBiometricEnabled(false);
        setEnabled(false);
      } else {
        const ok = await authenticateBiometric(t.profile.biometricPrompt);
        if (!ok) {
          setError(t.profile.biometricError);
          return;
        }
        setBiometricEnabled(true);
        setEnabled(true);
      }
    } finally {
      setBusy(false);
    }
  }

  if (!available) return null;

  return (
    <div className="rounded-lg border border-border p-4 text-sm shadow-sm">
      <div className="flex items-center gap-2 font-medium">
        <Fingerprint size={16} />
        {t.profile.biometricLogin}
      </div>
      <p className="mt-1 text-muted-foreground">
        {enabled ? t.profile.biometricEnabledDesc : t.profile.biometricPromptDesc}
      </p>
      <Button variant="outline" className="mt-2 w-full" onClick={toggle} disabled={busy}>
        {busy ? t.profile.second : enabled ? t.profile.disable : t.profile.enable}
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
  const { t } = useLocale();
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
      setError(e instanceof Error ? e.message : t.profile.linkError);
    } finally {
      setBusy(false);
    }
  }

  if (!status || !status.configured) return null;

  return (
    <div className="rounded-lg border border-border p-4 text-sm shadow-sm">
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
        <p className="mt-1 text-muted-foreground">{t.profile.telegramLinked}</p>
      ) : link ? (
        <div className="mt-2 flex flex-col gap-2">
          <a href={link.deepLink} className="rounded-lg bg-primary px-3 py-2 text-center text-primary-foreground">
            {t.profile.openBot}
          </a>
          <Button variant="outline" onClick={loadStatus}>
            {t.profile.confirmUpdate}
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-1 text-muted-foreground">{t.profile.telegramPromo}</p>
          <Button variant="outline" className="mt-2 w-full" onClick={requestLink} disabled={busy}>
            {busy ? t.profile.preparingLink : t.profile.connect}
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
  const { locale, setLocale, t } = useLocale();
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
        <p className="text-xs text-muted-foreground">{t.profile.employee}</p>
        <p className="text-lg font-semibold">{user?.name}</p>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      <div className="rounded-lg border border-border p-4 text-sm shadow-sm">
        <div className="flex items-center gap-2 font-medium">
          <MapPin size={16} />
          {t.profile.gpsCheckin}
        </div>
        <p className="mt-1 text-muted-foreground">
          {geo.status === "watching" && geo.lastSyncAt
            ? `${t.profile.positionSynced}: ${geo.lastSyncAt.toLocaleTimeString(locale === "uz" ? "uz-UZ" : "ru-RU")}`
            : geo.status === "watching"
              ? t.profile.locating
              : geo.status === "denied"
                ? t.profile.geoDenied
                : geo.status === "unsupported"
                  ? t.profile.geoUnsupported
                  : t.profile.waiting}
        </p>
      </div>

      <div className="rounded-lg border border-border p-4 text-sm shadow-sm">
        <div className="flex items-center gap-2 font-medium">
          <WifiOff size={16} />
          {t.profile.offlineQueue}
        </div>
        <p className="mt-1 text-muted-foreground">
          {queuedCount === 0 ? t.profile.allSent : `${queuedCount} ${t.profile.photosWaiting}`}
        </p>
        {queuedCount > 0 && (
          <Button variant="outline" className="mt-2 w-full" onClick={syncNow} disabled={busy}>
            <RefreshCw size={14} className={busy ? "animate-spin" : ""} /> {busy ? t.profile.sending : t.profile.sendNow}
          </Button>
        )}
      </div>

      <PushSection />
      <BiometricSection />
      <TelegramSection />

      <div className="flex items-center justify-between rounded-lg border border-border p-4 text-sm shadow-sm">
        <span className="font-medium">{t.shell.language}</span>
        <button
          aria-label={t.shell.language}
          onClick={() => setLocale(locale === "ru" ? "uz" : "ru")}
          className="flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-2 text-xs font-medium uppercase transition-all duration-150 active:scale-95"
        >
          {locale}
        </button>
      </div>

      {mounted && (
        <div className="flex items-center justify-between rounded-lg border border-border p-4 text-sm shadow-sm">
          <span className="font-medium">{t.profile.theme}</span>
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
        <LogOut size={16} /> {t.profile.logout}
      </Button>

      <DiagnosticsSection geoStatus={geo.status} geoError={geo.error} queuedCount={queuedCount} />
    </div>
  );
}
