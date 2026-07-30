import { Sparkles } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Sparkles}
      title="AI-модуль"
      description="Анализ фотографий, прогноз загрузки и поломок оборудования, рекомендации по распределению заявок, поиск аномалий, интеллектуальный поиск по системе."
    />
  );
}
