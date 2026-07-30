"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Siren, DoorOpen, DoorClosed, Banknote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

interface EquipmentDetail {
  id: string;
  name: string;
  model: string | null;
  serialNumber: string | null;
  status: string;
  deviceType: string;
  cassetteLevelPercent: number | null;
  warrantyUntil: string | null;
  lastServiceAt: string | null;
  nextServiceAt: string | null;
  lastCollectionAt: string | null;
  notes: string | null;
  site?: { name: string; address: string | null } | null;
  workOrders: Array<{
    id: string;
    number: string;
    title: string;
    status: string;
    priority: string;
    updatedAt: string;
  }>;
  collections: Array<{
    id: string;
    amount: number | null;
    notes: string | null;
    createdAt: string;
    performedBy?: { name: string } | null;
  }>;
  accessLogs: Array<{
    id: string;
    action: string;
    notes: string | null;
    createdAt: string;
    performedBy?: { name: string } | null;
  }>;
}

const STATUS_LABELS: Record<string, string> = {
  operational: "Исправно",
  broken: "Неисправно",
  maintenance: "На обслуживании",
};

export default function EquipmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<EquipmentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [collectionAmount, setCollectionAmount] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setItem(await apiFetch<EquipmentDetail>(`/equipment/${params.id}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function recordCollection(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch(`/equipment/${params.id}/collections`, {
        method: "POST",
        body: JSON.stringify({ amount: collectionAmount ? Number(collectionAmount) : undefined }),
      });
      setCollectionAmount("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function logAccess(action: "open" | "close") {
    setBusy(true);
    try {
      await apiFetch(`/equipment/${params.id}/access-log`, {
        method: "POST",
        body: JSON.stringify({ action }),
      });
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function emergencyCall() {
    setBusy(true);
    try {
      const order = await apiFetch<{ id: string }>(`/equipment/${params.id}/emergency`, {
        method: "POST",
        body: JSON.stringify({ description: "Создано из карточки оборудования" }),
      });
      router.push(`/work-orders/${order.id}`);
    } finally {
      setBusy(false);
    }
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!item) return <p className="text-sm text-muted-foreground">Загрузка...</p>;

  const warrantyActive = item.warrantyUntil && new Date(item.warrantyUntil) > new Date();
  const isAtmLike = item.deviceType === "atm" || item.deviceType === "cardomat";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{item.name}</h1>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          {STATUS_LABELS[item.status] ?? item.status}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Характеристики</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Модель: {item.model ?? "—"}</span>
          <span className="text-muted-foreground">Серийный номер: {item.serialNumber ?? "—"}</span>
          <span className="text-muted-foreground">Объект: {item.site?.name ?? "—"}</span>
          <span className="text-muted-foreground">Адрес: {item.site?.address ?? "—"}</span>
          <span className="text-muted-foreground">
            Гарантия:{" "}
            {item.warrantyUntil
              ? `до ${new Date(item.warrantyUntil).toLocaleDateString("ru-RU")} ${
                  warrantyActive ? "(действует)" : "(истекла)"
                }`
              : "—"}
          </span>
          <span className="text-muted-foreground">
            Последнее ТО:{" "}
            {item.lastServiceAt ? new Date(item.lastServiceAt).toLocaleDateString("ru-RU") : "—"}
          </span>
          <span className="text-muted-foreground">
            Следующее ТО:{" "}
            {item.nextServiceAt ? new Date(item.nextServiceAt).toLocaleDateString("ru-RU") : "—"}
          </span>
          {item.notes && <span className="col-span-2 text-muted-foreground">Заметки: {item.notes}</span>}
        </CardContent>
      </Card>

      {isAtmLike && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Управление устройством</CardTitle>
              <Button variant="outline" onClick={emergencyCall} disabled={busy} className="text-red-600">
                <Siren size={16} /> Аварийный вызов
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {item.cassetteLevelPercent != null && (
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Заполненность кассет</span>
                  <span>{item.cassetteLevelPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      item.cassetteLevelPercent >= 80
                        ? "bg-red-500"
                        : item.cassetteLevelPercent >= 50
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${item.cassetteLevelPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-end gap-2">
              <form onSubmit={recordCollection} className="flex items-end gap-2">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Сумма инкассации</label>
                  <Input
                    type="number"
                    className="w-40"
                    value={collectionAmount}
                    onChange={(e) => setCollectionAmount(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={busy}>
                  <Banknote size={16} /> Инкассация
                </Button>
              </form>
              <Button variant="outline" onClick={() => logAccess("open")} disabled={busy}>
                <DoorOpen size={16} /> Открыто
              </Button>
              <Button variant="outline" onClick={() => logAccess("close")} disabled={busy}>
                <DoorClosed size={16} /> Закрыто
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">История инкассаций</p>
                <div className="flex flex-col gap-1">
                  {item.collections.map((c) => (
                    <div key={c.id} className="text-xs text-muted-foreground">
                      {c.amount != null ? `${c.amount.toLocaleString("ru-RU")} сум` : "—"} ·{" "}
                      {c.performedBy?.name ?? "—"} · {new Date(c.createdAt).toLocaleString("ru-RU")}
                    </div>
                  ))}
                  {item.collections.length === 0 && (
                    <p className="text-xs text-muted-foreground">Инкассаций пока не было</p>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">Журнал доступа</p>
                <div className="flex flex-col gap-1">
                  {item.accessLogs.map((a) => (
                    <div key={a.id} className="text-xs text-muted-foreground">
                      {a.action === "open" ? "Открыто" : "Закрыто"} · {a.performedBy?.name ?? "—"} ·{" "}
                      {new Date(a.createdAt).toLocaleString("ru-RU")}
                    </div>
                  ))}
                  {item.accessLogs.length === 0 && (
                    <p className="text-xs text-muted-foreground">Записей пока нет</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>История обслуживания</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {item.workOrders.length === 0 && (
            <p className="text-sm text-muted-foreground">Заявок по этому оборудованию пока нет</p>
          )}
          {item.workOrders.map((o) => (
            <Link
              key={o.id}
              href={`/work-orders/${o.id}`}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
            >
              <div>
                <span className="font-medium">{o.number}</span>{" "}
                <span className="text-muted-foreground">{o.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge status={o.status} />
                <span className="text-xs text-muted-foreground">
                  {new Date(o.updatedAt).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
