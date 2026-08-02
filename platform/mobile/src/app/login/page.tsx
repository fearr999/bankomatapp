"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

export default function LoginPage() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      router.replace("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.login.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center gap-8 px-6">
      <button
        aria-label={t.shell.language}
        onClick={() => setLocale(locale === "ru" ? "uz" : "ru")}
        className="absolute right-4 top-4 rounded-md px-2.5 py-1.5 text-xs font-medium uppercase text-muted-foreground"
      >
        {locale}
      </button>
      <div className="flex animate-slide-up flex-col items-center gap-2">
        <img src="/logo.png" alt="Corpi" className="h-12 w-12 rounded-xl ring-1 ring-border/50" />
        <h1 className="font-display text-xl font-semibold tracking-tight">{t.login.title}</h1>
        <p className="text-sm text-muted-foreground">{t.login.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="flex animate-slide-up flex-col gap-3">
        <input
          type="email"
          required
          placeholder={t.login.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-md border border-border bg-transparent px-4 text-base outline-none transition-shadow duration-150 focus:ring-2 focus:ring-primary/40"
        />
        <input
          type="password"
          required
          placeholder={t.login.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-md border border-border bg-transparent px-4 text-base outline-none transition-shadow duration-150 focus:ring-2 focus:ring-primary/40"
        />
        {error && <p className="animate-fade-in text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={busy} className="mt-2 w-full">
          {busy && <Loader2 size={15} className="animate-spin" />}
          {busy ? t.login.submitting : t.login.submit}
        </Button>
      </form>
    </div>
  );
}
