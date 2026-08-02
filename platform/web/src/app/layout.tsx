import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/i18n/context";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "../fonts/Geist-400.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Geist-500.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Geist-600.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Geist-700.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Geist-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corpi",
  description: "Corpi — Field Service Management platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={geist.variable}>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
