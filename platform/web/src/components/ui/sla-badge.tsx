"use client";

import { useLocale } from "@/lib/i18n/context";

const STYLES: Record<string, string> = {
  overdue: "bg-red-500/10 text-red-600 dark:text-red-400",
  at_risk: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ok: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export function SlaBadge({ status }: { status: string | null | undefined }) {
  const { t } = useLocale();
  const labels = t.sla as Record<string, string>;
  if (!status || !(status in labels)) return null;
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {labels[status]}
    </span>
  );
}
