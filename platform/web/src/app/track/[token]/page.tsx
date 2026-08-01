"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface TrackData {
  number: string;
  title: string;
  status: string;
  statusLabel: string;
  createdAt: string;
  updatedAt: string;
  site: { name: string; address: string | null } | null;
  timeline: Array<{ message: string; createdAt: string }>;
}

const DONE_STATUSES = new Set(["COMPLETED", "CLOSED"]);

export default function PublicTrackPage() {
  const params = useParams<{ token: string }>();
  const [data, setData] = useState<TrackData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/public/track/${params.token}`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Ссылка недействительна");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Ошибка"));
  }, [params.token]);

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 bg-muted/20 px-4 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg ring-1 ring-border/50" />
        <p className="text-sm font-semibold tracking-tight">Corpi</p>
        <p className="text-xs text-muted-foreground">Отслеживание заявки</p>
      </div>

      {error && (
        <div className="rounded-lg border bg-card p-6 text-center text-sm text-red-500">{error}</div>
      )}

      {!error && !data && (
        <div className="flex animate-fade-in items-center justify-center gap-2 rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">
          <Loader2 size={15} className="animate-spin" />
          Загрузка...
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border bg-card p-5">
            <p className="text-xs text-muted-foreground">{data.number}</p>
            <h1 className="text-lg font-semibold">{data.title}</h1>
            {data.site && (
              <p className="mt-1 text-sm text-muted-foreground">
                {data.site.name}
                {data.site.address ? `, ${data.site.address}` : ""}
              </p>
            )}
            <div
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                DONE_STATUSES.has(data.status)
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-blue-500/10 text-blue-600"
              }`}
            >
              {DONE_STATUSES.has(data.status) ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              {data.statusLabel}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5">
            <p className="mb-3 text-sm font-semibold">История</p>
            <div className="flex flex-col gap-3">
              {data.timeline.map((e, i) => (
                <div key={i} className="border-l-2 border-border pl-3 text-sm">
                  <p>{e.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.createdAt).toLocaleString("ru-RU")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
