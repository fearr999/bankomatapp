"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Администратор",
  DISPATCHER: "Диспетчер",
  MANAGER: "Руководитель бригады",
  WORKER: "Полевой сотрудник",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<EmployeeRow[]>("/users")
      .then(setEmployees)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Сотрудники</h1>
      {error && <p className="text-sm text-red-500">{error}</p>}

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
    </div>
  );
}
