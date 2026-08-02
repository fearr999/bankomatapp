"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Map, Bell, UserCircle, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiFetch, getCurrentUser } from "@/lib/api";
import { useLocale, shiftLabel } from "@/lib/i18n/context";

const UNREAD_POLL_MS = 30_000;

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  const LEFT_ITEMS = [
    { href: "/orders", label: t.nav.orders, icon: ClipboardList },
    { href: "/map", label: t.nav.map, icon: Map },
  ];
  const RIGHT_ITEMS = [
    { href: "/notifications", label: t.nav.notifications, icon: Bell },
    { href: "/profile", label: t.nav.profile, icon: UserCircle },
  ];
  const [unread, setUnread] = useState(0);
  const [shiftStartedAt, setShiftStartedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const user = getCurrentUser();

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

  useEffect(() => {
    if (!user) return;
    apiFetch<{ shiftStartedAt: string | null }>(`/users/${user.id}`)
      .then((data) => setShiftStartedAt(data.shiftStartedAt))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleShift() {
    if (busy) return;
    setBusy(true);
    const action = shiftStartedAt ? "end" : "start";
    try {
      const data = await apiFetch<{ shiftStartedAt: string | null }>("/users/me/shift", {
        method: "POST",
        body: JSON.stringify({ action }),
      });
      setShiftStartedAt(data.shiftStartedAt);
    } catch {
      // офлайн/ошибка — оставляем прежнее состояние, попробует ещё раз
    } finally {
      setBusy(false);
    }
  }

  const active = !!shiftStartedAt;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex max-w-md items-end border-t border-border bg-card/90 backdrop-blur-xl backdrop-saturate-150">
      {LEFT_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} unread={item.href === "/notifications" ? unread : 0} />
      ))}

      <div className="flex flex-1 flex-col items-center justify-end gap-1 pb-2.5">
        <button
          onClick={toggleShift}
          disabled={busy}
          aria-label={shiftLabel(t, user?.executorType, active)}
          className={cn(
            "-mt-8 flex h-16 w-16 items-center justify-center rounded-full shadow-lg ring-[3px] ring-background transition-all duration-150 ease-out active:scale-95",
            active ? "bg-accent text-background" : "bg-primary text-primary-foreground",
            busy && "opacity-70"
          )}
        >
          <Power size={24} strokeWidth={2.4} />
        </button>
        <span className="max-w-[92px] truncate text-[10px] font-medium leading-tight text-muted-foreground">
          {shiftLabel(t, user?.executorType, active)}
        </span>
      </div>

      {RIGHT_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} unread={item.href === "/notifications" ? unread : 0} />
      ))}
    </nav>
  );
}

function NavLink({
  item,
  pathname,
  unread,
}: {
  item: { href: string; label: string; icon: typeof ClipboardList };
  pathname: string;
  unread: number;
}) {
  const active = pathname.startsWith(item.href);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs transition-colors duration-150 active:scale-95",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      <span className="relative transition-transform duration-150">
        <Icon size={20} strokeWidth={active ? 2.4 : 2} />
        {unread > 0 && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />}
      </span>
      {item.label}
    </Link>
  );
}
