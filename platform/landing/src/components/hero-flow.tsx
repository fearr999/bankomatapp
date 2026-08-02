const PATH_1 = "M-50 180 C 200 80, 350 260, 560 160 S 900 40, 1250 140";
const PATH_2 = "M-50 340 C 250 420, 420 240, 650 340 S 980 460, 1250 360";
const PATH_3 = "M-50 520 C 220 460, 480 600, 700 500 S 1000 420, 1250 500";

const SITES = [
  { x: 210, y: 118 }, { x: 560, y: 160 }, { x: 940, y: 60 },
  { x: 300, y: 380 }, { x: 650, y: 340 }, { x: 1020, y: 430 },
  { x: 260, y: 480 }, { x: 700, y: 500 }, { x: 1080, y: 470 },
];

export function HeroFlow() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16] dark:opacity-[0.22]"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <path id="flow-path-1" d={PATH_1} />
        <path id="flow-path-2" d={PATH_2} />
        <path id="flow-path-3" d={PATH_3} />
      </defs>

      <path
        d={PATH_1}
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 14"
        className="animate-flow-dash"
      />
      <path
        d={PATH_2}
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 16"
        className="animate-flow-dash-slow"
      />
      <path
        d={PATH_3}
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 14"
        className="animate-flow-dash"
        style={{ animationDuration: "50s", animationDirection: "reverse" }}
      />

      {SITES.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="3" fill="hsl(var(--accent))" opacity="0.7" />
      ))}

      {/* moving "live" markers travelling the routes — technicians/orders in motion */}
      <circle r="5" fill="hsl(var(--accent))">
        <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
          <mpath href="#flow-path-1" />
        </animateMotion>
      </circle>
      <circle r="5" fill="hsl(var(--accent))">
        <animateMotion dur="19s" repeatCount="indefinite" rotate="auto" begin="-4s">
          <mpath href="#flow-path-2" />
        </animateMotion>
      </circle>
      <circle r="5" fill="hsl(var(--accent))">
        <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="-9s">
          <mpath href="#flow-path-3" />
        </animateMotion>
      </circle>
    </svg>
  );
}
