import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function PlaceholderModule({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <Card className="flex flex-1 items-center justify-center">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <Icon className="text-muted-foreground" size={32} />
          <p className="max-w-md text-sm text-muted-foreground">{description}</p>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            Модуль в разработке — следующий этап
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
