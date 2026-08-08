import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { SwRegister } from "@/components/sw-register";
import { AppSplash } from "@/components/app-splash";
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
  description: "Corpi — приложение полевого сотрудника",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Corpi" },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={geist.variable}>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <SwRegister />
            <AppSplash />
            <div className="mx-auto min-h-screen max-w-md">{children}</div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
