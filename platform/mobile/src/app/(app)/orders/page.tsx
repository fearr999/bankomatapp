"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, MapPin, Navigation, ClipboardList } from "lucide-react";
import { apiFetch, getCurrentUser, logout } from "@/lib/api";
import { StatusBadge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/context";

interface NearestDevice {
  equipmentId: string;
  name: string;
  deviceType: string;
  siteId: string;
  siteName: string;
  address: string | null;
  distanceMeters: number;
}

function formatDistance(m: number, unitKm: string, unitM: string) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} ${unitKm}` : `${m} ${unitM}`;
}

function NearestDeviceWidget() {
  const { t } = useLocale();
  const geo = useGeoCheckin(true);
  const [nearest, setNearest] = useState<NearestDevice | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!geo.lastCoords) return;
    apiFetch<NearestDevice | null>(
      `/work-orders/nearest-device?lat=${geo.lastCoords.lat}&lng=${geo.lastCoords.lng}`
    )
      .then(setNearest)
      .catch(() => setNearest(null))
      .finally(() => setChecked(true));
  }, [geo.lastCoords?.lat, geo.lastCoords?.lng]);

  if (!geo.lastCoords || !checked || !nearest) return null;

  return (
    <div className="mx-4 mt-3 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
      <Navigation size={18} className="shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">
          {t.orders.nearestPoint} · {nearest.deviceType === "atm" ? t.orders.atm : t.orders.cardomat}
        </p>
        <p className="truncate text-sm font-medium">
          {nearest.name} — {formatDistance(nearest.distanceMeters, t.orders.km, t.orders.m)}
        </p>
        {nearest.address && <p className="truncate text-xs text-muted-foreground">{nearest.address}</p>}
      </div>
    </div>
  );
}

interface OrderListItem {
  id: string;
  number: string;
  title: string;
  status: string;
  priority: string;
  slaStatus: string | null;
  client: { name: string } | null;
  site: { name: string; address: string } | null;
  createdAt: string;
}

const SLA_STYLES: Record<string, string> = {
  overdue: "bg-red-500/15 text-red-500",
  at_risk: "bg-amber-500/15 text-amber-500",
};

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
  const { t } = useLocale();
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
          <p className="text-xs text-muted-foreground">{t.orders.title}</p>
          <p className="font-semibold">{user?.name}</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-150 active:scale-95"
          aria-label={t.orders.logout}
        >
          <LogOut size={16} />
        </button>
      </header>

      <NearestDeviceWidget />

      <div className="flex gap-2 px-4 pt-3">
        {(["open", "done"] as const).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setTab(tabKey)}
            className={`h-9 rounded-full px-4 text-sm transition-all duration-150 active:scale-95 ${
              tab === tabKey ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {tabKey === "open" ? t.orders.tabOpen : t.orders.tabDone}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-4">
        {loading && <PageLoader className="p-0" />}
        {!loading && filtered.length === 0 && (
          <EmptyState icon={ClipboardList} title={t.orders.empty} bordered={false} />
        )}
        {filtered.map((order) => (
          <Link
            key={order.id}
            href={`/order?id=${order.id}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow duration-150 active:shadow-none"
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
            <div className="flex gap-1.5">
              {order.priority === "urgent" && (
                <span className="w-fit rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-500">
                  {t.orders.urgent}
                </span>
              )}
              {order.slaStatus && t.sla[order.slaStatus as keyof typeof t.sla] && (
                <span
                  className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${SLA_STYLES[order.slaStatus]}`}
                >
                  {t.sla[order.slaStatus as keyof typeof t.sla]}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
