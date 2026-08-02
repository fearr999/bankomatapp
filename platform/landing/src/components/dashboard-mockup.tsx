"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LayoutGrid, ClipboardList, Map as MapIcon, Landmark, BarChart3, Lock, Check } from "lucide-react";

const NAV = [LayoutGrid, ClipboardList, MapIcon, Landmark, BarChart3];
const VIEW_NAV_INDEX = [0, 1, 4];

const BARS = [38, 55, 46, 70, 58, 82, 64];
const ANALYTICS_BARS = [32, 48, 40, 58, 50, 66, 54, 74, 60, 88];

const DOTS = [
  { x: 18, y: 30 }, { x: 34, y: 55 }, { x: 52, y: 22 }, { x: 66, y: 62 },
  { x: 78, y: 38 }, { x: 46, y: 78 }, { x: 24, y: 68 }, { x: 88, y: 20 },
];

const ROUTE = "M18 30 C 30 12, 46 40, 52 22 S 70 66, 88 20";

const BOARD_COLUMNS: { key: "columnNew" | "columnProgress" | "columnDone"; tone: string }[] = [
  { key: "columnNew", tone: "bg-muted-foreground/40" },
  { key: "columnProgress", tone: "bg-accent" },
  { key: "columnDone", tone: "bg-emerald-500" },
];

const RANKING = [
  { width: "92%", tone: "bg-accent" },
  { width: "70%", tone: "bg-accent/70" },
  { width: "54%", tone: "bg-accent/50" },
];

