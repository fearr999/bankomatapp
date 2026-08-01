"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import type { MapEmployee, MapOrder, MapSite } from "@/components/dispatch/map-view";

const MapView = dynamic(() => import("@/components/dispatch/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full animate-fade-in items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader2 size={15} className="animate-spin" />
      Загрузка карты...
    </div>
  ),
});

interface EmployeeApi {
  id: string;
  name: string;
  status: string;
  lat: number | null;
  lng: number | null;
  assignedOrders: Array<{ number: string; title: string }>;
}

interface OrderApi {
  id: string;
  number: string;
  title: string;
  status: string;
  site?: { lat: number | null; lng: number | null } | null;
}

interface SiteApi {
  id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  client?: { name: string } | null;
}

const LAYERS = [
  { key: "employees", label: "Сотрудники", color: "bg-emerald-500" },
  { key: "sites", label: "Объекты / клиенты", color: "bg-purple-500" },
  { key: "orders", label: "Активные заявки", color: "bg-blue-500" },
] as const;

type LayerKey = (typeof LAYERS)[number]["key"];

export default function MapPage() {
  const [employees, setEmployees] = useState<EmployeeApi[]>([]);
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [sites, setSites] = useState<SiteApi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<Set<LayerKey>>(new Set(["employees", "sites", "orders"]));

  useEffect(() => {
    Promise.all([
      apiFetch<EmployeeApi[]>("/users"),
      apiFetch<OrderApi[]>("/work-orders"),
      apiFetch<SiteApi[]>("/sites"),
    ])
      .then(([e, o, s]) => {
        setEmployees(e);
        setOrders(o);
        setSites(s);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"));
  }, []);

  function toggle(key: LayerKey) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const mapEmployees: MapEmployee[] = active.has("employees")
    ? employees
        .filter((e) => e.lat != null && e.lng != null)
        .map((e) => ({
          id: e.id,
          name: e.name,
          status: e.status,
          lat: e.lat as number,
          lng: e.lng as number,
          currentOrder: e.assignedOrders[0] ?? null,
        }))
    : [];

  const mapSites: MapSite[] = active.has("sites")
    ? sites
        .filter((s) => s.lat != null && s.lng != null)
        .map((s) => ({
          id: s.id,
          name: s.name,
          address: s.address,
          clientName: s.client?.name,
          lat: s.lat as number,
          lng: s.lng as number,
        }))
    : [];

  const mapOrders: MapOrder[] = active.has("orders")
    ? orders
        .filter(
          (o) =>
            o.site?.lat != null &&
            o.site?.lng != null &&
            !["COMPLETED", "CLOSED", "CANCELLED"].includes(o.status)
        )
        .map((o) => ({
          id: o.id,
          number: o.number,
          title: o.title,
          status: o.status,
          lat: o.site!.lat as number,
          lng: o.site!.lng as number,
        }))
    : [];

  return (
    <div className="flex h-[calc(100vh-6.5rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Карта</h1>
        <div className="flex items-center gap-3">
          {LAYERS.map((l) => (
            <label key={l.key} className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={active.has(l.key)}
                onChange={() => toggle(l.key)}
              />
              <span className={`h-2 w-2 rounded-full ${l.color}`} />
              {l.label}
            </label>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <Card className="flex-1 overflow-hidden p-0">
        <MapView employees={mapEmployees} orders={mapOrders} sites={mapSites} />
      </Card>

      <p className="text-xs text-muted-foreground">
        Маршруты и история перемещений появятся, когда будет накапливаться журнал геопозиций
        (сейчас хранится только последняя точка сотрудника) — следующий шаг после мобильного приложения.
      </p>
    </div>
  );
}
