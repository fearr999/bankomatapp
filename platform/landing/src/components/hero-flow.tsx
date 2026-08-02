const PATH_1 = "M-50 140 C 200 60, 350 220, 560 130 S 900 20, 1250 110";
const PATH_2 = "M-50 300 C 250 380, 420 210, 650 300 S 980 410, 1250 320";
const PATH_3 = "M-50 460 C 220 400, 480 540, 700 450 S 1000 380, 1250 450";
const PATH_4 = "M-50 600 C 180 660, 400 550, 620 610 S 950 680, 1250 600";
const PATH_5 = "M50 -50 C 130 180, 40 380, 150 560 S 60 700, 120 900";
const PATH_6 = "M1100 -50 C 1020 200, 1140 380, 1030 560 S 1120 720, 1060 900";

const SITES = [
  { x: 150, y: 95 }, { x: 560, y: 130 }, { x: 900, y: 40 },
  { x: 260, y: 340 }, { x: 650, y: 300 }, { x: 1020, y: 370 },
  { x: 220, y: 470 }, { x: 700, y: 450 }, { x: 1080, y: 420 },
  { x: 380, y: 610 }, { x: 800, y: 600 }, { x: 1150, y: 560 },
];

export function HeroFlow() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28] dark:opacity-[0.32]"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <path id="flow-path-1" d={PATH_1} />
        <path id="flow-path-2" d={PATH_2} />
        <path id="flow-path-3" d={PATH_3} />
        <path id="flow-path-4" d={PATH_4} />
        <path id="flow-path-5" d={PATH_5} />
        <path id="flow-path-6" d={PATH_6} />
      </defs>

      {[PATH_1, PATH_2, PATH_3, PATH_4].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={i % 2 === 0 ? "2 14" : "2 16"}
          className={i % 2 === 0 ? "animate-flow-dash" : "animate-flow-dash-slow"}
          style={i === 3 ? { animationDuration: "48s", animationDirection: "reverse" } : undefined}
        />
      ))}
      {[PATH_5, PATH_6].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 15"
          className="animate-flow-dash-slow"
          style={{ animationDuration: `${44 + i * 6}s` }}
        />
      ))}

      {SITES.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={i % 4 === 0 ? 3.5 : 2.5} fill="hsl(var(--accent))" opacity="0.75" />
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
      <circle r="4.5" fill="hsl(var(--accent))">
        <animateMotion dur="21s" repeatCount="indefinite" rotate="auto" begin="-2s">
          <mpath href="#flow-path-4" />
        </animateMotion>
      </circle>
      <circle r="4" fill="hsl(var(--accent))">
        <animateMotion dur="17s" repeatCount="indefinite" rotate="auto" begin="-6s">
          <mpath href="#flow-path-5" />
        </animateMotion>
      </circle>
      <circle r="4" fill="hsl(var(--accent))">
        <animateMotion dur="23s" repeatCount="indefinite" rotate="auto" begin="-11s">
          <mpath href="#flow-path-6" />
        </animateMotion>
      </circle>
    </svg>
  );
}
