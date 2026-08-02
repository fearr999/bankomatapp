"use client";

import { useTranslations } from "next-intl";
import { LayoutGrid, ClipboardList, Map as MapIcon, Landmark, BarChart3, Lock } from "lucide-react";

const NAV = [LayoutGrid, ClipboardList, MapIcon, Landmark, BarChart3];

const BARS = [38, 55, 46, 70, 58, 82, 64];

const DOTS = [
  { x: 18, y: 30 }, { x: 34, y: 55 }, { x: 52, y: 22 }, { x: 66, y: 62 },
  { x: 78, y: 38 }, { x: 46, y: 78 }, { x: 24, y: 68 }, { x: 88, y: 20 },
];

const ROUTE = "M18 30 C 30 12, 46 40, 52 22 S 70 66, 88 20";

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
                className={`flex h-8 w-8 items-center justify-center rounded-md ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
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
              <div className="rounded-lg border bg-background/60 p-3 sm:col-span-3">
                <p className="mb-2.5 text-[11px] text-muted-foreground">{t("ordersChart")}</p>
                <div className="flex h-20 items-end gap-1.5 sm:h-24">
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${i === BARS.length - 1 ? "bg-accent" : "bg-primary/15"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg border bg-background/60 p-3 sm:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">{t("dispatchCenter")}</p>
                  <div className="flex items-center -space-x-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="relative h-3.5 w-3.5 rounded-full border border-background bg-primary/20"
                      >
                        {i === 0 && (
                          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full border border-background bg-emerald-500" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative h-16 w-full sm:h-20">
                  <svg viewBox="0 0 100 44" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <path d={ROUTE} fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2.5 2.5" opacity="0.55" />
                  </svg>
                  {DOTS.map((d, i) => (
                    <span
                      key={i}
                      className="absolute h-1.5 w-1.5 rounded-full bg-accent"
                      style={{ left: `${d.x}%`, top: `${d.y}%` }}
                    >
                      {i % 3 === 0 && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent" />
                      )}
                    </span>
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
