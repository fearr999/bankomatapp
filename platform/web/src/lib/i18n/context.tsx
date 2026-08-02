"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ru } from "./dictionaries/ru";
import { uz } from "./dictionaries/uz";

export type Locale = "ru" | "uz";
export type Dictionary = typeof ru;

const dictionaries: Record<Locale, Dictionary> = { ru, uz };
const STORAGE_KEY = "fsm_locale";

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

// Не привязан к next-intl / роутингу по URL — веб-панель и мобильное
// приложение работают за логином (не нужна SEO-индексация на разных
// языках), а мобильное к тому же статический экспорт под Capacitor, где
// серверный i18n-роутинг next-intl вообще не применим.
export function useLocale() {
  return useContext(LocaleContext);
}
