import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageLoader({ className, label = "Загрузка" }: { className?: string; label?: string }) {
  return (
    <div className={cn("flex animate-fade-in items-center gap-2 p-5 text-sm text-muted-foreground", className)}>
      <Loader2 size={15} className="animate-spin" />
      {label}
    </div>
  );
}
