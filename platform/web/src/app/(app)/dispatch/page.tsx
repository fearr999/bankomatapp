"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { REQUEST_TYPE_LABELS } from "@/lib/request-types";
import type { MapEmployee, MapOrder } from "@/components/dispatch/map-view";

// react-leaflet использует window/document — рендерим только на клиенте.
const MapView = dynamic(() => import("@/components/dispatch/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
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
  specialization: string | null;
  assignedOrders: Array<{ id: string; number: string; title: string; status: string }>;
}

interface OrderApi {
  id: string;
  number: string;
  title: string;
  status: string;
  requestType: string;
  assignedTo?: { id: string; name: string } | null;
  site?: { name: string; lat: number | null; lng: number | null } | null;
}

const POLL_MS = 8000;

export default function DispatchPage() {
  const [employees, setEmployees] = useState<EmployeeApi[]>([]);
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragOrderId, setDragOrderId] = useState<string | null>(null);
  const [eligibleIds, setEligibleIds] = useState<Set<string> | null>(null);
  const [assigning, setAssigning] = useState(false);

  const load = useCallback(async () => {
    try {
      const [e, o] = await Promise.all([
        apiFetch<EmployeeApi[]>("/users"),
        apiFetch<OrderApi[]>("/work-orders"),
      ]);
      setEmployees(e);
      setOrders(o);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, POLL_MS);
    return () => clearInterval(timer);
  }, [load]);

  async function assignOrder(orderId: string, employeeId: string) {
    if (eligibleIds && !eligibleIds.has(employeeId)) {
      setError("Этот сотрудник не подходит по типу заявки");
      return;
    }
    setAssigning(true);
    try {
      await apiFetch(`/work-orders/${orderId}/assign`, {
        method: "PATCH",
        body: JSON.stringify({ assignedToId: employeeId }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось назначить заявку");
    } finally {
      setAssigning(false);
    }
  }

  /// При начале перетаскивания подтягиваем список подходящих исполнителей
  /// по типу заявки — чтобы не давать назначить, скажем, инкассацию клинеру.
  async function startDrag(order: OrderApi) {
    setDragOrderId(order.id);
    try {
      const { users } = await apiFetch<{ users: Array<{ id: string }> }>(
        `/work-orders/eligible-assignees?requestType=${order.requestType}`
      );
      setEligibleIds(users.length ? new Set(users.map((u) => u.id)) : null);
    } catch {
      setEligibleIds(null);
    }
  }

  const unassigned = orders.filter((o) => !o.assignedTo && o.status !== "CANCELLED" && o.status !== "CLOSED");
  const mapEmployees: MapEmployee[] = employees
    .filter((e) => e.lat != null && e.lng != null)
    .map((e) => ({
      id: e.id,
      name: e.name,
      status: e.status,
      lat: e.lat as number,
      lng: e.lng as number,
      currentOrder: e.assignedOrders[0] ?? null,
    }));
  const mapOrders: MapOrder[] = orders
    .filter((o) => o.site?.lat != null && o.site?.lng != null)
    .map((o) => ({
      id: o.id,
      number: o.number,
      title: o.title,
      status: o.status,
      lat: o.site!.lat as number,
      lng: o.site!.lng as number,
    }));

  return (
    <div className="flex h-[calc(100vh-6.5rem)] flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">Диспетчерский центр</h1>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden p-0">
          <MapView employees={mapEmployees} orders={mapOrders} />
        </Card>

        <div className="flex flex-col gap-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                Сотрудники ({employees.filter((e) => e.status === "online").length} онлайн из{" "}
                {employees.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5">
              {employees.map((e) => {
                const isEligible = !dragOrderId || !eligibleIds || eligibleIds.has(e.id);
                return (
                <div
                  key={e.id}
                  onDragOver={(ev) => {
                    if (isEligible) ev.preventDefault();
                  }}
                  onDrop={() => {
                    if (dragOrderId) assignOrder(dragOrderId, e.id);
                    setDragOrderId(null);
                    setEligibleIds(null);
                  }}
                  className={`flex items-center justify-between rounded-md border border-dashed px-3 py-2 text-sm transition-colors ${
                    dragOrderId && !isEligible
                      ? "opacity-40"
                      : "hover:border-primary"
                  } ${dragOrderId && isEligible ? "border-primary/60" : ""}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          e.status === "online" ? "bg-emerald-500" : "bg-zinc-400"
                        }`}
                      />
                      {e.name}
                    </div>
                    {e.specialization && (
                      <p className="text-xs text-muted-foreground">{e.specialization}</p>
                    )}
                  </div>
                  {e.assignedOrders[0] && (
                    <span className="text-xs text-muted-foreground">{e.assignedOrders[0].number}</span>
                  )}
                </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Неназначенные заявки ({unassigned.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5">
              <p className="pb-1 text-xs text-muted-foreground">
                Перетащите заявку на сотрудника, чтобы назначить{assigning ? " (сохраняем...)" : ""}
              </p>
              {unassigned.map((o) => (
                <div
                  key={o.id}
                  draggable
                  onDragStart={() => startDrag(o)}
                  onDragEnd={() => {
                    setDragOrderId(null);
                    setEligibleIds(null);
                  }}
                  className="cursor-grab rounded-md border bg-card px-3 py-2 text-sm active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between">
                    <Link href={`/work-orders/${o.id}`} className="font-medium hover:underline">
                      {o.number}
                    </Link>
                    <Badge status={o.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{o.title}</p>
                  <p className="text-xs text-muted-foreground">{REQUEST_TYPE_LABELS[o.requestType] ?? o.requestType}</p>
                </div>
              ))}
              {unassigned.length === 0 && (
                <p className="text-sm text-muted-foreground">Все заявки назначены</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
