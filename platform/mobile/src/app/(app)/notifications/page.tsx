"use client";

import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { useLocale } from "@/lib/i18n/context";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  titleUz?: string | null;
  messageUz?: string | null;
  channel: string;
  delivered: boolean;
  readAt: string | null;
  createdAt: string;
}

export default function NotificationsPage() {
  const { t, locale } = useLocale();
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
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Bell size={20} />
          <p className="font-semibold">{t.notifications.title}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllRead} className="h-9 px-3 text-xs">
            <Check size={14} /> {t.notifications.markAllRead}
          </Button>
        )}
      </header>

      <div className="flex flex-col gap-2 p-4">
        {loading && <PageLoader className="p-0" />}
        {!loading && notifications.length === 0 && (
          <EmptyState icon={Bell} title={t.notifications.empty} bordered={false} />
        )}
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => !n.readAt && markRead(n.id)}
            className={`flex flex-col gap-1 rounded-lg border border-border p-3 text-left text-sm shadow-sm transition-shadow duration-150 active:shadow-none ${
              n.readAt ? "opacity-60" : "border-l-[3px] border-l-primary bg-primary/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                {!n.readAt && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                {locale === "uz" && n.titleUz ? n.titleUz : n.title}
              </span>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {new Date(n.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
              </span>
            </div>
            <p className="text-muted-foreground">{locale === "uz" && n.messageUz ? n.messageUz : n.message}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-muted px-1.5 py-0.5">
                {n.channel === "telegram"
                  ? "Telegram"
                  : n.channel === "email"
                    ? "Email"
                    : n.channel === "web_push" || n.channel === "push"
                      ? t.notifications.channelPush
                      : t.notifications.channelInApp}
              </span>
              {n.channel !== "in_app" && !n.delivered && (
                <span className="text-red-500">{t.notifications.notDelivered}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
