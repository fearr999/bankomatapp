"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrench, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
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
      setError(err instanceof Error ? err.message : "Не удалось войти");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center gap-8 px-6">
      <div className="flex animate-slide-up flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Wrench size={22} />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Corpi</h1>
        <p className="text-sm text-muted-foreground">Вход для полевого сотрудника</p>
      </div>

      <form onSubmit={onSubmit} className="flex animate-slide-up flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-md border border-border bg-transparent px-4 text-base outline-none transition-shadow duration-150 focus:ring-2 focus:ring-primary/40"
        />
        <input
          type="password"
          required
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-md border border-border bg-transparent px-4 text-base outline-none transition-shadow duration-150 focus:ring-2 focus:ring-primary/40"
        />
        {error && <p className="animate-fade-in text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={busy} className="mt-2 w-full">
          {busy && <Loader2 size={15} className="animate-spin" />}
          {busy ? "Входим..." : "Войти"}
        </Button>
      </form>
    </div>
  );
}
