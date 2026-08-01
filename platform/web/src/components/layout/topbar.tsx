"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/lib/api";
import { MobileNav } from "./mobile-nav";

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);

  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
  }, []);

  return (
    <header className="flex h-14 items-center justify-between border-b px-3 sm:px-5">
      <MobileNav />
      <div className="flex items-center gap-1.5 sm:gap-2">
        {mounted && (
          <Button
            variant="ghost"
            className="h-9 w-9 p-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        )}
        {user && <span className="hidden text-sm text-muted-foreground sm:inline">{user.name}</span>}
        <Button
          variant="ghost"
          className="h-9 w-9 p-0"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut size={16} />
        </Button>
      </div>
    </header>
  );
}
