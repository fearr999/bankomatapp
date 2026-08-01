"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, isContractor } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@fsm.local");
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
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm animate-slide-up">
        <CardHeader>
          <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            C
          </div>
          <CardTitle className="text-lg text-foreground">Corpi</CardTitle>
          <p className="text-sm text-muted-foreground">Войдите, чтобы продолжить</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="animate-fade-in text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={busy}>
              {busy && <Loader2 size={15} className="animate-spin" />}
              {busy ? "Входим..." : "Войти"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-foreground underline underline-offset-2 transition-colors hover:text-primary">
              Создать компанию
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
