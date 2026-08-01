"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";

interface EmployeeRow {
  id: string;
  name: string;
  role: string;
  status: string;
  specialization: string | null;
  team?: { id: string; name: string } | null;
  assignedOrders: Array<{ number: string; title: string }>;
}

interface LeaderboardRow {
  id: string;
  name: string;
  rating: number | null;
  team: { id: string; name: string } | null;
  completedOrders: number;
  slaPercent: number | null;
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Администратор",
  DISPATCHER: "Диспетчер",
  MANAGER: "Руководитель бригады",
  WORKER: "Полевой сотрудник",
};

function Leaderboard() {
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<LeaderboardRow[]>("/users/leaderboard")
      .then(setRows)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Сотрудник</th>
              <th className="px-4 py-3 font-medium">Бригада</th>
              <th className="px-4 py-3 font-medium">Выполнено заявок</th>
              <th className="px-4 py-3 font-medium">SLA%</th>
              <th className="px-4 py-3 font-medium">Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.team?.name ?? "—"}</td>
                <td className="px-4 py-3">{r.completedOrders}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.slaPercent != null ? `${r.slaPercent}%` : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.rating != null ? `★ ${r.rating.toFixed(1)}` : "—"}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Пока нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"list" | "leaderboard">("list");

  useEffect(() => {
    apiFetch<EmployeeRow[]>("/users")
      .then(setEmployees)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Сотрудники</h1>
        <div className="flex gap-2">
          {(["list", "leaderboard"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex h-9 items-center gap-1.5 rounded-full px-4 text-sm ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {t === "leaderboard" && <Trophy size={14} />}
              {t === "list" ? "Список" : "Рейтинг"}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {tab === "leaderboard" ? (
        <Leaderboard />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((e) => (
            <Link key={e.id} href={`/employees/${e.id}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{e.name}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        e.status === "online" ? "bg-emerald-500" : "bg-zinc-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{ROLE_LABELS[e.role] ?? e.role}</span>
                  {e.specialization && (
                    <span className="text-xs text-muted-foreground">{e.specialization}</span>
                  )}
                  {e.team && (
                    <span className="w-fit rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {e.team.name}
                    </span>
                  )}
                  {e.assignedOrders[0] && (
                    <span className="text-xs text-muted-foreground">
                      Текущая задача: {e.assignedOrders[0].number}
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
