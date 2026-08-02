"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ru } from "./dictionaries/ru";
import { uz } from "./dictionaries/uz";

export type Locale = "ru" | "uz";
export type Dictionary = typeof ru;

const dictionaries: Record<Locale, Dictionary> = { ru, uz };
const STORAGE_KEY = "fsm_mobile_locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ru",
  setLocale: () => {},
  t: ru,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ru" || stored === "uz") setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function shiftLabel(t: Dictionary, executorType: string | undefined, active: boolean): string {
  const labels = t.shift[(executorType as keyof Dictionary["shift"]) ?? "STAFF"] ?? t.shift.STAFF;
  return active ? labels.active : labels.start;
}
