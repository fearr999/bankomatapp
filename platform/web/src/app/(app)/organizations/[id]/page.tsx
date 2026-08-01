"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

const ORG_TYPE_LABELS: Record<string, string> = {
  BANK: "Банк",
  CONTRACTOR: "Подрядчик",
  CLEANING: "Клининг",
  SERVICE: "Сервисная организация",
  CASH_COLLECTION: "Инкассация",
  LOGISTICS: "Логистика",
  SECURITY: "Охрана",
  OTHER: "Другое",
};

interface OrgDetail {
  id: string;
  name: string;
  type: string;
  status: string;
  inn: string | null;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  address: string | null;
  serviceRegion: string | null;
  contractNumber: string | null;
  contractStartAt: string | null;
  contractEndAt: string | null;
  stats: {
    staffCount: number;
    teamCount: number;
    totalOrders: number;
    activeOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    avgCompletionHours: number | null;
    slaPercent: number | null;
    avgRating: number | null;
  };
  staff: Array<{ id: string; name: string; role: string; executorType: string; status: string; rating: number | null }>;
  teams: Array<{ id: string; name: string }>;
}

export default function OrganizationDetailPage() {
  const params = useParams<{ id: string }>();
  const [org, setOrg] = useState<OrgDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const data = await apiFetch<OrgDetail>(`/organizations/${params.id}`);
      setOrg(data);
      setForm({
        contactName: data.contactName ?? "",
        contactPhone: data.contactPhone ?? "",
        contactEmail: data.contactEmail ?? "",
        address: data.address ?? "",
        inn: data.inn ?? "",
        contractNumber: data.contractNumber ?? "",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch(`/organizations/${params.id}`, { method: "PATCH", body: JSON.stringify(form) });
      setEditing(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setBusy(false);
    }
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!org) return <PageLoader />;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{org.name}</h1>
          <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {ORG_TYPE_LABELS[org.type] ?? org.type}
          </span>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Контакты и договор</CardTitle>
              <Button variant="outline" onClick={() => setEditing((v) => !v)}>
                {editing ? "Отмена" : "Редактировать"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {editing ? (
              <form onSubmit={save} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Контактное лицо</label>
                    <Input
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Телефон</label>
                    <Input
                      value={form.contactPhone}
                      onChange={(e) => setForm((f) => ({ ...f, contactPhone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Email</label>
                    <Input
                      value={form.contactEmail}
                      onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">ИНН</label>
                    <Input value={form.inn} onChange={(e) => setForm((f) => ({ ...f, inn: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Адрес</label>
                    <Input
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">№ договора</label>
                    <Input
                      value={form.contractNumber}
                      onChange={(e) => setForm((f) => ({ ...f, contractNumber: e.target.value }))}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={busy} className="w-fit">
                  {busy ? "Сохраняем..." : "Сохранить"}
                </Button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Контактное лицо: {org.contactName ?? "—"}</span>
                <span className="text-muted-foreground">Телефон: {org.contactPhone ?? "—"}</span>
                <span className="text-muted-foreground">Email: {org.contactEmail ?? "—"}</span>
                <span className="text-muted-foreground">ИНН: {org.inn ?? "—"}</span>
                <span className="text-muted-foreground">Адрес: {org.address ?? "—"}</span>
                <span className="text-muted-foreground">№ договора: {org.contractNumber ?? "—"}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Сотрудники ({org.staff.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {org.staff.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                <span>{s.name}</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {s.rating != null ? (
                    <>
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {s.rating.toFixed(1)}
                    </>
                  ) : (
                    "—"
                  )}
                </span>
              </div>
            ))}
            {org.staff.length === 0 && <EmptyState icon={Users} title="Сотрудников пока нет" size="sm" bordered={false} />}
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Показатели</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <span className="text-muted-foreground">Всего заявок: {org.stats.totalOrders}</span>
          <span className="text-muted-foreground">Активных: {org.stats.activeOrders}</span>
          <span className="text-muted-foreground">Завершено: {org.stats.completedOrders}</span>
          <span className="text-muted-foreground">Отменено: {org.stats.cancelledOrders}</span>
          <span className="text-muted-foreground">
            Среднее время выполнения:{" "}
            {org.stats.avgCompletionHours != null ? `${org.stats.avgCompletionHours} ч` : "—"}
          </span>
          <span className="text-muted-foreground">
            SLA: {org.stats.slaPercent != null ? `${org.stats.slaPercent}%` : "—"}
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            Средний рейтинг:
            {org.stats.avgRating != null ? (
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {org.stats.avgRating}
              </span>
            ) : (
              "—"
            )}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
