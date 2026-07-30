"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/orders", label: "Заявки", icon: ClipboardList },
  { href: "/profile", label: "Профиль", icon: UserCircle },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex max-w-md border-t border-border bg-card/95 backdrop-blur">
      {ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs",
              active ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
