import { prisma } from "./prisma.js";

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export interface NearestDevice {
  equipmentId: string;
  name: string;
  deviceType: string;
  serialNumber: string | null;
  siteId: string;
  siteName: string;
  address: string | null;
  lat: number;
  lng: number;
  distanceMeters: number;
}

/** Ближайший банкомат/картомат из точек, закреплённых за бригадой
 * пользователя (Site.teamId), которые ещё не обслуживались сегодня —
 * т.е. по ним нет завершённой заявки (COMPLETED/CLOSED) с сегодняшним
 * обновлением. Без привязки к бригаде (teamId=null) — среди всех точек
 * организации, чтобы бригадир/админ тоже мог им пользоваться. */
export async function findNearestDevice(params: {
  organizationId: string;
  teamId: string | null;
  lat: number;
  lng: number;
  excludeEquipmentId?: string;
}): Promise<NearestDevice | null> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const sites = await prisma.site.findMany({
    where: {
      organizationId: params.organizationId,
      ...(params.teamId ? { teamId: params.teamId } : {}),
      lat: { not: null },
      lng: { not: null },
    },
    select: {
      id: true,
      name: true,
      address: true,
      lat: true,
      lng: true,
      equipment: {
        where: {
          deviceType: { in: ["atm", "cardomat"] },
          ...(params.excludeEquipmentId ? { id: { not: params.excludeEquipmentId } } : {}),
        },
        select: {
          id: true,
          name: true,
          deviceType: true,
          serialNumber: true,
          workOrders: {
            where: { status: { in: ["COMPLETED", "CLOSED"] }, updatedAt: { gte: startOfDay } },
            select: { id: true },
            take: 1,
          },
        },
      },
    },
  });

  let nearest: NearestDevice | null = null;
  let nearestDist = Infinity;
  for (const site of sites) {
    if (site.lat == null || site.lng == null) continue;
    for (const eq of site.equipment) {
      if (eq.workOrders.length > 0) continue; // уже обслужен сегодня
      const d = haversineMeters(params.lat, params.lng, site.lat, site.lng);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = {
          equipmentId: eq.id,
          name: eq.name,
          deviceType: eq.deviceType,
          serialNumber: eq.serialNumber,
          siteId: site.id,
          siteName: site.name,
          address: site.address,
          lat: site.lat,
          lng: site.lng,
          distanceMeters: Math.round(d),
        };
      }
    }
  }
  return nearest;
}
