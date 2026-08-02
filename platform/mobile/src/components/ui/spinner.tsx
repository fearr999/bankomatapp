"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";

export function PageLoader({ className, label }: { className?: string; label?: string }) {
  const { t } = useLocale();
  return (
    <div className={cn("flex animate-fade-in items-center gap-2 p-5 text-sm text-muted-foreground", className)}>
      <Loader2 size={15} className="animate-spin" />
      {label ?? t.shell.loading}
    </div>
  );
}
