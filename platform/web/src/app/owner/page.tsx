"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Lock, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const SECRET_KEY = "corpi_owner_secret";

interface OrgRow {
  id: string;
  name: string;
  createdAt: string;
  trialEndsAt: string | null;
  subscriptionActive: boolean;
  usersCount: number;
  workOrdersCount: number;
  daysLeft: number | null;
  expired: boolean;
}

async function callOwnerApi<T>(path: string, secret: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}/owner-admin${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", "X-Admin-Secret": secret, ...options.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Ошибка запроса: ${res.status}`);
  }
  return res.json();
}

function statusBadge(org: OrgRow) {
  if (org.subscriptionActive) return { text: "Оплачено", cls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" };
  if (org.expired) return { text: "Триал истёк", cls: "bg-red-500/15 text-red-600 dark:text-red-400" };
  if (org.trialEndsAt) return { text: `Триал: ${org.daysLeft} дн.`, cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400" };
  return { text: "Без ограничений", cls: "bg-muted text-muted-foreground" };
}

export default function OwnerAdminPage() {
  const [secret, setSecret] = useState<string | null>(null);
  const [secretInput, setSecretInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const [orgs, setOrgs] = useState<OrgRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SECRET_KEY);
    if (stored) setSecret(stored);
  }, []);

  async function load(s: string) {
    setLoadError(null);
    try {
      const data = await callOwnerApi<OrgRow[]>("/organizations", s);
      setOrgs(data);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Не удалось загрузить");
    }
  }

  useEffect(() => {
    if (secret) load(secret);
  }, [secret]);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setAuthError(null);
    try {
      await callOwnerApi<OrgRow[]>("/organizations", secretInput);
      sessionStorage.setItem(SECRET_KEY, secretInput);
      setSecret(secretInput);
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setChecking(false);
    }
  }

  async function toggle(org: OrgRow) {
    if (!secret) return;
    setBusyId(org.id);
    try {
      await callOwnerApi(`/organizations/${org.id}/${org.subscriptionActive ? "deactivate" : "activate"}`, secret, {
        method: "POST",
      });
      await load(secret);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Не удалось выполнить действие");
    } finally {
      setBusyId(null);
    }
  }

  const filtered = useMemo(() => {
    if (!orgs) return [];
    const q = query.trim().toLowerCase();
    return q ? orgs.filter((o) => o.name.toLowerCase().includes(q)) : orgs;
  }, [orgs, query]);

  const stats = useMemo(() => {
    if (!orgs) return null;
    return {
      total: orgs.length,
      paying: orgs.filter((o) => o.subscriptionActive).length,
      trialing: orgs.filter((o) => !o.subscriptionActive && o.trialEndsAt && !o.expired).length,
      expired: orgs.filter((o) => o.expired).length,
    };
  }, [orgs]);

  if (!secret) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-sm animate-slide-up">
          <CardHeader>
            <Lock size={20} className="mb-1 text-muted-foreground" />
            <CardTitle className="font-display text-base text-foreground">Панель владельца</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="flex flex-col gap-3">
              <Input
                type="password"
                placeholder="Секрет"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                autoFocus
                required
              />
              {authError && <p className="text-sm text-red-500">{authError}</p>}
              <Button type="submit" disabled={checking}>
                {checking && <Loader2 size={15} className="animate-spin" />}
                {checking ? "Проверяем..." : "Войти"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold tracking-tight">Компании платформы</h1>
        <Button variant="outline" onClick={() => load(secret)}>
          <RefreshCw size={14} /> Обновить
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Всего", value: stats.total },
            { label: "Оплачивают", value: stats.paying },
            { label: "На триале", value: stats.trialing },
            { label: "Триал истёк", value: stats.expired },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <p className="text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="relative">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {loadError && <p className="text-sm text-red-500">{loadError}</p>}
      {!orgs && !loadError && <PageLoader />}

      {orgs && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Компания</th>
                <th className="px-4 py-2 font-medium">Статус</th>
                <th className="px-4 py-2 font-medium">Пользователи</th>
                <th className="px-4 py-2 font-medium">Заявки</th>
                <th className="px-4 py-2 font-medium">Создана</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((org) => {
                const badge = statusBadge(org);
                return (
                  <tr key={org.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-medium">{org.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded px-1.5 py-0.5 text-xs ${badge.cls}`}>{badge.text}</span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{org.usersCount}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{org.workOrdersCount}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {new Date(org.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Button
                        variant="outline"
                        className="h-8 px-2.5 text-xs"
                        disabled={busyId === org.id}
                        onClick={() => toggle(org)}
                      >
                        {busyId === org.id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : org.subscriptionActive ? (
                          "Отключить"
                        ) : (
                          "Активировать"
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                    Ничего не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
