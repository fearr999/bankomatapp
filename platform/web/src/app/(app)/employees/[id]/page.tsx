"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/ui/kpi-card";
import { ClipboardList, CheckCircle2, Clock, Star, ShieldOff } from "lucide-react";
import { apiFetch, getCurrentUser } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

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
  const { t, locale } = useLocale();
  const params = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const isAdmin = getCurrentUser()?.role === "ADMIN";

  useEffect(() => {
    apiFetch<EmployeeDetail>(`/users/${params.id}`)
      .then(setEmployee)
      .catch((e) => setError(e.message));
  }, [params.id]);

  async function revokeSessions() {
    if (!employee) return;
    setRevoking(true);
    try {
      await apiFetch(`/users/${employee.id}/revoke-sessions`, { method: "POST" });
      setRevoked(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.employees.revokeError);
    } finally {
      setRevoking(false);
    }
  }

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
            {employee.specialization ?? t.employees.noSpecialization} · {employee.team?.name ?? t.employees.noTeam}
          </p>
        </div>
        <span
          className={`ml-auto rounded-full px-2.5 py-1 text-xs ${
            employee.status === "online"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-zinc-500/10 text-zinc-500"
          }`}
        >
          {employee.status === "online" ? t.employees.online : t.employees.offline}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label={t.employees.totalOrders} value={employee.stats.totalOrders} icon={ClipboardList} />
        <KpiCard label={t.employees.completed} value={employee.stats.completed} icon={CheckCircle2} tone="success" />
        <KpiCard label={t.employees.active} value={employee.stats.active} icon={Clock} />
        <KpiCard label={t.employees.rating} value={employee.rating?.toFixed(1) ?? "—"} icon={Star} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.employees.contacts}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Email: {employee.email}</span>
          <span className="text-muted-foreground">
            {t.employees.phone}: {employee.phone ?? "—"}
          </span>
          <span className="text-muted-foreground">
            {t.employees.lastLocation}:{" "}
            {employee.locationUpdatedAt
              ? new Date(employee.locationUpdatedAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")
              : t.employees.noLocationData}
          </span>
          <span className="text-muted-foreground">
            {t.employees.memberSince}:{" "}
            {new Date(employee.createdAt).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU")}
          </span>
        </CardContent>
        {isAdmin && (
          <CardContent className="flex items-center justify-between gap-3 border-t pt-4">
            <div>
              <p className="text-sm font-medium">{t.employees.revokeAccess}</p>
              <p className="text-xs text-muted-foreground">{t.employees.revokeDescription}</p>
            </div>
            <Button variant="outline" size="sm" disabled={revoking || revoked} onClick={revokeSessions}>
              <ShieldOff size={14} />{" "}
              {revoked ? t.employees.revoked : revoking ? t.employees.revoking : t.employees.revoke}
            </Button>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.employees.orderHistory}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {employee.orderHistory.length === 0 && (
            <EmptyState icon={ClipboardList} title={t.employees.noOrderHistory} size="sm" bordered={false} />
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
                  {new Date(o.updatedAt).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU")}
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
