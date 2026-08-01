import { cn } from "@/lib/utils";

export const STATUS_LABELS: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначена",
  EN_ROUTE: "В пути",
  ARRIVED: "Прибыл",
  IN_PROGRESS: "В работе",
  WAITING_MATERIALS: "Ожидает материалы",
  WAITING_APPROVAL: "Требуется согласование",
  COMPLETED: "Завершена",
  CLOSED: "Закрыта",
  CANCELLED: "Отменена",
};

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-500/15 text-blue-500",
  ASSIGNED: "bg-violet-500/15 text-violet-500",
  EN_ROUTE: "bg-amber-500/15 text-amber-500",
  ARRIVED: "bg-amber-500/15 text-amber-500",
  IN_PROGRESS: "bg-amber-500/15 text-amber-500",
  WAITING_MATERIALS: "bg-orange-500/15 text-orange-500",
  WAITING_APPROVAL: "bg-orange-500/15 text-orange-500",
  COMPLETED: "bg-emerald-500/15 text-emerald-500",
  CLOSED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-red-500/15 text-red-500",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        STATUS_COLORS[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
