import type { Metadata, Viewport } from "next";
import { Onest, Golos_Text } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SwRegister } from "@/components/sw-register";
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
    <html lang="ru" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <SwRegister />
          <div className="mx-auto min-h-screen max-w-md">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
