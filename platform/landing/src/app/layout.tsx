import type { Metadata } from "next";
import { Onest, Golos_Text } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const display = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const body = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecorpi.com"),
  title: "Corpi — платформа управления выездным обслуживанием",
  description:
    "Corpi — единая система для банков и подрядчиков: заявки, диспетчеризация, карта, чек-листы, фотоотчёты, обслуживание банкоматов и аналитика в реальном времени.",
  openGraph: {
    title: "Corpi — платформа управления выездным обслуживанием",
    description:
      "Заявки, диспетчеризация, карта, чек-листы, фотоотчёты, обслуживание банкоматов и аналитика — в одной системе.",
    url: "https://thecorpi.com",
    siteName: "Corpi",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corpi — платформа управления выездным обслуживанием",
    description:
      "Заявки, диспетчеризация, карта, чек-листы, фотоотчёты, обслуживание банкоматов и аналитика — в одной системе.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
