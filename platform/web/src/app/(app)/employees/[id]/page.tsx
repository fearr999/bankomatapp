"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/ui/kpi-card";
import { ClipboardList, CheckCircle2, Clock, Star } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface EmployeeDetail {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  specialization: string | null;
  status: string;
  rating: number | null;
  lat: number | null;
  lng: number | null;
  locationUpdatedAt: string | null;
  createdAt: string;
  team?: { id: string; name: string } | null;
  stats: { totalOrders: number; completed: number; active: number };
  orderHistory: Array<{
    id: string;
    number: string;
    title: string;
    status: string;
    updatedAt: string;
  }>;
}

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<EmployeeDetail>(`/users/${params.id}`)
      .then(setEmployee)
      .catch((e) => setError(e.message));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!employee) return <PageLoader />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {employee.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{employee.name}</h1>
          <p className="text-sm text-muted-foreground">
            {employee.specialization ?? "Специализация не указана"} · {employee.team?.name ?? "Без бригады"}
          </p>
        </div>
        <span
          className={`ml-auto rounded-full px-2.5 py-1 text-xs ${
            employee.status === "online"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-zinc-500/10 text-zinc-500"
          }`}
        >
          {employee.status === "online" ? "На линии" : "Офлайн"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Всего заявок" value={employee.stats.totalOrders} icon={ClipboardList} />
        <KpiCard label="Завершено" value={employee.stats.completed} icon={CheckCircle2} tone="success" />
        <KpiCard label="В работе" value={employee.stats.active} icon={Clock} />
        <KpiCard label="Рейтинг" value={employee.rating?.toFixed(1) ?? "—"} icon={Star} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Контакты и данные</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Email: {employee.email}</span>
          <span className="text-muted-foreground">Телефон: {employee.phone ?? "—"}</span>
          <span className="text-muted-foreground">
            Последняя геопозиция:{" "}
            {employee.locationUpdatedAt
              ? new Date(employee.locationUpdatedAt).toLocaleString("ru-RU")
              : "нет данных"}
          </span>
          <span className="text-muted-foreground">
            В команде с: {new Date(employee.createdAt).toLocaleDateString("ru-RU")}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История заявок</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {employee.orderHistory.length === 0 && (
            <EmptyState icon={ClipboardList} title="Пока нет назначенных заявок" size="sm" bordered={false} />
          )}
          {employee.orderHistory.map((o) => (
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
