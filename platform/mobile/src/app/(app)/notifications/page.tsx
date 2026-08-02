"use client";

import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";

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

const CHANNEL_LABELS: Record<string, string> = {
  telegram: "Telegram",
  email: "Email",
  web_push: "Push",
  in_app: "В приложении",
};

function channelLabel(channel: string) {
  return CHANNEL_LABELS[channel] ?? "В приложении";
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
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Bell size={20} />
          <p className="font-semibold">Уведомления</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllRead} className="h-9 px-3 text-xs">
            <Check size={14} /> Прочитать всё
          </Button>
        )}
      </header>

      <div className="flex flex-col gap-2 p-4">
        {loading && <PageLoader className="p-0" />}
        {!loading && notifications.length === 0 && (
          <EmptyState icon={Bell} title="Уведомлений пока нет" bordered={false} />
        )}
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => !n.readAt && markRead(n.id)}
            className={`flex flex-col gap-1 rounded-lg border border-border p-3 text-left text-sm ${
              n.readAt ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{n.title}</span>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
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
      </div>
    </div>
  );
}