function OverviewView({ stats, t }: { stats: { label: string; value: string }[]; t: ReturnType<typeof useTranslations> }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {stats.map((s) => (
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
                <span key={i} className="relative h-3.5 w-3.5 rounded-full border border-background bg-primary/20">
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
              <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-accent" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
                {i % 3 === 0 && <span className="absolute inset-0 animate-ping rounded-full bg-accent" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function OrderDetailCard({ open, checklistDone, completed, t }: { open: boolean; checklistDone: number; completed: boolean; t: ReturnType<typeof useTranslations> }) {
  const items = [t("checklistItem1"), t("checklistItem2"), t("checklistItem3")];
  return (
    <div
      className={`absolute inset-2 z-10 flex flex-col gap-2.5 rounded-lg border bg-card p-3 shadow-xl transition-all duration-300 ease-out ${
        open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1.5 scale-[0.98] opacity-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">{t("orderTitle")}</p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors duration-300 ${
            completed ? "bg-emerald-500/15 text-emerald-500" : "bg-accent/15 text-accent"
          }`}
        >
          {completed ? t("statusDone") : t("statusInProgress")}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((label, i) => {
          const done = checklistDone > i;
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-300 ${
                  done ? "border-accent bg-accent text-white" : "border-muted-foreground/30"
                }`}
              >
                {done && <Check size={10} strokeWidth={3} />}
              </span>
              <span className={`text-[11px] transition-colors duration-300 ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersBoardView({ t, cardSelected, detailOpen, checklistDone, completed }: {
  t: ReturnType<typeof useTranslations>;
  cardSelected: boolean;
  detailOpen: boolean;
  checklistDone: number;
  completed: boolean;
}) {
  return (
    <div className="relative rounded-lg border bg-background/60 p-3">
      <p className="mb-2.5 text-[11px] text-muted-foreground">{t("ordersBoard")}</p>
      <div className="grid grid-cols-3 gap-2">
        {BOARD_COLUMNS.map((col, colIdx) => (
          <div key={col.key} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 px-0.5">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${col.tone}`} />
              <span className="truncate text-[10px] text-muted-foreground">{t(col.key)}</span>
            </div>
            {[0, 1].map((i) => {
              const isTarget = colIdx === 0 && i === 0;
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 rounded-md border bg-card p-2 shadow-sm transition-all duration-300 ${
                    isTarget && cardSelected && !completed ? "-translate-y-0.5 border-accent/50 shadow-md ring-2 ring-accent/30" : ""
                  } ${isTarget && completed ? "opacity-40" : ""}`}
                >
                  <span className="h-1.5 w-4/5 rounded-full bg-muted" />
                  <span className="h-1.5 w-1/2 rounded-full bg-muted/60" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <OrderDetailCard open={detailOpen} checklistDone={checklistDone} completed={completed} t={t} />
    </div>
  );
}

function AnalyticsView({ t, grown }: { t: ReturnType<typeof useTranslations>; grown: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
      <div className="rounded-lg border bg-background/60 p-3 sm:col-span-3">
        <p className="mb-2.5 text-[11px] text-muted-foreground">{t("ordersChart")}</p>
        <div className="flex h-24 items-end gap-1 sm:h-28">
          {ANALYTICS_BARS.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t transition-[height] duration-700 ease-out ${i === ANALYTICS_BARS.length - 1 ? "bg-accent" : "bg-primary/15"}`}
              style={{ height: grown ? `${h}%` : "3%", transitionDelay: `${i * 45}ms` }}
            />
          ))}
        </div>
      </div>
      <div className="rounded-lg border bg-background/60 p-3 sm:col-span-2">
        <p className="mb-2.5 text-[11px] text-muted-foreground">{t("teamRanking")}</p>
        <div className="flex flex-col gap-2.5">
          {RANKING.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className={`block h-full rounded-full transition-[width] duration-700 ease-out ${r.tone}`}
                  style={{ width: grown ? r.width : "0%", transitionDelay: `${i * 90}ms` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Сценарий "живой" демонстрации — не случайное переключение экранов, а
// последовательность конкретных действий диспетчера: заходит в заявки,
// открывает карточку, отмечает чек-лист, заявка закрывается, переходит в
// аналитику посмотреть результат, возвращается к обзору. Каждый шаг явно
// предваряется "нажатием" на нужный пункт меню.
export function DashboardMockup() {
  const t = useTranslations("mockup");
  const [view, setView] = useState(0);
  const [navPressed, setNavPressed] = useState<number | null>(null);
  const [cardSelected, setCardSelected] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [checklistDone, setChecklistDone] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [chartsGrown, setChartsGrown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function clickNav(index: number) {
      setNavPressed(index);
      await wait(280);
      if (cancelled) return;
      setNavPressed(null);
    }

    async function run() {
      while (!cancelled) {
        // 1. Обзор — читаем сводку.
        setView(0);
        setCardSelected(false);
        setDetailOpen(false);
        setChecklistDone(0);
        setCompleted(false);
        setChartsGrown(false);
        await wait(4200);
        if (cancelled) return;

        // 2. Переход в заявки.
        await clickNav(1);
        if (cancelled) return;
        setView(1);
        await wait(1100);
        if (cancelled) return;

        // 3. Выбор карточки заявки.
        setCardSelected(true);
        await wait(500);
        if (cancelled) return;

        // 4. Открывается карточка — чек-лист выполняется по пунктам.
        setDetailOpen(true);
        await wait(550);
        for (let i = 1; i <= 3; i++) {
          if (cancelled) return;
          setChecklistDone(i);
          await wait(620);
        }
        if (cancelled) return;
        setCompleted(true);
        await wait(950);
        if (cancelled) return;

        // 5. Карточка закрывается, заявка ушла в "Готово".
        setDetailOpen(false);
        await wait(750);
        if (cancelled) return;

        // 6. Переход в аналитику — смотрим результат за неделю.
        await clickNav(4);
        if (cancelled) return;
        setView(2);
        await wait(150);
        if (cancelled) return;
        setChartsGrown(true);
        await wait(3200);
        if (cancelled) return;

        // 7. Возврат к обзору — цикл повторяется.
        await clickNav(0);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const STATS = [
    { label: t("activeOrders"), value: "18" },
    { label: t("slaBreaches"), value: "2" },
    { label: t("teamsOnline"), value: "3" },
    { label: t("atms"), value: "623" },
  ];

  const activeNav = VIEW_NAV_INDEX[view];

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
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 ${
                  i === activeNav ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                } ${navPressed === i ? "scale-90 ring-2 ring-accent/40" : "scale-100"}`}
              >
                <Icon size={15} />
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-[452px] p-4 sm:min-h-[272px] sm:p-5">
            <div key={view} className="animate-fade-in">
              {view === 0 && <OverviewView stats={STATS} t={t} />}
              {view === 1 && (
                <OrdersBoardView t={t} cardSelected={cardSelected} detailOpen={detailOpen} checklistDone={checklistDone} completed={completed} />
              )}
              {view === 2 && <AnalyticsView t={t} grown={chartsGrown} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
