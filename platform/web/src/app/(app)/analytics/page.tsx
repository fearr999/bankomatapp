import { BarChart3 } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={BarChart3}
      title="Аналитика"
      description="Отчёты по сотрудникам, бригадам, объектам, времени, финансам, SLA, KPI и повторным обращениям."
    />
  );
}
