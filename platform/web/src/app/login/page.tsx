"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, isContractor } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

export default function LoginPage() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await login(email, password);
      router.push(isContractor(data.user) ? "/work-orders" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.login.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <a
        href="https://thecorpi.com"
        aria-label={t.shell.back}
        className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft size={18} />
      </a>
      <Button
        variant="ghost"
        aria-label={t.shell.language}
        className="absolute right-4 top-4 h-9 px-2.5 text-xs font-medium uppercase"
        onClick={() => setLocale(locale === "ru" ? "uz" : "ru")}
      >
        {locale}
      </Button>
      <Card className="w-full max-w-sm animate-slide-up">
        <CardHeader>
          <img src="/logo.png" alt="Corpi" className="mb-1 h-9 w-9 rounded-lg ring-1 ring-border/50" />
          <CardTitle className="font-display text-lg text-foreground">{t.login.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.login.subtitle}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder={t.login.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder={t.login.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="animate-fade-in text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={busy}>
              {busy && <Loader2 size={15} className="animate-spin" />}
              {busy ? t.login.submitting : t.login.submit}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t.login.noAccount}{" "}
            <Link href="/register" className="text-foreground underline underline-offset-2 transition-colors hover:text-primary">
              {t.login.createCompany}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
