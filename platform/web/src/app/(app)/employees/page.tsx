import { Users } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Users}
      title="Сотрудники"
      description="Карточка сотрудника: фото, специализация, навыки, рейтинг, KPI, текущая задача, история маршрутов и выполненных работ."
    />
  );
}
