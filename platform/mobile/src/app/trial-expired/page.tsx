"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/spinner";
import { getCurrentUser, getSubscriptionStatus, logout, type SubscriptionStatus } from "@/lib/api";

export default function TrialExpiredPage() {
  const router = useRouter();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!getCurrentUser()) {
      router.replace("/login");
      return;
    }
    getSubscriptionStatus()
      .then((s) => {
        setStatus(s);
        if (!s.expired) router.replace("/orders");
      })
      .catch(() => setStatus(null));
  }, [router]);

  async function recheck() {
    setChecking(true);
    try {
      const s = await getSubscriptionStatus();
      setStatus(s);
      if (!s.expired) router.replace("/orders");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex animate-slide-up flex-col items-center gap-2">
        <img src="/logo.png" alt="Corpi" className="h-12 w-12 rounded-xl ring-1 ring-border/50" />
        <h1 className="font-display text-xl font-semibold tracking-tight">Пробный период истёк</h1>
        <p className="text-sm text-muted-foreground">
          14 дней бесплатного доступа закончились. Свяжитесь с нами — выставим счёт и активируем компанию.
        </p>
      </div>

      <a
        href="https://t.me/thecorpi"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-primary-foreground"
      >
        <Send size={14} /> Написать в Telegram
      </a>

      <Button variant="outline" onClick={recheck} disabled={checking}>
        {checking ? "Проверяем..." : "Я оплатил(а) — проверить снова"}
      </Button>
      <button
        onClick={() => {
          logout();
          router.replace("/login");
        }}
        className="text-xs text-muted-foreground underline underline-offset-2"
      >
        Выйти
      </button>
      {status === null && <PageLoader className="p-0" />}
    </div>
  );
}
