// Детерминированная палитра цветов для бригад на карте — один и тот же
// teamId всегда получает один и тот же цвет в рамках сессии/страницы.
const PALETTE = [
  "#3b82f6", // blue
  "#22c55e", // green
  "#f59e0b", // amber
  "#ec4899", // pink
  "#a855f7", // purple
  "#14b8a6", // teal
  "#ef4444", // red
  "#eab308", // yellow
  "#6366f1", // indigo
  "#84cc16", // lime
];
const UNASSIGNED_COLOR = "#94a3b8"; // slate — без бригады

export function teamColor(teamId: string | null | undefined): string {
  if (!teamId) return UNASSIGNED_COLOR;
  let hash = 0;
  for (let i = 0; i < teamId.length; i++) {
    hash = (hash * 31 + teamId.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
