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
import { useLocale } from "@/lib/i18n/context";

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
  const { t, locale } = useLocale();
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
        {t.dashboard.loadError}: {error}. {t.dashboard.checkApi}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t.dashboard.title}</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <KpiCard label={t.dashboard.newOrders} value={summary?.newCount} icon={PlusCircle} />
        <KpiCard label={t.dashboard.active} value={summary?.active} icon={ClipboardList} />
        <KpiCard label={t.dashboard.inProgress} value={summary?.inProgress} icon={Clock} />
        <KpiCard label={t.dashboard.completed} value={summary?.completed} icon={CheckCircle2} tone="success" />
        <KpiCard label={t.dashboard.onlineStaff} value={summary?.onlineStaff} icon={Wifi} tone="success" />
        <KpiCard label={t.dashboard.offlineStaff} value={summary?.offlineStaff} icon={WifiOff} />
        <KpiCard label={t.dashboard.overdue} value={summary?.overdue} icon={AlertTriangle} tone="danger" />
        <KpiCard label={t.dashboard.cancelled} value={summary?.cancelled} icon={ClipboardList} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.recentEvents}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {!summary && <PageLoader className="p-0" />}
          {summary?.recentEvents.length === 0 && (
            <EmptyState icon={History} title={t.dashboard.noEvents} size="sm" bordered={false} />
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
                {e.user?.name ?? t.dashboard.system} ·{" "}
                {new Date(e.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
