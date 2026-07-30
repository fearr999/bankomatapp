import { Wrench } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Wrench}
      title="Оборудование"
      description="Карточка оборудования: модель, серийный номер, история обслуживания, документы, гарантия, статус, следующее ТО."
    />
  );
}
