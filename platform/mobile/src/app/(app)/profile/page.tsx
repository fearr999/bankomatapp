"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut, Settings } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/context";

function initials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useLocale();
  const user = getCurrentUser();
  const roleLabel =
    (user?.executorType && t.profile.roleLabel[user.executorType as keyof typeof t.profile.roleLabel]) ||
    t.profile.roleLabel.OTHER;

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-4 py-4 backdrop-blur-xl backdrop-saturate-150">
        <p className="font-semibold">{t.nav.profile}</p>
        <Link
          href="/settings"
          aria-label={t.profile.settings}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-150 active:scale-95"
        >
          <Settings size={16} />
        </Link>
      </header>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-7 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            {initials(user?.name)}
          </div>
          <div>
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {roleLabel}
          </span>
        </div>

        <Link
          href="/settings"
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm shadow-sm transition-shadow duration-150 active:shadow-none"
        >
          <span className="flex items-center gap-2 font-medium">
            <Settings size={16} />
            {t.profile.settings}
          </span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </Link>

        <Button
          variant="outline"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          <LogOut size={16} /> {t.profile.logout}
        </Button>
      </div>
    </div>
  );
}
