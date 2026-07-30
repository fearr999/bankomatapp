import { Bell } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Bell}
      title="Уведомления"
      description="Единый центр уведомлений: push, email, Telegram, SMS."
    />
  );
}
