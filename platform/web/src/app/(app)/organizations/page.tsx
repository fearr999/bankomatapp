"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

interface OrgRow {
  id: string;
  name: string;
  type: string;
  status: string;
  serviceRegion: string | null;
  stats: {
    staffCount: number;
    teamCount: number;
    activeOrders: number;
    completedOrders: number;
    slaPercent: number | null;
    avgRating: number | null;
  };
}

export default function OrganizationsPage() {
  const { t } = useLocale();
  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("CONTRACTOR");
  const [serviceRegion, setServiceRegion] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setOrgs(await apiFetch<OrgRow[]>("/organizations"));
    } catch (e) {
      setError(e instanceof Error ? e.message : t.organizations.loadError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/organizations", {
        method: "POST",
        body: JSON.stringify({ name, type, serviceRegion }),
      });
      setName("");
      setServiceRegion("");
      setShowCreate(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.organizations.createError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t.organizations.title}</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> {t.organizations.newOrg}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={create} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.name}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.type}</label>
                <select
                  className="h-9 rounded-md border bg-transparent px-2 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {(Object.keys(t.orgType) as Array<keyof typeof t.orgType>)
                    .filter((v) => v !== "BANK")
                    .map((v) => (
                      <option key={v} value={v}>
                        {t.orgType[v]}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.organizations.serviceRegion}</label>
                <Input value={serviceRegion} onChange={(e) => setServiceRegion(e.target.value)} />
              </div>
              <Button type="submit" disabled={busy}>
                {busy ? t.organizations.creating : t.organizations.create}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <PageLoader />
      ) : orgs.length === 0 ? (
        <EmptyState icon={Building2} title={t.organizations.empty} description={t.organizations.emptyDescription} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {orgs.map((o) => (
            <Link key={o.id} href={`/organizations/${o.id}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="flex flex-col gap-1.5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{o.name}</span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {t.orgType[o.type as keyof typeof t.orgType] ?? o.type}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{o.serviceRegion ?? t.organizations.noRegion}</span>
                  <span className="text-xs text-muted-foreground">
                    {o.stats.staffCount} {t.organizations.staffAndTeams} {o.stats.teamCount} {t.organizations.teams}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {o.stats.activeOrders} {t.organizations.activeOrdersAndSla}{" "}
                    {o.stats.slaPercent != null ? `${o.stats.slaPercent}%` : "—"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
