import type { WorkOrderStatus } from "@prisma/client";
import { prisma } from "./prisma.js";

export const DONE_STATUSES: WorkOrderStatus[] = ["COMPLETED", "CLOSED"];

export interface CleaningSummaryRow {
  equipmentId: string;
  name: string;
  deviceType: string;
  siteName: string | null;
  count: number;
  dates: string[];
}

/// Сводка по уборке банкоматов/картоматов за период — для месячной сверки
/// с клиентом. Включает ВСЕ ATM/cardomat организации (даже с нулём уборок за
/// период — это как раз то, что банку нужно видеть при сверке), а не только
/// те, что засветились в завершённых заявках.
export async function getCleaningSummary(
  organizationId: string,
  from: Date,
  to: Date
): Promise<CleaningSummaryRow[]> {
  const equipment = await prisma.equipment.findMany({
    where: { organizationId, deviceType: { in: ["atm", "cardomat"] } },
    select: { id: true, name: true, deviceType: true, site: { select: { name: true } } },
    orderBy: { name: "asc" },
  });

  const orders = await prisma.workOrder.findMany({
    where: {
      organizationId,
      requestType: "CLEANING",
      status: { in: DONE_STATUSES },
      equipmentId: { not: null },
      updatedAt: { gte: from, lte: to },
    },
    select: { equipmentId: true, updatedAt: true },
  });

  const byEquipment = new Map<string, Date[]>();
  for (const o of orders) {
    if (!o.equipmentId) continue;
    const list = byEquipment.get(o.equipmentId) ?? [];
    list.push(o.updatedAt);
    byEquipment.set(o.equipmentId, list);
  }

  return equipment.map((eq) => {
    const dates = (byEquipment.get(eq.id) ?? []).sort((a, b) => a.getTime() - b.getTime());
    return {
      equipmentId: eq.id,
      name: eq.name,
      deviceType: eq.deviceType,
      siteName: eq.site?.name ?? null,
      count: dates.length,
      dates: dates.map((d) => d.toISOString().slice(0, 10)),
    };
  });
}
