import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor, requireRole } from "../../middleware/authenticate.js";

export const organizationsRouter = Router();
organizationsRouter.use(authenticate);
// Управление подрядными организациями — зона ответственности банка-тенанта,
// сами подрядчики своих карточек здесь не видят.
organizationsRouter.use(blockContractor);

const TERMINAL_STATUSES = ["COMPLETED", "CLOSED", "CANCELLED"];
const DONE_STATUSES = ["COMPLETED", "CLOSED"];

const ORG_TYPES = [
  "BANK",
  "CONTRACTOR",
  "CLEANING",
  "SERVICE",
  "CASH_COLLECTION",
  "LOGISTICS",
  "SECURITY",
  "OTHER",
] as const;

async function computeOrgStats(organizationId: string) {
  const [staffCount, teamCount, orders, ratingAgg] = await Promise.all([
    prisma.user.count({ where: { contractorOrganizationId: organizationId } }),
    prisma.team.count({ where: { contractorOrganizationId: organizationId } }),
    prisma.workOrder.findMany({
      where: { assignedOrganizationId: organizationId },
      select: { status: true, createdAt: true, updatedAt: true, slaDueAt: true },
    }),
    prisma.user.aggregate({
      where: { contractorOrganizationId: organizationId, rating: { not: null } },
      _avg: { rating: true },
    }),
  ]);

  const completed = orders.filter((o) => DONE_STATUSES.includes(o.status));
  const active = orders.filter((o) => !TERMINAL_STATUSES.includes(o.status)).length;
  const cancelled = orders.filter((o) => o.status === "CANCELLED").length;

  const avgCompletionHours = completed.length
    ? Math.round(
        (completed.reduce((sum, o) => sum + (o.updatedAt.getTime() - o.createdAt.getTime()), 0) /
          completed.length /
          3_600_000) *
          10
      ) / 10
    : null;

  const withSla = completed.filter((o) => o.slaDueAt);
  const metSla = withSla.filter((o) => o.slaDueAt && o.updatedAt <= o.slaDueAt).length;
  const slaPercent = withSla.length ? Math.round((metSla / withSla.length) * 100) : null;

  return {
    staffCount,
    teamCount,
    totalOrders: orders.length,
    activeOrders: active,
    completedOrders: completed.length,
    cancelledOrders: cancelled,
    avgCompletionHours,
    slaPercent,
    avgRating: ratingAgg._avg.rating ? Math.round(ratingAgg._avg.rating * 10) / 10 : null,
  };
}

organizationsRouter.get("/", async (req, res) => {
  const orgs = await prisma.organization.findMany({
    where: { parentOrganizationId: req.auth!.organizationId },
    orderBy: { name: "asc" },
  });
  const withStats = await Promise.all(
    orgs.map(async (org) => ({ ...org, stats: await computeOrgStats(org.id) }))
  );
  res.json(withStats);
});

const createSchema = z.object({
  name: z.string().min(1),
  type: z.enum(ORG_TYPES).optional(),
  inn: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  serviceRegion: z.string().optional(),
  contractNumber: z.string().optional(),
  contractStartAt: z.string().datetime().optional(),
  contractEndAt: z.string().datetime().optional(),
});

organizationsRouter.post("/", requireRole("ADMIN"), async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { contractStartAt, contractEndAt, contactEmail, ...rest } = parsed.data;

  const org = await prisma.organization.create({
    data: {
      ...rest,
      contactEmail: contactEmail || undefined,
      contractStartAt: contractStartAt ? new Date(contractStartAt) : undefined,
      contractEndAt: contractEndAt ? new Date(contractEndAt) : undefined,
      parentOrganizationId: req.auth!.organizationId,
    },
  });
  res.status(201).json(org);
});

organizationsRouter.get("/:id", async (req, res) => {
  const org = await prisma.organization.findFirst({
    where: { id: req.params.id, parentOrganizationId: req.auth!.organizationId },
  });
  if (!org) return res.status(404).json({ error: "Организация не найдена" });

  const [stats, staff, teams] = await Promise.all([
    computeOrgStats(org.id),
    prisma.user.findMany({
      where: { contractorOrganizationId: org.id },
      select: { id: true, name: true, role: true, executorType: true, status: true, rating: true },
      orderBy: { name: "asc" },
    }),
    prisma.team.findMany({
      where: { contractorOrganizationId: org.id },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  res.json({ ...org, stats, staff, teams });
});

const updateSchema = createSchema.partial().extend({ status: z.enum(["active", "inactive"]).optional() });

organizationsRouter.patch("/:id", requireRole("ADMIN"), async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const existing = await prisma.organization.findFirst({
    where: { id: req.params.id, parentOrganizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Организация не найдена" });

  const { contractStartAt, contractEndAt, contactEmail, ...rest } = parsed.data;
  const org = await prisma.organization.update({
    where: { id: req.params.id },
    data: {
      ...rest,
      contactEmail: contactEmail || undefined,
      contractStartAt: contractStartAt ? new Date(contractStartAt) : undefined,
      contractEndAt: contractEndAt ? new Date(contractEndAt) : undefined,
    },
  });
  res.json(org);
});

/// Сводная KPI-таблица по всем подрядным организациям банка — для аналитики
/// и сравнения подрядчиков между собой.
organizationsRouter.get("/kpi/summary", async (req, res) => {
  const orgs = await prisma.organization.findMany({
    where: { parentOrganizationId: req.auth!.organizationId },
    orderBy: { name: "asc" },
  });
  const rows = await Promise.all(
    orgs.map(async (org) => ({
      id: org.id,
      name: org.name,
      type: org.type,
      ...(await computeOrgStats(org.id)),
    }))
  );
  res.json(rows);
});
