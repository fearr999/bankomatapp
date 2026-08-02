"use client";

import { useEffect, useState } from "react";
import { getSubscriptionStatus, getSupportLink } from "@/lib/api";

export function TrialBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [supportLink, setSupportLink] = useState("https://t.me/thecorpi");

  useEffect(() => {
    getSubscriptionStatus()
      .then((s) => {
        if (s.trialEndsAt && !s.subscriptionActive && !s.expired) setDaysLeft(s.daysLeft);
      })
      .catch(() => {});
    getSupportLink().then(setSupportLink);
  }, []);

  if (daysLeft === null || daysLeft > 5) return null;

  return (
    <div className="bg-amber-500/15 px-4 py-2 text-center text-xs text-amber-700 dark:text-amber-400">
      Пробный период заканчивается{" "}
      {daysLeft === 0 ? "сегодня" : `через ${daysLeft} ${daysLeft === 1 ? "день" : "дня"}`} —{" "}
      <a href={supportLink} target="_blank" rel="noreferrer" className="underline underline-offset-2">
        свяжитесь с нами
      </a>
      .
    </div>
  );
}
