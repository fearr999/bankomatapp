import { Landmark } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Landmark}
      title="Обслуживание банкоматов"
      description="Специализированный модуль: список банкоматов/картоматов, статус устройств, инкассация, заполненность, плановое и аварийное обслуживание, контроль загрузки кассет."
    />
  );
}
