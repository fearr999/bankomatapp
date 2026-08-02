"use client";

import { useTranslations } from "next-intl";
import { LayoutGrid, ClipboardList, Map as MapIcon, Landmark, BarChart3, Lock, Clock } from "lucide-react";

const NAV = [LayoutGrid, ClipboardList, MapIcon, Landmark, BarChart3];

const DOTS = [
  { x: 16, y: 26 }, { x: 32, y: 58 }, { x: 50, y: 20 }, { x: 68, y: 60 },
  { x: 80, y: 34 }, { x: 44, y: 76 }, { x: 24, y: 66 },
];

const STAFF = [
  { x: 50, y: 20 }, { x: 68, y: 60 }, { x: 24, y: 66 },
];

const ROUTE = "M16 26 C 30 8, 44 40, 50 20 S 66 78, 68 60 S 30 84, 24 66";

const ORDERS = [
  { id: "1248", status: "statusEnRoute", live: true },
  { id: "1247", status: "statusOnSite", live: false },
  { id: "1245", status: "statusAssigned", live: false },
];

export function DashboardMockup() {
  const t = useTranslations("mockup");

  const STATS = [
    { label: t("activeOrders"), value: "18" },
    { label: t("slaBreaches"), value: "2" },
    { label: t("teamsOnline"), value: "3" },
    { label: t("atms"), value: "623" },
  ];

  return (
    <div className="relative mx-auto mt-4 w-full max-w-4xl">
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 animate-float rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 bottom-4 h-36 w-36 animate-float rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/10">
        <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-background/80 px-3 py-1 text-[11px] text-muted-foreground">
            <Lock size={10} />
            {t("url")}
          </div>
        </div>

        <div className="flex">
          <div className="hidden w-12 flex-col items-center gap-3 border-r py-4 sm:flex">
            {NAV.map((Icon, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-md ${i === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <Icon size={15} />
              </div>
            ))}
          </div>

          <div className="flex-1 p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-lg border bg-background/60 p-3">
                  <p className="font-display text-lg font-semibold tracking-tight sm:text-xl">{s.value}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
              <div className="relative overflow-hidden rounded-lg border bg-background/60 p-3 sm:col-span-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">{t("dispatchCenter")}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />3 {t("onlineNow")}
                  </div>
                </div>

                <div className="relative h-36 w-full sm:h-40">
                  <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <path d={ROUTE} fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2.5 2.5" opacity="0.55" />
                  </svg>

                  {DOTS.map((d, i) => (
                    <span
                      key={i}
                      className="absolute h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                      style={{ left: `${d.x}%`, top: `${d.y}%` }}
                    />
                  ))}

                  {STAFF.map((s, i) => (
                    <span key={i} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                      <span className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-emerald-500/40" />
                      <span className="relative block h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
                    </span>
                  ))}

                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full border bg-background/90 px-2 py-1 text-[10px] font-medium shadow-sm backdrop-blur">
                    <Clock size={10} className="text-accent" />
                    {t("slaChip", { min: 42 })}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background/60 p-3 sm:col-span-2">
                <p className="mb-2.5 text-[11px] text-muted-foreground">{t("recentOrders")}</p>
                <div className="flex flex-col gap-2.5">
                  {ORDERS.map((o) => (
                    <div key={o.id} className="flex items-center gap-2">
                      <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-accent">
                        {o.live && <span className="absolute inset-0 animate-ping rounded-full bg-accent" />}
                      </span>
                      <span className="flex-1 truncate text-[11px] font-medium">#{o.id}</span>
                      <span className="shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                        {t(o.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
