import { Warehouse } from "lucide-react";
import { PlaceholderModule } from "@/components/layout/placeholder-module";

export default function Page() {
  return (
    <PlaceholderModule
      icon={Warehouse}
      title="Склад"
      description="Учёт материалов, запчастей и расходников: выдача, возврат, списание, остатки."
    />
  );
}
