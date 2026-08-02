export function HeroFlow() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14] dark:opacity-[0.18]"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        d="M-50 180 C 200 80, 350 260, 560 160 S 900 40, 1250 140"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 14"
        className="animate-flow-dash"
      />
      <path
        d="M-50 340 C 250 420, 420 240, 650 340 S 980 460, 1250 360"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 16"
        className="animate-flow-dash-slow"
      />
      <path
        d="M-50 520 C 220 460, 480 600, 700 500 S 1000 420, 1250 500"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 14"
        className="animate-flow-dash"
        style={{ animationDuration: "50s", animationDirection: "reverse" }}
      />
    </svg>
  );
}
