"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlaBadge } from "@/components/ui/sla-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";
import { REQUEST_TYPES, useRequestTypeLabels } from "@/lib/request-types";
import { useLocale } from "@/lib/i18n/context";

interface WorkOrder {
  id: string;
  number: string;
  title: string;
  status: string;
  requestType: string;
  slaStatus: string | null;
  createdAt: string;
  client?: { name: string } | null;
  site?: { name: string; address: string | null } | null;
  assignedTo?: { name: string } | null;
}

export default function WorkOrdersPage() {
  const { t, locale } = useLocale();
  const requestTypeLabels = useRequestTypeLabels();
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestType, setRequestType] = useState("OTHER");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const data = await apiFetch<WorkOrder[]>("/work-orders");
      setOrders(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.workOrders.loadError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/work-orders", {
        method: "POST",
        body: JSON.stringify({ title, description, requestType }),
      });
      setTitle("");
      setDescription("");
      setRequestType("OTHER");
      setShowCreate(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.workOrders.createError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t.workOrders.title}</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> {t.workOrders.newOrder}
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={createOrder} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.workOrders.name}</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.workOrders.description}</label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{t.workOrders.type}</label>
                <select
                  className="h-9 rounded-md border bg-transparent px-2 text-sm"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  {REQUEST_TYPES.map((rt) => (
                    <option key={rt} value={rt}>
                      {requestTypeLabels[rt as keyof typeof requestTypeLabels]}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" disabled={busy}>
                {busy ? t.workOrders.creating : t.workOrders.create}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">{t.workOrders.colNumber}</th>
                <th className="px-4 py-3 font-medium">{t.workOrders.colTitle}</th>
                <th className="px-4 py-3 font-medium">{t.workOrders.colType}</th>
                <th className="px-4 py-3 font-medium">{t.workOrders.colClientSite}</th>
                <th className="px-4 py-3 font-medium">{t.workOrders.colAssignee}</th>
                <th className="px-4 py-3 font-medium">{t.workOrders.colStatus}</th>
                <th className="px-4 py-3 font-medium">{t.workOrders.colCreated}</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8">
                    <PageLoader className="p-0" />
                  </td>
                </tr>
              )}
              {!loading && orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <Link href={`/work-orders/${o.id}`} className="font-medium hover:underline">
                      {o.number}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{o.title}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {requestTypeLabels[o.requestType as keyof typeof requestTypeLabels] ?? o.requestType}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.client?.name ?? "—"} {o.site ? `/ ${o.site.name}` : ""}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.assignedTo?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge status={o.status} />
                      <SlaBadge status={o.slaStatus} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU")}
                  </td>
                </tr>
              ))}
              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6">
                    <EmptyState icon={ClipboardList} title={t.workOrders.empty} bordered={false} />
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
