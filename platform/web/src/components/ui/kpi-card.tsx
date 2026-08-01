import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number | string | null | undefined;
  icon: LucideIcon;
  tone?: "default" | "danger" | "success";
}) {
  const toneClass =
    tone === "danger"
      ? "text-red-500"
      : tone === "success"
      ? "text-emerald-500"
      : "text-foreground";

  const loading = value == null;

  return (
    <Card className="animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{label}</CardTitle>
        <Icon size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <span className="inline-block h-7 w-12 animate-shimmer rounded" />
        ) : (
          <span className={`text-2xl font-semibold ${toneClass}`}>{value}</span>
        )}
      </CardContent>
    </Card>
  );
}
