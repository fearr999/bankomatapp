"use client";

import { useEffect, useState } from "react";
import { getSubscriptionStatus } from "@/lib/api";

export function TrialBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    getSubscriptionStatus()
      .then((s) => {
        if (s.trialEndsAt && !s.subscriptionActive && !s.expired) setDaysLeft(s.daysLeft);
      })
      .catch(() => {});
  }, []);

  if (daysLeft === null || daysLeft > 5) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-amber-500/15 px-4 py-1.5 text-xs text-amber-700 dark:text-amber-400">
      Пробный период заканчивается{" "}
      {daysLeft === 0 ? "сегодня" : `через ${daysLeft} ${daysLeft === 1 ? "день" : "дня"}`} —{" "}
      <a href="https://t.me/thecorpi" target="_blank" rel="noreferrer" className="underline underline-offset-2">
        свяжитесь с нами
      </a>{" "}
      для продления.
    </div>
  );
}
