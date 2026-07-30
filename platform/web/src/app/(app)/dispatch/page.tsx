import { Map } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Map}
      title="Диспетчерский центр"
      description="Интерактивная карта с сотрудниками, маршрутами и зонами обслуживания. Диспетчер сможет перетаскивать заявки между исполнителями и следить за перемещением в реальном времени."
    />
  );
}
