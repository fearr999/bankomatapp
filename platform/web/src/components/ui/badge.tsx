import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  ASSIGNED: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  EN_ROUTE: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ARRIVED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  IN_PROGRESS: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  WAITING_MATERIALS: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  WAITING_APPROVAL: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  COMPLETED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  CLOSED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  CANCELLED: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400",
};

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

export function Badge({
  status,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { status?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        status ? STATUS_STYLES[status] ?? "bg-muted text-muted-foreground" : "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    >
      {status ? STATUS_LABELS[status] ?? status : props.children}
    </span>
  );
}
