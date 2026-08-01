"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [organizationName, setOrganizationName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await register(organizationName, name, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
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
          <CardTitle className="text-lg text-foreground">Создать компанию</CardTitle>
          <p className="text-sm text-muted-foreground">
            Своя изолированная организация в Corpi — вы становитесь первым администратором
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Название компании"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Пароль (мин. 6 символов)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            {error && <p className="animate-fade-in text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={busy}>
              {busy && <Loader2 size={15} className="animate-spin" />}
              {busy ? "Создаём..." : "Создать компанию"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-foreground underline underline-offset-2 transition-colors hover:text-primary">
              Войти
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
