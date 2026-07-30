import { Plug } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Plug}
      title="Интеграции"
      description="Подключение Bitrix24, amoCRM, Odoo, ERPNext, карт (Google/OSM/Yandex), WhatsApp, Telegram, телефонии."
    />
  );
}
