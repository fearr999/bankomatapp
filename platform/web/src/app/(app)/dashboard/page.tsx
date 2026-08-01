"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Wifi,
  WifiOff,
  AlertTriangle,
  PlusCircle,
  History,
} from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";

interface Summary {
  active: number;
  completed: number;
  inProgress: number;
  newCount: number;
  cancelled: number;
  onlineStaff: number;
  offlineStaff: number;
  overdue: number;
  recentEvents: Array<{
    id: string;
    message: string;
    createdAt: string;
    user?: { name: string } | null;
    workOrder: { number: string; title: string };
  }>;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Summary>("/dashboard/summary")
      .then(setSummary)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="rounded-md border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
        Не удалось загрузить данные: {error}. Проверьте, что API запущен и вы авторизованы.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <KpiCard label="Новые заявки" value={summary?.newCount} icon={PlusCircle} />
        <KpiCard label="Активные" value={summary?.active} icon={ClipboardList} />
        <KpiCard label="В работе" value={summary?.inProgress} icon={Clock} />
        <KpiCard label="Завершено" value={summary?.completed} icon={CheckCircle2} tone="success" />
        <KpiCard label="Сотрудники онлайн" value={summary?.onlineStaff} icon={Wifi} tone="success" />
        <KpiCard label="Сотрудники офлайн" value={summary?.offlineStaff} icon={WifiOff} />
        <KpiCard label="Просрочено (SLA)" value={summary?.overdue} icon={AlertTriangle} tone="danger" />
        <KpiCard label="Отменено" value={summary?.cancelled} icon={ClipboardList} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние события</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {!summary && <PageLoader className="p-0" />}
          {summary?.recentEvents.length === 0 && (
            <EmptyState icon={History} title="Пока нет событий" size="sm" bordered={false} />
          )}
          {summary?.recentEvents.map((e) => (
            <div
              key={e.id}
              className="flex items-start justify-between rounded-md border-b px-2 -mx-2 pb-2 text-sm transition-colors last:border-0 hover:bg-muted/30"
            >
              <div>
                <span className="font-medium">{e.workOrder.number}</span>{" "}
                <span className="text-muted-foreground">{e.message}</span>
              </div>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {e.user?.name ?? "система"} · {new Date(e.createdAt).toLocaleString("ru-RU")}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
