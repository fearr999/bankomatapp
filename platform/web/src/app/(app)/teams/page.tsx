import { UsersRound } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={UsersRound}
      title="Бригады"
      description="Состав бригад, руководитель, техника и оборудование, текущая загрузка, календарь и эффективность."
    />
  );
}
