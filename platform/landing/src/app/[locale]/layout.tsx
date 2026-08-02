import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geist = localFont({
  src: [
    { path: "../../fonts/Geist-400.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/Geist-500.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/Geist-600.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/Geist-700.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/Geist-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const TITLES: Record<string, string> = {
  ru: "Corpi — платформа управления выездным обслуживанием",
  en: "Corpi — Field Service Management platform",
  uz: "Corpi — dala xizmatini boshqarish platformasi",
};

const DESCRIPTIONS: Record<string, string> = {
  ru: "Corpi — единая система для банков и подрядчиков: заявки, диспетчеризация, карта, чек-листы, фотоотчёты, обслуживание банкоматов и аналитика в реальном времени.",
  en: "Corpi is a unified platform for banks and contractors: work orders, dispatch, live map, checklists, photo reports, ATM servicing and real-time analytics.",
  uz: "Corpi — banklar va pudratchilar uchun yagona tizim: arizalar, dispetcherlik, xarita, cheklistlar, foto-hisobotlar, bankomatlarga xizmat ko'rsatish va real vaqtdagi analitika.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = TITLES[locale] ?? TITLES.ru;
  const description = DESCRIPTIONS[locale] ?? DESCRIPTIONS.ru;
  return {
    metadataBase: new URL("https://thecorpi.com"),
    title,
    description,
    openGraph: { title, description, url: "https://thecorpi.com", siteName: "Corpi", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning className={geist.variable}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
