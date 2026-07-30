"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";

interface EquipmentDetail {
  id: string;
  name: string;
  model: string | null;
  serialNumber: string | null;
  status: string;
  warrantyUntil: string | null;
  lastServiceAt: string | null;
  nextServiceAt: string | null;
  notes: string | null;
  site?: { name: string; address: string | null } | null;
  workOrders: Array<{
    id: string;
    number: string;
    title: string;
    status: string;
    updatedAt: string;
  }>;
}

const STATUS_LABELS: Record<string, string> = {
  operational: "Исправно",
  broken: "Неисправно",
  maintenance: "На обслуживании",
};

export default function EquipmentDetailPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<EquipmentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<EquipmentDetail>(`/equipment/${params.id}`)
      .then(setItem)
      .catch((e) => setError(e.message));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!item) return <p className="text-sm text-muted-foreground">Загрузка...</p>;

  const warrantyActive = item.warrantyUntil && new Date(item.warrantyUntil) > new Date();

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
