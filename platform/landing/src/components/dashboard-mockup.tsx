import { LayoutGrid, ClipboardList, Map as MapIcon, Landmark, BarChart3, Lock } from "lucide-react";

const NAV = [LayoutGrid, ClipboardList, MapIcon, Landmark, BarChart3];

const STATS = [
  { label: "Активные заявки", value: "18" },
  { label: "Просрочки SLA", value: "2" },
  { label: "Бригады онлайн", value: "3" },
  { label: "Банкоматов", value: "623" },
];

const BARS = [38, 55, 46, 70, 58, 82, 64];

const DOTS = [
  { x: 18, y: 30 }, { x: 34, y: 55 }, { x: 52, y: 22 }, { x: 66, y: 62 },
  { x: 78, y: 38 }, { x: 46, y: 78 }, { x: 24, y: 68 }, { x: 88, y: 20 },
];

export function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-4 w-full max-w-4xl">
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 animate-float rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 bottom-4 h-36 w-36 animate-float rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/10">
        <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-background/80 px-3 py-1 text-[11px] text-muted-foreground">
            <Lock size={10} />
            app.thecorpi.com/dashboard
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
                  <p className="text-lg font-semibold tracking-tight sm:text-xl">{s.value}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
              <div className="rounded-lg border bg-background/60 p-3 sm:col-span-3">
                <p className="mb-2.5 text-[11px] text-muted-foreground">Заявки за 7 дней</p>
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
                <p className="mb-2 text-[11px] text-muted-foreground">Диспетчерский центр</p>
                <div className="relative h-16 w-full sm:h-20">
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
