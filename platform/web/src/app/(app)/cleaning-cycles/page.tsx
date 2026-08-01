"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

interface TeamApi {
  id: string;
  name: string;
}

interface CycleApi {
  id: string;
  number: number;
  teamId: string;
  team: { id: string; name: string };
  status: "ACTIVE" | "COMPLETED" | "CLOSED_EARLY";
  startedAt: string;
  closedAt: string | null;
  progress: { total: number; done: number };
}

const STATUS_LABELS: Record<CycleApi["status"], string> = {
  ACTIVE: "Активен",
  COMPLETED: "Завершён",
  CLOSED_EARLY: "Закрыт досрочно",
};

const STATUS_STYLES: Record<CycleApi["status"], string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600",
  COMPLETED: "bg-blue-500/10 text-blue-600",
  CLOSED_EARLY: "bg-amber-500/10 text-amber-600",
};

export default function CleaningCyclesPage() {
  const [teams, setTeams] = useState<TeamApi[]>([]);
  const [cycles, setCycles] = useState<CycleApi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyTeamId, setBusyTeamId] = useState<string | null>(null);

  function load() {
    Promise.all([apiFetch<TeamApi[]>("/teams"), apiFetch<CycleApi[]>("/cleaning-cycles")])
      .then(([t, c]) => {
        setTeams(t);
        setCycles(c);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"));
  }

  useEffect(load, []);

  function activeCycleFor(teamId: string) {
    return cycles.find((c) => c.teamId === teamId && c.status === "ACTIVE") ?? null;
  }

  function lastCycleFor(teamId: string) {
    return cycles.filter((c) => c.teamId === teamId).sort((a, b) => b.number - a.number)[0] ?? null;
  }

  async function startCycle(teamId: string) {
    setBusyTeamId(teamId);
    setError(null);
    try {
      await apiFetch("/cleaning-cycles", { method: "POST", body: JSON.stringify({ teamId }) });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось начать цикл");
    } finally {
      setBusyTeamId(null);
    }
  }

  async function closeCycle(cycleId: string, teamId: string) {
    setBusyTeamId(teamId);
    setError(null);
    try {
      await apiFetch(`/cleaning-cycles/${cycleId}/close`, { method: "POST" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось закрыть цикл");
    } finally {
      setBusyTeamId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Циклы уборки</h1>
        <p className="text-sm text-muted-foreground">
          Старт цикла создаёт заявку на уборку по каждому банкомату/картомату территории бригады.
          Цикл завершается сам, когда закрыты все заявки, либо закройте его досрочно вручную.
        </p>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const active = activeCycleFor(team.id);
          const last = lastCycleFor(team.id);
          const shown = active ?? last;
          const pct = shown && shown.progress.total > 0 ? Math.round((shown.progress.done / shown.progress.total) * 100) : 0;
          const busy = busyTeamId === team.id;

          return (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-foreground">{team.name}</CardTitle>
                  {shown && (
                    <span className={`rounded px-2 py-0.5 text-xs ${STATUS_STYLES[shown.status]}`}>
                      {STATUS_LABELS[shown.status]}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {shown ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Цикл №{shown.number} · начат {new Date(shown.startedAt).toLocaleString("ru-RU")}
                    </p>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {shown.progress.done}/{shown.progress.total} · {pct}%
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Циклов ещё не было</p>
                )}

                <div className="flex gap-2">
                  <Link href={`/cleaning-cycles/${shown?.id ?? ""}`} className={shown ? "flex-1" : "hidden"}>
                    <Button variant="outline" size="sm" className="w-full">
                      Открыть точки
                    </Button>
                  </Link>
                  {active ? (
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => closeCycle(active.id, team.id)}>
                      <Square size={14} /> Закрыть
                    </Button>
                  ) : (
                    <Button size="sm" disabled={busy} onClick={() => startCycle(team.id)}>
                      <Play size={14} /> Начать цикл
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {teams.length === 0 && <p className="text-sm text-muted-foreground">Бригад пока нет.</p>}
      </div>
    </div>
  );
}
