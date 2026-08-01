import { prisma } from "./prisma.js";
import { notifyUser } from "../modules/notifications/notify.js";
import { nextOrderNumber } from "../modules/workorders/workorders.routes.js";

const TERMINAL_STATUSES = ["COMPLETED", "CLOSED", "CANCELLED"] as const;

/// Раз в цикл проверяет заявки с истёкшим slaDueAt, которым ещё не отправляли
/// эскалацию — отмечает slaEscalatedAt и шлёт уведомление диспетчерам/админам
/// банка-тенанта (не подрядчику — эскалация SLA это зона ответственности банка).
export async function checkSlaEscalations() {
  const overdue = await prisma.workOrder.findMany({
    where: {
      slaDueAt: { lt: new Date() },
      slaEscalatedAt: null,
      status: { notIn: [...TERMINAL_STATUSES] },
    },
    select: { id: true, number: true, title: true, organizationId: true },
  });

  for (const order of overdue) {
    await prisma.workOrder.update({ where: { id: order.id }, data: { slaEscalatedAt: new Date() } });
    await prisma.workOrderEvent.create({
      data: { workOrderId: order.id, type: "sla_escalation", message: "SLA просрочен — эскалация" },
    });
    const responders = await prisma.user.findMany({
      where: { organizationId: order.organizationId, role: { in: ["ADMIN", "DISPATCHER"] } },
      select: { id: true },
    });
    await Promise.all(
      responders.map((u) =>
        notifyUser(
          u.id,
          "sla_escalation",
          "Просрочен SLA",
          `Заявка ${order.number} «${order.title}» просрочена по SLA — требуется внимание`
        )
      )
    );
  }
  return overdue.length;
}

/// Плановое обслуживание: у оборудования с заданным maintenanceIntervalDays,
/// когда наступает nextServiceAt, автоматически создаётся заявка MAINTENANCE
/// и nextServiceAt сдвигается на следующий интервал.
export async function checkRecurringMaintenance() {
  const due = await prisma.equipment.findMany({
    where: { maintenanceIntervalDays: { not: null }, nextServiceAt: { lte: new Date() } },
    select: { id: true, name: true, siteId: true, organizationId: true, maintenanceIntervalDays: true, nextServiceAt: true },
  });

  let created = 0;
  for (const eq of due) {
    const admin = await prisma.user.findFirst({
      where: { organizationId: eq.organizationId, role: "ADMIN" },
      select: { id: true },
    });
    if (!admin) continue; // без создателя завести заявку нельзя — организация без администратора

    const number = await nextOrderNumber(eq.organizationId);
    await prisma.workOrder.create({
      data: {
        number,
        title: `Плановое ТО: ${eq.name}`,
        description: "Заявка создана автоматически по графику планового обслуживания",
        requestType: "MAINTENANCE",
        equipmentId: eq.id,
        siteId: eq.siteId,
        createdById: admin.id,
        organizationId: eq.organizationId,
        events: {
          create: { type: "created", message: "Заявка создана автоматически (плановое ТО)" },
        },
      },
    });

    const intervalMs = eq.maintenanceIntervalDays! * 24 * 60 * 60 * 1000;
    const base = eq.nextServiceAt && eq.nextServiceAt.getTime() > Date.now() - intervalMs ? eq.nextServiceAt : new Date();
    await prisma.equipment.update({
      where: { id: eq.id },
      data: { lastServiceAt: new Date(), nextServiceAt: new Date(base.getTime() + intervalMs) },
    });
    created++;
  }
  return created;
}

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function startBackgroundJobs() {
  const run = () => {
    checkSlaEscalations().catch((err) => console.error("Ошибка проверки SLA-эскалаций:", err));
    checkRecurringMaintenance().catch((err) => console.error("Ошибка проверки планового ТО:", err));
  };
  setTimeout(run, 15_000);
  setInterval(run, CHECK_INTERVAL_MS);
}
