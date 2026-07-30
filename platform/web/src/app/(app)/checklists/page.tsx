import { ListChecks } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={ListChecks}
      title="Чек-листы"
      description="Конструктор динамических чек-листов под разные типы работ: обязательные поля, фото, комментарии, оценка."
    />
  );
}
