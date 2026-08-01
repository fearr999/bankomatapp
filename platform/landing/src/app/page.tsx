"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { DashboardMockup } from "@/components/dashboard-mockup";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.thecorpi.com";

const FEATURES = [
  {
    icon: ClipboardList,
    title: "Заявки и SLA",
    description: "Полный цикл заявки от создания до акта — с таймером SLA и автоэскалацией просрочек.",
  },
  {
    icon: Map,
    title: "Диспетчерский центр",
    description: "Карта в реальном времени, назначение исполнителей перетаскиванием, ближайший свободный сотрудник.",
  },
  {
    icon: Landmark,
    title: "Обслуживание банкоматов",
    description: "Заполненность кассет, инкассация, аварийные вызовы — отдельный контур для банкоматов и картоматов.",
  },
  {
    icon: SprayCan,
    title: "Циклы уборки по бригадам",
    description: "Территории закреплены за бригадами; цикл сам создаёт заявки по каждой точке и закрывается, когда всё убрано.",
  },
  {
    icon: Camera,
    title: "Фотоотчёты и подпись",
    description: "Фото с геометкой, электронная подпись клиента, чек-листы под каждый тип работ — прямо с телефона.",
  },
  {
    icon: BarChart3,
    title: "Аналитика и рейтинг",
    description: "KPI по бригадам и подрядчикам, рейтинг сотрудников, сравнение SLA — на одном экране.",
  },
  {
    icon: ShieldCheck,
    title: "Мультитенантность",
    description: "Банк и каждый подрядчик видят только свои данные; доступ разграничен по ролям вплоть до конкретной заявки.",
  },
  {
    icon: Smartphone,
    title: "Мобильное приложение",
    description: "Офлайн-очередь фото, геозона-автоприбытие, QR-подтверждение — работает даже при плохой связи.",
  },
];

const STATS = [
  { value: 15, suffix: "", label: "модулей в системе" },
  { value: 623, suffix: "", label: "банкоматов на карте" },
  { value: 24, suffix: "/7", label: "мониторинг и SLA-таймер" },
  { value: 100, suffix: "%", label: "изоляция данных между компаниями" },
];

const AUDIENCE = [
  {
    title: "Банкам и сетям",
    points: [
      "Единая картина по всем подрядчикам и бригадам",
      "SLA и просрочки видны сразу, без звонков",
      "Публичная ссылка отслеживания для клиента без логина",
    ],
  },
  {
    title: "Подрядчикам",
    points: [
      "Свой кабинет — видно только свои заявки и объекты",
      "Циклы уборки и территории закрываются сами",
      "Фотоотчёты и чек-листы не теряются в чатах",
    ],
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Переключить тему"
      className="flex h-9 w-9 items-center justify-center rounded-md border text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg ring-1 ring-border/50" />
            <span className="text-sm font-semibold tracking-tight">Corpi</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
            <a href="#features" className="hover:text-foreground">Возможности</a>
            <a href="#audience" className="hover:text-foreground">Для кого</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={`${APP_URL}/login`}
              className="hidden rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-block"
            >
              Войти
            </a>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              Начать бесплатно
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
              Field Service Management нового поколения
            </span>
            <h1 className="animate-slide-up text-4xl font-semibold tracking-tight sm:text-6xl">
              Всё выездное обслуживание —
              <br />
              <span className="text-muted-foreground">в одной системе</span>
            </h1>
            <p className="max-w-2xl animate-slide-up text-balance text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "80ms" }}>
              Заявки, диспетчеризация, карта, чек-листы, фотоотчёты, обслуживание банкоматов и аналитика —
              для банков, их подрядчиков и полевых сотрудников. Работает в браузере и на телефоне.
            </p>
            <div className="flex animate-slide-up flex-col gap-3 pt-2 sm:flex-row" style={{ animationDelay: "140ms" }}>
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
              >
                Создать компанию <ArrowRight size={16} />
              </a>
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Войти в аккаунт
              </a>
            </div>
          </div>
          <div className="relative animate-slide-up px-5 pb-20" style={{ animationDelay: "200ms" }}>
            <DashboardMockup />
          </div>
        </section>

        <section className="border-y bg-muted/20">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-10 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="text-center">
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs leading-tight text-muted-foreground sm:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal className="mb-12 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Что внутри</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Модули, которые реально используются в поле, а не пылятся в демо
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 60}>
                <div className="group h-full rounded-lg border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent">
                    <f.icon size={18} />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="audience" className="border-t bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Для кого</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {AUDIENCE.map((a, i) => (
                <Reveal key={a.title} delay={i * 100}>
                  <div className="relative overflow-hidden rounded-lg border bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
                    <div className="absolute inset-y-0 left-0 w-1 bg-accent/60" />
                    <h3 className="mb-4 text-lg font-semibold">{a.title}</h3>
                    <ul className="flex flex-col gap-3">
                      {a.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                          {p}
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
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Готовы попробовать?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Создайте компанию за минуту — своя изолированная организация, без карты и без ожидания.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              Создать компанию <ArrowRight size={16} />
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Corpi</span>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-5 w-5 rounded ring-1 ring-border/50" />
            <span>thecorpi.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
