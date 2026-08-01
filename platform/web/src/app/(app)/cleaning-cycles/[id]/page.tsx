"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { apiFetch } from "@/lib/api";

interface CycleDetailApi {
  id: string;
  number: number;
  status: "ACTIVE" | "COMPLETED" | "CLOSED_EARLY";
  startedAt: string;
  closedAt: string | null;
  team: { id: string; name: string };
  progress: { total: number; done: number };
  workOrders: Array<{
    id: string;
    status: string;
    updatedAt: string;
    equipment: { id: string; name: string; deviceType: string; serialNumber: string | null } | null;
    site: { id: string; name: string; address: string | null } | null;
  }>;
}

const DONE_STATUSES = new Set(["COMPLETED", "CLOSED"]);
const CANCELLED_STATUSES = new Set(["CANCELLED"]);

function tileClasses(status: string) {
  if (DONE_STATUSES.has(status)) return "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (CANCELLED_STATUSES.has(status)) return "border-red-600/40 bg-red-500/10 text-red-700 dark:text-red-400";
  return "border-border bg-muted/40 text-muted-foreground";
}

export default function CleaningCycleDetailPage() {
  const params = useParams<{ id: string }>();
  const [cycle, setCycle] = useState<CycleDetailApi | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    apiFetch<CycleDetailApi>(`/cleaning-cycles/${params.id}`)
      .then(setCycle)
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"));
  }, [params.id]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!cycle) return <PageLoader />;

  const pct = cycle.progress.total > 0 ? Math.round((cycle.progress.done / cycle.progress.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-5">
      <Link href="/cleaning-cycles" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> Все бригады
      </Link>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {cycle.team.name} · Цикл №{cycle.number}
        </h1>
        <p className="text-sm text-muted-foreground">
          начат {new Date(cycle.startedAt).toLocaleString("ru-RU")}
          {cycle.closedAt && ` · закрыт ${new Date(cycle.closedAt).toLocaleString("ru-RU")}`}
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-2 pt-5">
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-sm text-muted-foreground">
            {cycle.progress.done}/{cycle.progress.total} · {pct}%
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
        {cycle.workOrders.map((wo) => (
          <Link
            key={wo.id}
            href={`/work-orders/${wo.id}`}
            className={`flex flex-col items-center justify-center rounded-lg border px-1 py-3 text-center text-xs font-medium transition-colors hover:opacity-80 ${tileClasses(wo.status)}`}
            title={wo.site?.address ?? wo.site?.name ?? ""}
          >
            <span>{wo.equipment?.serialNumber ?? wo.equipment?.name ?? "—"}</span>
            <span className="mt-0.5 text-[10px] uppercase opacity-70">
              {wo.equipment?.deviceType === "atm" ? "ATM" : wo.equipment?.deviceType === "cardomat" ? "КАРТ" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
