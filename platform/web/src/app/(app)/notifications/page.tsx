"use client";

import { useEffect, useState } from "react";
import { Bell, Check, Mail, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  channel: string;
  delivered: boolean;
  readAt: string | null;
  createdAt: string;
}

interface TelegramStatus {
  configured: boolean;
  linked: boolean;
}

interface EmailStatus {
  configured: boolean;
  email: string | null;
}

const CHANNEL_LABELS: Record<string, string> = {
  telegram: "Telegram",
  email: "Email",
  web_push: "Push",
  in_app: "В приложении",
};

function channelLabel(channel: string) {
  return CHANNEL_LABELS[channel] ?? "В приложении";
}

function TelegramCard() {
  const [status, setStatus] = useState<TelegramStatus | null>(null);
  const [link, setLink] = useState<{ deepLink: string; code: string } | null>(null);
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
      const data = await apiFetch<{ deepLink: string; code: string }>(
        "/notifications/telegram/link-code",
        { method: "POST" }
      );
      setLink(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось получить ссылку");
    } finally {
      setBusy(false);
    }
  }

  async function unlink() {
    setBusy(true);
    try {
      await apiFetch("/notifications/telegram/unlink", { method: "POST" });
      setLink(null);
      await loadStatus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Telegram</CardTitle>
        <a
          href="https://t.me/thecorpibot"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          @thecorpibot
        </a>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        {!status ? (
          <PageLoader className="p-0" />
        ) : !status.configured ? (
          <p className="text-muted-foreground">
            Бот не настроен на сервере (нет <code>TELEGRAM_BOT_TOKEN</code> в <code>.env</code>).
          </p>
        ) : status.linked ? (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Telegram привязан — уведомления приходят туда.</p>
            <Button variant="outline" onClick={unlink} disabled={busy}>
              Отвязать
            </Button>
          </div>
        ) : link ? (
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">
              Откройте бота и нажмите «Запустить», либо перейдите по ссылке:
            </p>
            <a
              href={link.deepLink}
              target="_blank"
              rel="noreferrer"
              className="w-fit rounded-md bg-primary px-3 py-2 text-primary-foreground"
            >
              {link.deepLink}
            </a>
            <Button variant="outline" className="w-fit" onClick={loadStatus}>
              Я подключил(а) — обновить статус
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Получайте уведомления о заявках прямо в Telegram.</p>
            <Button onClick={requestLink} disabled={busy}>
              <Send size={14} /> Подключить
            </Button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
}

function EmailCard() {
  const [status, setStatus] = useState<EmailStatus | null>(null);

  useEffect(() => {
    apiFetch<EmailStatus>("/notifications/email/status").then(setStatus);
  }, []);

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <Mail size={15} className="text-muted-foreground" />
        <CardTitle>Email</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {!status ? (
          <PageLoader className="p-0" />
        ) : !status.configured ? (
          <p className="text-muted-foreground">
            Email-рассылка не настроена на сервере (нет <code>SMTP_HOST</code> в <code>.env</code>).
          </p>
        ) : (
          <p className="text-muted-foreground">
            Уведомления дублируются на <span className="text-foreground">{status.email}</span> — отдельно
            подключать не нужно.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setNotifications(await apiFetch<Notification[]>("/notifications"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function markAllRead() {
    await apiFetch("/notifications/read-all", { method: "POST" });
    await load();
  }

  async function markRead(id: string) {
    await apiFetch(`/notifications/${id}/read`, { method: "POST" });
    await load();
  }

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={22} />
          <h1 className="text-2xl font-semibold tracking-tight">Уведомления</h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllRead}>
            <Check size={14} /> Прочитать всё ({unreadCount})
          </Button>
        )}
      </div>

      <TelegramCard />
      <EmailCard />

      <Card>
        <CardHeader>
          <CardTitle>История</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {loading && <PageLoader className="p-0" />}
          {!loading && notifications.length === 0 && (
            <EmptyState icon={Bell} title="Уведомлений пока нет" bordered={false} />
          )}
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => !n.readAt && markRead(n.id)}
              className={`flex flex-col gap-1 rounded-md border p-3 text-left text-sm transition-colors hover:bg-muted/40 ${
                n.readAt ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{n.title}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(n.createdAt).toLocaleString("ru-RU")}
                </span>
              </div>
              <p className="text-muted-foreground">{n.message}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-muted px-1.5 py-0.5">{channelLabel(n.channel)}</span>
                {n.channel !== "in_app" && !n.delivered && (
                  <span className="text-red-500">не доставлено</span>
                )}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
