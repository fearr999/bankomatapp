import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const analyticsRouter = Router();
analyticsRouter.use(authenticate);

const DONE_STATUSES = ["COMPLETED", "CLOSED"];

analyticsRouter.get("/summary", async (_req, res) => {
  const orders = await prisma.workOrder.findMany({
    select: {
      status: true,
      createdAt: true,
      updatedAt: true,
      slaDueAt: true,
      assignedToId: true,
      teamId: true,
      assignedTo: { select: { name: true } },
      team: { select: { name: true } },
    },
  });

  // По статусам
  const byStatus: Record<string, number> = {};
  for (const o of orders) byStatus[o.status] = (byStatus[o.status] ?? 0) + 1;

  const done = orders.filter((o) => DONE_STATUSES.includes(o.status));

  // SLA: доля завершённых до дедлайна (из тех, у кого дедлайн был задан)
  const withSla = done.filter((o) => o.slaDueAt);
  const onTime = withSla.filter((o) => o.updatedAt <= o.slaDueAt!);
  const slaCompliance = withSla.length > 0 ? onTime.length / withSla.length : null;

  // Среднее время выполнения (часы) от создания до завершения
  const avgCompletionHours =
    done.length > 0
      ? done.reduce((sum, o) => sum + (o.updatedAt.getTime() - o.createdAt.getTime()), 0) /
        done.length /
        (1000 * 60 * 60)
      : null;

  // По сотрудникам
  const byEmployee = new Map<string, { name: string; total: number; completed: number }>();
  for (const o of orders) {
    if (!o.assignedToId || !o.assignedTo) continue;
    const entry = byEmployee.get(o.assignedToId) ?? { name: o.assignedTo.name, total: 0, completed: 0 };
    entry.total++;
    if (DONE_STATUSES.includes(o.status)) entry.completed++;
    byEmployee.set(o.assignedToId, entry);
  }

  // По бригадам
  const byTeam = new Map<string, { name: string; total: number; completed: number }>();
  for (const o of orders) {
    if (!o.teamId || !o.team) continue;
    const entry = byTeam.get(o.teamId) ?? { name: o.team.name, total: 0, completed: 0 };
    entry.total++;
    if (DONE_STATUSES.includes(o.status)) entry.completed++;
    byTeam.set(o.teamId, entry);
  }

  // Заявки по дням (последние 14 дней) — для простого графика
  const days: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(day.getDate() - i);
    const key = day.toISOString().slice(0, 10);
    const count = orders.filter((o) => o.createdAt.toISOString().slice(0, 10) === key).length;
    days.push({ date: key, count });
  }

  res.json({
    total: orders.length,
    byStatus,
    slaCompliance,
    avgCompletionHours,
    byEmployee: Array.from(byEmployee.values()).sort((a, b) => b.total - a.total),
    byTeam: Array.from(byTeam.values()).sort((a, b) => b.total - a.total),
    ordersOverTime: days,
  });
});
