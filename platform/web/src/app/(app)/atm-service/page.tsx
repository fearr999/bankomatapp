"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";

interface DeviceRow {
  id: string;
  name: string;
  deviceType: string;
  status: string;
  cassetteLevelPercent: number | null;
  lastCollectionAt: string | null;
  nextServiceAt: string | null;
  site?: { name: string } | null;
}

const STATUS_LABELS: Record<string, string> = {
  operational: "Исправно",
  broken: "Неисправно",
  maintenance: "На обслуживании",
};
const STATUS_STYLES: Record<string, string> = {
  operational: "bg-emerald-500/10 text-emerald-600",
  broken: "bg-red-500/10 text-red-600",
  maintenance: "bg-amber-500/10 text-amber-600",
};
const TYPE_LABELS: Record<string, string> = { atm: "Банкомат", cardomat: "Картомат" };

function cassetteColor(pct: number) {
  if (pct >= 80) return "bg-red-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-emerald-500";
}

export default function AtmServicePage() {
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<DeviceRow[]>("/equipment")
      .then((all) => setDevices(all.filter((d) => d.deviceType === "atm" || d.deviceType === "cardomat")))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Обслуживание банкоматов</h1>
        <p className="text-sm text-muted-foreground">
          Банкоматы и картоматы — статус, заполненность кассет, инкассация, аварийные вызовы. Чтобы
          устройство попало сюда, укажите тип «Банкомат»/«Картомат» в карточке в разделе «Оборудование».
        </p>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading && <PageLoader />}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {!loading && devices.map((d) => (
          <Link key={d.id} href={`/equipment/${d.id}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{d.name}</span>
                  <span className={`rounded px-2 py-0.5 text-xs ${STATUS_STYLES[d.status]}`}>
                    {STATUS_LABELS[d.status] ?? d.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {TYPE_LABELS[d.deviceType]} · {d.site?.name ?? "Без объекта"}
                </span>

                {d.cassetteLevelPercent != null && (
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Заполненность кассет</span>
                      <span className="flex items-center gap-1">
                        {d.cassetteLevelPercent >= 80 && <AlertTriangle size={11} className="text-red-500" />}
                        {d.cassetteLevelPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${cassetteColor(d.cassetteLevelPercent)}`}
                        style={{ width: `${d.cassetteLevelPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                <span className="text-xs text-muted-foreground">
                  Инкассация:{" "}
                  {d.lastCollectionAt ? new Date(d.lastCollectionAt).toLocaleDateString("ru-RU") : "нет данных"}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {!loading && devices.length === 0 && (
        <EmptyState
          icon={Landmark}
          title="Банкоматов/картоматов пока не заведено"
          description="Укажите тип «Банкомат»/«Картомат» в карточке в разделе «Оборудование»"
        />
      )}
    </div>
  );
}
