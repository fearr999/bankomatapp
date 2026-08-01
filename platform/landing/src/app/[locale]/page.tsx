"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  ClipboardList,
  Map,
  Landmark,
  SprayCan,
  Camera,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Moon,
  Sun,
  ArrowRight,
  Check,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { DashboardMockup } from "@/components/dashboard-mockup";
import { LanguageSwitcher } from "@/components/language-switcher";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.thecorpi.com";

const FEATURE_ICONS = [
  { key: "orders", icon: ClipboardList },
  { key: "dispatch", icon: Map },
  { key: "atm", icon: Landmark },
  { key: "cleaning", icon: SprayCan },
  { key: "photo", icon: Camera },
  { key: "analytics", icon: BarChart3 },
  { key: "multitenancy", icon: ShieldCheck },
  { key: "mobile", icon: Smartphone },
] as const;

const STAT_KEYS = [
  { key: "modules", value: 15, suffix: "" },
  { key: "atms", value: 623, suffix: "" },
  { key: "monitoring", value: 24, suffix: "/7" },
  { key: "isolation", value: 100, suffix: "%" },
] as const;

function ThemeToggle() {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("themeAria")}
      className="flex h-9 w-9 items-center justify-center rounded-md border text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function LandingPage() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tStats = useTranslations("stats");
  const tFeatures = useTranslations("features");
  const tAudience = useTranslations("audience");
  const tCta = useTranslations("cta");
  const tFooter = useTranslations("footer");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg ring-1 ring-border/50" />
            <span className="font-display text-sm font-semibold tracking-tight">Corpi</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
            <a href="#features" className="hover:text-foreground">{tNav("features")}</a>
            <a href="#audience" className="hover:text-foreground">{tNav("audience")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/thecorpi"
              target="_blank"
              rel="noreferrer"
              aria-label={tNav("telegramAria")}
              className="flex h-9 w-9 items-center justify-center rounded-md border text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
            >
              <Send size={15} />
            </a>
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={`${APP_URL}/login`}
              className="hidden rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-block"
            >
              {tNav("login")}
            </a>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              {tNav("cta")}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="hero-glow relative overflow-hidden">
          <div className="grid-fade pointer-events-none absolute inset-0" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 pb-16 pt-20 text-center sm:pt-28">
            <span className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {tHero("badge")}
            </span>
            <h1 className="font-display animate-slide-up text-4xl font-semibold tracking-tight sm:text-6xl">
              {tHero("titleLine1")}
              <br />
              <span className="text-muted-foreground">{tHero("titleLine2")}</span>
            </h1>
            <p className="max-w-2xl animate-slide-up text-balance text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "80ms" }}>
              {tHero("subtitle")}
            </p>
            <div className="flex animate-slide-up flex-col gap-3 pt-2 sm:flex-row" style={{ animationDelay: "140ms" }}>
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
              >
                {tHero("createCompany")} <ArrowRight size={16} />
              </a>
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                {tHero("loginToAccount")}
              </a>
            </div>
          </div>
          <div className="relative animate-slide-up px-5 pb-20" style={{ animationDelay: "200ms" }}>
            <DashboardMockup />
          </div>
        </section>

        <section className="border-y bg-muted/20">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-10 sm:grid-cols-4">
            {STAT_KEYS.map((s, i) => (
              <Reveal key={s.key} delay={i * 80} className="text-center">
                <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs leading-tight text-muted-foreground sm:text-sm">{tStats(s.key)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{tFeatures("heading")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{tFeatures("subheading")}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_ICONS.map((f, i) => (
              <Reveal key={f.key} delay={(i % 4) * 60}>
                <div className="group h-full rounded-lg border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent">
                    <f.icon size={18} />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold">{tFeatures(`${f.key}.title`)}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{tFeatures(`${f.key}.description`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="audience" className="border-t bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal className="mb-12 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{tAudience("heading")}</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {(["banks", "contractors"] as const).map((key, i) => (
                <Reveal key={key} delay={i * 100}>
                  <div className="relative overflow-hidden rounded-lg border bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
                    <div className="absolute inset-y-0 left-0 w-1 bg-accent/60" />
                    <h3 className="mb-4 text-lg font-semibold">{tAudience(`${key}.title`)}</h3>
                    <ul className="flex flex-col gap-3">
                      {[1, 2, 3].map((n) => (
                        <li key={n} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                          {tAudience(`${key}.point${n}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hero-glow relative overflow-hidden">
          <Reveal className="relative mx-auto max-w-4xl px-5 py-24 text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{tCta("heading")}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{tCta("subheading")}</p>
            <a
              href={`${APP_URL}/register`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              {tCta("createCompany")} <ArrowRight size={16} />
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
          <span>{tFooter("copyright", { year: new Date().getFullYear() })}</span>
          <a
            href="https://t.me/thecorpi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground"
          >
            <Send size={13} />
            t.me/thecorpi
          </a>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-5 w-5 rounded ring-1 ring-border/50" />
            <span>thecorpi.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
