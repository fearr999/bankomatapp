import { Camera } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Camera}
      title="Фотоотчёты"
      description="Единая лента фотографий по заявкам с автоматической датой, временем, координатами и привязкой к исполнителю и объекту. В будущем — AI-анализ снимков."
    />
  );
}
