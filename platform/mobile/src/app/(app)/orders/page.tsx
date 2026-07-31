"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, MapPin } from "lucide-react";
import { apiFetch, getCurrentUser, logout } from "@/lib/api";
import { StatusBadge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface OrderListItem {
  id: string;
  number: string;
  title: string;
  status: string;
  priority: string;
  client: { name: string } | null;
  site: { name: string; address: string } | null;
  createdAt: string;
}

const OPEN_STATUSES = new Set([
  "NEW",
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "WAITING_MATERIALS",
  "WAITING_APPROVAL",
]);

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [tab, setTab] = useState<"open" | "done">("open");
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  async function load() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await apiFetch<OrderListItem[]>(`/work-orders?assignedToId=${user.id}`);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = orders.filter((o) => (tab === "open" ? OPEN_STATUSES.has(o.status) : !OPEN_STATUSES.has(o.status)));

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <div>
          <p className="text-xs text-muted-foreground">Мои заявки</p>
          <p className="font-semibold">{user?.name}</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground"
          aria-label="Выйти"
        >
          <LogOut size={16} />
        </button>
      </header>

      <div className="flex gap-2 px-4 pt-3">
        {(["open", "done"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-9 rounded-full px-4 text-sm ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {t === "open" ? "Активные" : "Завершённые"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-4">
        {loading && <p className="text-sm text-muted-foreground">Загрузка...</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">Заявок нет</p>
        )}
        {filtered.map((order) => (
          <Link
            key={order.id}
            href={`/order?id=${order.id}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">{order.number}</span>
              <StatusBadge status={order.status} />
            </div>
            <p className="font-medium leading-snug">{order.title}</p>
            {order.site && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} /> {order.site.address || order.site.name}
              </p>
            )}
            {order.priority === "urgent" && (
              <span className="w-fit rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-500">
                Срочно
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
