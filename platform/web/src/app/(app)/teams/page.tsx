"use client";

import { useEffect, useState } from "react";
import { Plus, X, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

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
  const { t } = useLocale();
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");

  async function load() {
    try {
      const [loadedTeams, loadedUsers] = await Promise.all([
        apiFetch<TeamRow[]>("/teams"),
        apiFetch<UserRow[]>("/users"),
      ]);
      setTeams(loadedTeams);
      setUsers(loadedUsers);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.teams.loadError);
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
        <h1 className="text-2xl font-semibold tracking-tight">{t.teams.title}</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> {t.teams.newTeam}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={createTeam} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.teams.teamName}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <Button type="submit">{t.teams.create}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading && <PageLoader />}
      {!loading && teams.length === 0 && (
        <EmptyState icon={UsersRound} title={t.teams.empty} description={t.teams.emptyDescription} />
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {!loading && teams.map((team) => {
          const availableUsers = users.filter((u) => u.teamId !== team.id);
          return (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">{team.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {team.activeOrders} {t.teams.activeOfTotal} {team.totalOrders} {t.teams.total}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.teams.leader}: {team.leader?.name ?? t.teams.noLeader}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {team.members.map((m) => (
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
                      onClick={() => removeMember(team.id, m.id)}
                      className="text-muted-foreground transition-colors hover:text-red-500"
                      title={t.teams.removeFromTeam}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {team.members.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t.teams.noMembers}</p>
                )}

                {availableUsers.length > 0 && (
                  <select
                    className="mt-2 h-9 rounded-md border bg-transparent px-2 text-sm"
                    value=""
                    onChange={(e) => addMember(team.id, e.target.value)}
                  >
                    <option value="">{t.teams.addMember}</option>
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
      </div>
    </div>
  );
}
