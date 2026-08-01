import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor, requireRole } from "../../middleware/authenticate.js";

export const sitesRouter = Router();
sitesRouter.use(authenticate);

sitesRouter.get("/", async (req, res) => {
  const contractorOrganizationId = req.auth!.contractorOrganizationId;
  const sites = await prisma.site.findMany({
    where: {
      organizationId: req.auth!.organizationId,
      // Подрядчик видит на карте только объекты, где у него есть назначенные заявки.
      ...(contractorOrganizationId
        ? { workOrders: { some: { assignedOrganizationId: contractorOrganizationId } } }
        : {}),
    },
    include: { client: { select: { id: true, name: true } }, team: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });
  res.json(sites);
});

const createSiteSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  clientId: z.string().optional(),
});

sitesRouter.post("/", blockContractor, async (req, res) => {
  const parsed = createSiteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  if (parsed.data.clientId) {
    const client = await prisma.client.findFirst({ where: { id: parsed.data.clientId, organizationId } });
    if (!client) return res.status(400).json({ error: "Клиент не найден" });
  }

  const site = await prisma.site.create({ data: { ...parsed.data, organizationId } });
  res.status(201).json(site);
});

// -----------------------------------------------------------------------
// "Территории" — постоянная привязка объектов к бригадам, отдельно от
// разового назначения заявок. Доступно только банку (не подрядчику).
// -----------------------------------------------------------------------

const assignTeamSchema = z.object({
  siteIds: z.array(z.string()).min(1),
  teamId: z.string().nullable(),
});

sitesRouter.patch("/assign-team", blockContractor, requireRole("ADMIN", "DISPATCHER", "MANAGER"), async (req, res) => {
  const parsed = assignTeamSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const { siteIds, teamId } = parsed.data;

  if (teamId) {
    const team = await prisma.team.findFirst({ where: { id: teamId, organizationId } });
    if (!team) return res.status(400).json({ error: "Бригада не найдена" });
  }

  const result = await prisma.site.updateMany({
    where: { id: { in: siteIds }, organizationId },
    data: { teamId },
  });
  res.json({ updated: result.count });
});

// Точка внутри полигона (ray casting), кроме широты/долготы дополнительных
// геолиб не требуется — полигон приходит как массив [lat, lng] с карты.
function isPointInPolygon(point: [number, number], polygon: [number, number][]) {
  const [py, px] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [iy, ix] = polygon[i];
    const [jy, jx] = polygon[j];
    const intersects = ix > px !== jx > px && py < ((jy - iy) * (px - ix)) / (jx - ix) + iy;
    if (intersects) inside = !inside;
  }
  return inside;
}

const assignZoneSchema = z.object({
  polygon: z.array(z.tuple([z.number(), z.number()])).min(3),
  teamId: z.string().nullable(),
});

sitesRouter.patch("/assign-zone", blockContractor, requireRole("ADMIN", "DISPATCHER", "MANAGER"), async (req, res) => {
  const parsed = assignZoneSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const { polygon, teamId } = parsed.data;

  if (teamId) {
    const team = await prisma.team.findFirst({ where: { id: teamId, organizationId } });
    if (!team) return res.status(400).json({ error: "Бригада не найдена" });
  }

  const sites = await prisma.site.findMany({
    where: { organizationId, lat: { not: null }, lng: { not: null } },
    select: { id: true, lat: true, lng: true },
  });
  const matchedIds = sites
    .filter((s) => isPointInPolygon([s.lat!, s.lng!], polygon))
    .map((s) => s.id);

  if (!matchedIds.length) return res.json({ updated: 0 });

  const result = await prisma.site.updateMany({
    where: { id: { in: matchedIds }, organizationId },
    data: { teamId },
  });
  res.json({ updated: result.count, siteIds: matchedIds });
});
