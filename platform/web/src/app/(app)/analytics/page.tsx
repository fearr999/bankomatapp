"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Clock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { STATUS_LABELS } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";

interface Summary {
  total: number;
  byStatus: Record<string, number>;
  slaCompliance: number | null;
  avgCompletionHours: number | null;
  byEmployee: Array<{ name: string; total: number; completed: number }>;
  byTeam: Array<{ name: string; total: number; completed: number }>;
  ordersOverTime: Array<{ date: string; count: number }>;
}

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Summary>("/analytics/summary")
      .then(setSummary)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!summary) return <p className="text-sm text-muted-foreground">Загрузка...</p>;

  const maxDay = Math.max(1, ...summary.ordersOverTime.map((d) => d.count));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Аналитика</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <KpiCard label="Всего заявок" value={summary.total} icon={ClipboardList} />
        <KpiCard
          label="Соблюдение SLA"
          value={summary.slaCompliance != null ? `${Math.round(summary.slaCompliance * 100)}%` : "—"}
          icon={ShieldCheck}
          tone={summary.slaCompliance != null && summary.slaCompliance < 0.8 ? "danger" : "success"}
        />
        <KpiCard
          label="Среднее время выполнения"
          value={summary.avgCompletionHours != null ? `${summary.avgCompletionHours.toFixed(1)} ч` : "—"}
          icon={Clock}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Заявки за 14 дней</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-end gap-1">
            {summary.ordersOverTime.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-primary/70"
                  style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }}
                  title={`${d.date}: ${d.count}`}
                />
                <span className="text-[9px] text-muted-foreground">{d.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>По статусам</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            {Object.entries(summary.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between text-sm">
                <span>{STATUS_LABELS[status] ?? status}</span>
                <span className="text-muted-foreground">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Бригады</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            {summary.byTeam.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span>{t.name}</span>
                <span className="text-muted-foreground">
                  {t.completed}/{t.total} завершено
                </span>
              </div>
            ))}
            {summary.byTeam.length === 0 && (
              <p className="text-sm text-muted-foreground">Нет данных по бригадам</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Эффективность сотрудников</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-4 py-2 font-medium">Сотрудник</th>
                <th className="px-4 py-2 font-medium">Всего заявок</th>
                <th className="px-4 py-2 font-medium">Завершено</th>
                <th className="px-4 py-2 font-medium">% завершения</th>
              </tr>
            </thead>
            <tbody>
              {summary.byEmployee.map((e) => (
                <tr key={e.name} className="border-b last:border-0">
                  <td className="px-4 py-2">{e.name}</td>
                  <td className="px-4 py-2">{e.total}</td>
                  <td className="px-4 py-2">{e.completed}</td>
                  <td className="px-4 py-2">{Math.round((e.completed / e.total) * 100)}%</td>
                </tr>
              ))}
              {summary.byEmployee.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                    Нет данных
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
