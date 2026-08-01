"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isContractor } from "@/lib/api";
import { NAV_ITEMS } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();
  // AppLayout defers rendering children until after its auth-check effect
  // has run, so by the time Sidebar mounts localStorage is already settled —
  // safe to read synchronously and avoid a full-nav flash for contractors.
  const items = isContractor() ? NAV_ITEMS.filter((item) => item.contractorVisible) : NAV_ITEMS;

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-card/40 md:flex">
      <div className="flex h-14 items-center gap-2 border-b px-5">
        <img src="/logo.png" alt="" className="h-6 w-6 rounded-md ring-1 ring-border/50" />
        <span className="text-sm font-semibold tracking-tight">Corpi</span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                <item.icon size={16} />
                {item.label}
              </span>
              {!item.live && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  скоро
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
