"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { getCurrentUser, getSubscriptionStatus, logout, type SubscriptionStatus } from "@/lib/api";

export default function TrialExpiredPage() {
  const router = useRouter();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace("/login");
      return;
    }
    getSubscriptionStatus()
      .then((s) => {
        setStatus(s);
        // Оплату уже провели и активировали на бэкенде — пускаем обратно в кабинет.
        if (!s.expired) router.replace("/dashboard");
      })
      .catch(() => setStatus(null));
  }, [router]);

  async function recheck() {
    setChecking(true);
    try {
      const s = await getSubscriptionStatus();
      setStatus(s);
      if (!s.expired) router.replace("/dashboard");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader>
          <img src="/logo.png" alt="Corpi" className="mb-1 h-9 w-9 rounded-lg ring-1 ring-border/50" />
          <CardTitle className="font-display text-lg text-foreground">Пробный период истёк</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm">
          <p className="text-muted-foreground">
            14 дней бесплатного доступа закончились. Чтобы продолжить работу с Corpi, свяжитесь с
            нами — выставим счёт и активируем компанию.
          </p>
          <a
            href="https://t.me/thecorpi"
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Send size={14} /> Написать в Telegram
          </a>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <Button variant="outline" onClick={recheck} disabled={checking}>
              {checking ? "Проверяем..." : "Я оплатил(а) — проверить снова"}
            </Button>
            <button
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Выйти
            </button>
          </div>
          {status === null && <PageLoader className="p-0" />}
        </CardContent>
      </Card>
    </div>
  );
}
