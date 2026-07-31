"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "lucide-react";
import { apiFetch, getCurrentUser } from "@/lib/api";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { Button } from "@/components/ui/button";

const MyRouteMap = dynamic(() => import("@/components/map-view").then((m) => m.MyRouteMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Загрузка карты...
    </div>
  ),
});

interface OrderApi {
  id: string;
  number: string;
  title: string;
  site: { name: string; address: string | null; lat: number | null; lng: number | null } | null;
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

export default function MapPage() {
  const user = getCurrentUser();
  const geo = useGeoCheckin(true);
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    apiFetch<Array<OrderApi & { status: string }>>(`/work-orders?assignedToId=${user.id}`).then((data) => {
      const withSite = data.filter(
        (o) => OPEN_STATUSES.has(o.status) && o.site?.lat != null && o.site?.lng != null
      );
      setOrders(withSite);
      setSelectedId((prev) => prev ?? withSite[0]?.id ?? null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = orders.find((o) => o.id === selectedId) ?? null;
  const site = selected?.site;

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <p className="font-semibold">Карта</p>
        {orders.length === 0 ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Нет открытых заявок с указанным адресом объекта
          </p>
        ) : (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className={`h-8 flex-shrink-0 rounded-full px-3 text-xs ${
                  o.id === selectedId ? "bg-primary text-primary-foreground" : "border border-border"
                }`}
              >
                {o.number}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="relative flex-1">
        <MyRouteMap
          myPosition={geo.lastCoords}
          site={site && site.lat != null && site.lng != null ? { lat: site.lat, lng: site.lng, label: site.name } : null}
        />
      </div>

      {site && site.lat != null && site.lng != null && (
        <div className="border-t border-border p-4">
          <p className="mb-2 text-sm text-muted-foreground">
            {selected?.title} · {site.address ?? site.name}
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="w-full">
              <Navigation size={16} /> Построить маршрут
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
