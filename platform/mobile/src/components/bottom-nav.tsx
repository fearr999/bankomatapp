"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Map, Bell, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/api";

const ITEMS = [
  { href: "/orders", label: "Заявки", icon: ClipboardList },
  { href: "/map", label: "Карта", icon: Map },
  { href: "/notifications", label: "Уведомления", icon: Bell },
  { href: "/profile", label: "Профиль", icon: UserCircle },
];

const UNREAD_POLL_MS = 30_000;

export function BottomNav() {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const notifications = await apiFetch<Array<{ readAt: string | null }>>("/notifications");
        if (!cancelled) setUnread(notifications.filter((n) => !n.readAt).length);
      } catch {
        // офлайн/ошибка — просто не обновляем счётчик, не ломаем навигацию
      }
    }
    poll();
    const id = setInterval(poll, UNREAD_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex max-w-md border-t border-border bg-card/95 backdrop-blur">
      {ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        const Icon = item.icon;
        const showBadge = item.href === "/notifications" && unread > 0;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs",
              active ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span className="relative">
              <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              {showBadge && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
              )}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
