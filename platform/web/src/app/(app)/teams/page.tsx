"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { apiFetch } from "@/lib/api";

interface Member {
  id: string;
  name: string;
  status: string;
  role: string;
  specialization: string | null;
}

interface TeamRow {
  id: string;
  name: string;
  leaderId: string | null;
  leader: Member | null;
  members: Member[];
  activeOrders: number;
  totalOrders: number;
}

interface UserRow {
  id: string;
  name: string;
  teamId: string | null;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");

  async function load() {
    try {
      const [t, u] = await Promise.all([
        apiFetch<TeamRow[]>("/teams"),
        apiFetch<UserRow[]>("/users"),
      ]);
      setTeams(t);
      setUsers(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createTeam(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch("/teams", { method: "POST", body: JSON.stringify({ name }) });
    setName("");
    setShowCreate(false);
    await load();
  }

  async function addMember(teamId: string, userId: string) {
    if (!userId) return;
    await apiFetch(`/teams/${teamId}/members`, {
      method: "POST",
      body: JSON.stringify({ userId, action: "add" }),
    });
    await load();
  }

  async function removeMember(teamId: string, userId: string) {
    await apiFetch(`/teams/${teamId}/members`, {
      method: "POST",
      body: JSON.stringify({ userId, action: "remove" }),
    });
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Бригады</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> Новая бригада
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={createTeam} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Название бригады</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <Button type="submit">Создать</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading && <PageLoader />}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {!loading && teams.map((t) => {
          const availableUsers = users.filter((u) => u.teamId !== t.id);
          return (
            <Card key={t.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">{t.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {t.activeOrders} активных / {t.totalOrders} всего
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Руководитель: {t.leader?.name ?? "не назначен"}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {t.members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-md border px-3 py-1.5 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          m.status === "online" ? "bg-emerald-500" : "bg-zinc-400"
                        }`}
                      />
                      {m.name}
                      {m.specialization && (
                        <span className="text-xs text-muted-foreground">· {m.specialization}</span>
                      )}
                    </div>
                    <button
                      onClick={() => removeMember(t.id, m.id)}
                      className="text-muted-foreground transition-colors hover:text-red-500"
                      title="Убрать из бригады"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {t.members.length === 0 && (
                  <p className="text-sm text-muted-foreground">В бригаде пока никого нет</p>
                )}

                {availableUsers.length > 0 && (
                  <select
                    className="mt-2 h-9 rounded-md border bg-transparent px-2 text-sm"
                    value=""
                    onChange={(e) => addMember(t.id, e.target.value)}
                  >
                    <option value="">+ Добавить сотрудника...</option>
                    {availableUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                )}
              </CardContent>
            </Card>
          );
        })}
        {!loading && teams.length === 0 && (
          <p className="text-sm text-muted-foreground">Бригад пока нет — создайте первую.</p>
        )}
      </div>
    </div>
  );
}
