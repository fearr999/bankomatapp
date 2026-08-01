import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

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
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
