"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { TrialBanner } from "@/components/layout/trial-banner";
import { getCurrentUser, isContractor } from "@/lib/api";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { PageLoader } from "@/components/ui/spinner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace("/login");
      return;
    }
    // Кабинет подрядчика ограничен несколькими разделами — прямой переход
    // по URL в закрытый раздел (дашборд, аналитика и т.д.) отправляем обратно.
    if (isContractor(user)) {
      const item = NAV_ITEMS.find((i) => pathname?.startsWith(i.href));
      if (item && !item.contractorVisible) {
        router.replace("/work-orders");
        return;
      }
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TrialBanner />
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div key={pathname} className="animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
