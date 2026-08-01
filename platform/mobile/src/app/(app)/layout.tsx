"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { flushOfflineQueue } from "@/lib/offline-queue";
import { BottomNav } from "@/components/bottom-nav";
import { PageLoader } from "@/components/ui/spinner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getCurrentUser()) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  useGeoCheckin(ready);

  useEffect(() => {
    if (!ready) return;
    const flush = () => flushOfflineQueue();
    flush();
    window.addEventListener("online", flush);
    return () => window.removeEventListener("online", flush);
  }, [ready]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div key={pathname} className="animate-slide-up">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
