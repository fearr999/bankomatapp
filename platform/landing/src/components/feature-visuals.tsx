import { Check } from "lucide-react";

function OrdersVisual() {
  const rows = [
    { w: "72%", dot: "bg-emerald-500" },
    { w: "55%", dot: "bg-accent" },
    { w: "64%", dot: "bg-amber-500" },
  ];
  return (
    <div className="flex h-16 flex-col justify-center gap-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className={`relative h-1.5 w-1.5 shrink-0 rounded-full ${r.dot}`}>
            {i === 0 && <span className={`absolute inset-0 animate-ping rounded-full ${r.dot}`} />}
          </span>
          <span className="h-1.5 flex-1 rounded-full bg-muted" style={{ maxWidth: r.w }} />
          <span className="h-1.5 w-4 shrink-0 rounded-full bg-muted/60" />
        </div>
      ))}
    </div>
  );
}

function DispatchVisual() {
  return (
    <div className="relative h-16 overflow-hidden rounded-md bg-muted/40">
      <svg viewBox="0 0 100 44" className="absolute inset-0 h-full w-full">
        <path
          d="M8 34 C 25 10, 45 38, 62 14 S 90 8, 94 10"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.4"
          strokeDasharray="3 3"
          opacity="0.7"
        />
        <circle cx="8" cy="34" r="2.4" fill="hsl(var(--muted-foreground))" />
        <circle cx="62" cy="14" r="2.4" fill="hsl(var(--accent))" />
        <circle cx="94" cy="10" r="2.4" fill="hsl(var(--muted-foreground))" />
      </svg>
      <span className="absolute h-2 w-2 animate-ping rounded-full bg-accent" style={{ left: "60%", top: "27%" }} />
      <span className="absolute h-2 w-2 rounded-full bg-accent" style={{ left: "60%", top: "27%" }} />
    </div>
  );
}

function AtmVisual() {
  const bars = [
    { h: "90%", color: "bg-emerald-500" },
    { h: "55%", color: "bg-amber-500" },
    { h: "30%", color: "bg-red-500" },
    { h: "72%", color: "bg-emerald-500" },
  ];
  return (
    <div className="flex h-16 items-end justify-center gap-2.5">
      {bars.map((b, i) => (
        <div key={i} className="flex h-full w-3.5 flex-col justify-end rounded-sm bg-muted">
          <div className={`w-full rounded-sm ${b.color}`} style={{ height: b.h }} />
        </div>
      ))}
    </div>
  );
}

function CleaningVisual() {
  const items = [true, true, true, false];
  return (
    <div className="flex h-16 flex-col justify-center gap-1.5">
      {items.map((done, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${done ? "border-accent bg-accent/15 text-accent" : "border-muted-foreground/30"}`}
          >
            {done && <Check size={9} strokeWidth={3} />}
          </span>
          <span className={`h-1.5 flex-1 rounded-full ${done ? "bg-muted/60" : "bg-muted"}`} style={{ maxWidth: `${50 + i * 12}%` }} />
        </div>
      ))}
    </div>
  );
}

function PhotoVisual() {
  return (
    <div className="flex h-16 items-center gap-3">
      <div className="h-16 w-16 shrink-0 rounded-md bg-gradient-to-br from-muted to-muted-foreground/20" />
      <svg viewBox="0 0 60 24" className="h-8 flex-1">
        <path
          d="M2 18 C 8 4, 14 22, 20 10 S 30 2, 36 14 S 46 20, 52 8"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [30, 55, 40, 70, 50, 85];
  return (
    <div className="relative flex h-16 items-end justify-between gap-1.5">
      {bars.map((h, i) => (
        <div key={i} className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-accent" : "bg-muted"}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function MultitenancyVisual() {
  return (
    <div className="flex h-16 items-center justify-center gap-3">
      <div className="h-11 w-11 rounded-lg border-2 border-primary/20 bg-muted/50" />
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M6 0L11 2.2V6.2C11 9.3 8.9 12.1 6 13C3.1 12.1 1 9.3 1 6.2V2.2L6 0Z" fill="currentColor" opacity="0.9" />
        </svg>
      </div>
      <div className="h-11 w-11 rounded-lg border-2 border-accent/30 bg-accent/10" />
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex h-16 items-center justify-center gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < 2 ? "bg-accent" : "bg-muted"}`}
          style={i < 2 ? { animation: `pulse 1.6s ease-in-out ${i * 0.2}s infinite` } : undefined}
        />
      ))}
      <div className="ml-2 h-9 w-6 rounded-[5px] border-2 border-primary/30" />
    </div>
  );
}

const VISUALS: Record<string, () => JSX.Element> = {
  orders: OrdersVisual,
  dispatch: DispatchVisual,
  atm: AtmVisual,
  cleaning: CleaningVisual,
  photo: PhotoVisual,
  analytics: AnalyticsVisual,
  multitenancy: MultitenancyVisual,
  mobile: MobileVisual,
};

export function FeatureVisual({ type }: { type: string }) {
  const Visual = VISUALS[type];
  if (!Visual) return null;
  return (
    <div className="mb-4 rounded-md border border-border/60 bg-background/60 p-3">
      <Visual />
    </div>
  );
}
