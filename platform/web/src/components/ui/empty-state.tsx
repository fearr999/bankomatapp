import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = "default",
  bordered = true,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "default" | "sm";
  bordered?: boolean;
  className?: string;
}) {
  const sm = size === "sm";
  return (
    <div
      className={cn(
        "flex animate-fade-in flex-col items-center justify-center gap-2 rounded-lg text-center",
        bordered && "border border-dashed",
        sm ? "py-6" : "py-12",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
          sm ? "h-8 w-8" : "h-11 w-11"
        )}
      >
        <Icon size={sm ? 15 : 20} />
      </div>
      <p className={cn("font-medium text-foreground", sm ? "text-xs" : "text-sm")}>{title}</p>
      {description && (
        <p className={cn("max-w-xs text-muted-foreground", sm ? "text-[11px]" : "text-xs")}>{description}</p>
      )}
      {action}
    </div>
  );
}
