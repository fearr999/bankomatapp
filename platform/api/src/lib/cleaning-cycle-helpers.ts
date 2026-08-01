import { prisma } from "./prisma.js";

const ACTIVE_ORDER_STATUSES = [
  "NEW",
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "WAITING_MATERIALS",
  "WAITING_APPROVAL",
] as const;

/// Проверяет, завершены ли все заявки активного цикла (ни одной ещё
/// открытой — COMPLETED/CLOSED/CANCELLED считаются решёнными) — если да,
/// цикл авто-завершается. Дёргается сразу при закрытии заявки цикла
/// (workorders.routes.ts) и подстраховывается фоновой задачей
/// (background-jobs.ts) на случай пропущенного вызова.
export async function checkAndAutoCompleteCycle(cleaningCycleId: string) {
  const cycle = await prisma.cleaningCycle.findUnique({
    where: { id: cleaningCycleId },
    include: { workOrders: { select: { status: true } } },
  });
  if (!cycle || cycle.status !== "ACTIVE") return;
  const hasOpen = cycle.workOrders.some((o) =>
    ACTIVE_ORDER_STATUSES.includes(o.status as (typeof ACTIVE_ORDER_STATUSES)[number])
  );
  if (hasOpen) return;
  await prisma.cleaningCycle.update({
    where: { id: cycle.id },
    data: { status: "COMPLETED", closedAt: new Date() },
  });
}

/// Фоновая подстраховка: проверяет все активные циклы (на случай, если
/// прямой вызов после закрытия заявки почему-то не сработал).
export async function checkAllActiveCleaningCycles() {
  const active = await prisma.cleaningCycle.findMany({ where: { status: "ACTIVE" }, select: { id: true } });
  for (const c of active) await checkAndAutoCompleteCycle(c.id);
  return active.length;
}
