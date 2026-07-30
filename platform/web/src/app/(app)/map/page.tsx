import { MapPinned } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={MapPinned}
      title="Карта"
      description="Общая карта сотрудников, клиентов, объектов, банкоматов/картоматов, маршрутов и истории перемещений."
    />
  );
}
