"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { App } from "@capacitor/app";
import { getCurrentUser } from "@/lib/api";
import { useGeoCheckin } from "@/lib/use-geo-checkin";
import { flushOfflineQueue } from "@/lib/offline-queue";
import { BottomNav } from "@/components/bottom-nav";
import { PageLoader } from "@/components/ui/spinner";
import { BiometricLock } from "@/components/biometric-lock";
import { isBiometricEnabled, isNativeApp } from "@/lib/biometric";
import { TrialBanner } from "@/components/trial-banner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(false);
  const wasBackgrounded = useRef(false);

  useEffect(() => {
    if (!getCurrentUser()) {
      router.replace("/login");
      return;
    }
    if (isBiometricEnabled()) setLocked(true);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!isNativeApp() || !isBiometricEnabled()) return;
    const listener = App.addListener("appStateChange", ({ isActive }) => {
      if (!isActive) {
        wasBackgrounded.current = true;
      } else if (wasBackgrounded.current) {
        wasBackgrounded.current = false;
        setLocked(true);
      }
    });
    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

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

  if (locked) {
    return <BiometricLock onUnlock={() => setLocked(false)} />;
  }

  return (
    <div className="pb-16">
      <TrialBanner />
      <div key={pathname} className="animate-slide-up">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
