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
import { useLocale } from "@/lib/i18n/context";

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
  const { t } = useLocale();
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
      setError(e instanceof Error ? e.message : t.organizations.loadError);
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
      setError(e instanceof Error ? e.message : t.organizations.saveError);
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
            {t.orgType[org.type as keyof typeof t.orgType] ?? org.type}
          </span>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.organizations.contactsAndContract}</CardTitle>
              <Button variant="outline" onClick={() => setEditing((v) => !v)}>
                {editing ? t.organizations.cancel : t.organizations.edit}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {editing ? (
              <form onSubmit={save} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.contactPerson}</label>
                    <Input
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.phone}</label>
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
                    <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.inn}</label>
                    <Input value={form.inn} onChange={(e) => setForm((f) => ({ ...f, inn: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.address}</label>
                    <Input
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.contractNumber}</label>
                    <Input
                      value={form.contractNumber}
                      onChange={(e) => setForm((f) => ({ ...f, contractNumber: e.target.value }))}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={busy} className="w-fit">
                  {busy ? t.organizations.saving : t.organizations.save}
                </Button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">{t.organizations.contactPerson}: {org.contactName ?? "—"}</span>
                <span className="text-muted-foreground">{t.organizations.phone}: {org.contactPhone ?? "—"}</span>
                <span className="text-muted-foreground">Email: {org.contactEmail ?? "—"}</span>
                <span className="text-muted-foreground">{t.organizations.inn}: {org.inn ?? "—"}</span>
                <span className="text-muted-foreground">{t.organizations.address}: {org.address ?? "—"}</span>
                <span className="text-muted-foreground">{t.organizations.contractNumber}: {org.contractNumber ?? "—"}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.organizations.staff} ({org.staff.length})</CardTitle>
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
            {org.staff.length === 0 && <EmptyState icon={Users} title={t.organizations.noStaff} size="sm" bordered={false} />}
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>{t.organizations.metrics}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <span className="text-muted-foreground">{t.organizations.totalOrders}: {org.stats.totalOrders}</span>
          <span className="text-muted-foreground">{t.organizations.active}: {org.stats.activeOrders}</span>
          <span className="text-muted-foreground">{t.organizations.completed}: {org.stats.completedOrders}</span>
          <span className="text-muted-foreground">{t.organizations.cancelled}: {org.stats.cancelledOrders}</span>
          <span className="text-muted-foreground">
            {t.organizations.avgCompletionTime}:{" "}
            {org.stats.avgCompletionHours != null ? `${org.stats.avgCompletionHours} ${t.organizations.hoursShort}` : "—"}
          </span>
          <span className="text-muted-foreground">
            SLA: {org.stats.slaPercent != null ? `${org.stats.slaPercent}%` : "—"}
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            {t.organizations.avgRating}:
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
