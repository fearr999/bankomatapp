import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const teamsRouter = Router();
teamsRouter.use(authenticate);

/// Подрядчик видит только бригады своей организации.
function contractorScope(req: import("express").Request) {
  return req.auth!.contractorOrganizationId ? { contractorOrganizationId: req.auth!.contractorOrganizationId } : {};
}

teamsRouter.get("/", async (req, res) => {
  const teams = await prisma.team.findMany({
    where: { organizationId: req.auth!.organizationId, ...contractorScope(req) },
    include: {
      members: {
        select: { id: true, name: true, status: true, role: true, specialization: true },
      },
      workOrders: {
        select: { id: true, status: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const result = teams.map((t) => {
    const leader = t.members.find((m) => m.id === t.leaderId) ?? null;
    const activeOrders = t.workOrders.filter(
      (o) => !["COMPLETED", "CLOSED", "CANCELLED"].includes(o.status)
    ).length;
    return {
      id: t.id,
      name: t.name,
      leaderId: t.leaderId,
      leader,
      members: t.members,
      activeOrders,
      totalOrders: t.workOrders.length,
    };
  });

  res.json(result);
});

const createSchema = z.object({
  name: z.string().min(1),
  leaderId: z.string().optional(),
  contractorOrganizationId: z.string().optional(),
});

teamsRouter.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const organizationId = req.auth!.organizationId;
  if (parsed.data.leaderId) {
    const leader = await prisma.user.findFirst({ where: { id: parsed.data.leaderId, organizationId } });
    if (!leader) return res.status(400).json({ error: "Сотрудник не найден" });
  }
  if (parsed.data.contractorOrganizationId) {
    const org = await prisma.organization.findFirst({
      where: { id: parsed.data.contractorOrganizationId, parentOrganizationId: organizationId },
    });
    if (!org) return res.status(400).json({ error: "Организация-подрядчик не найдена" });
  }
  const team = await prisma.team.create({ data: { ...parsed.data, organizationId } });
  res.status(201).json(team);
});

const updateSchema = z.object({ name: z.string().min(1).optional(), leaderId: z.string().nullable().optional() });

teamsRouter.patch("/:id", async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const existing = await prisma.team.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId, ...contractorScope(req) },
  });
  if (!existing) return res.status(404).json({ error: "Бригада не найдена" });
  const team = await prisma.team.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(team);
});

const membersSchema = z.object({ userId: z.string(), action: z.enum(["add", "remove"]) });

teamsRouter.post("/:id/members", async (req, res) => {
  const parsed = membersSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const organizationId = req.auth!.organizationId;
  const team = await prisma.team.findFirst({ where: { id: req.params.id, organizationId, ...contractorScope(req) } });
  if (!team) return res.status(404).json({ error: "Бригада не найдена" });
  const user = await prisma.user.findFirst({ where: { id: parsed.data.userId, organizationId, ...contractorScope(req) } });
  if (!user) return res.status(404).json({ error: "Сотрудник не найден" });

  await prisma.user.update({
    where: { id: parsed.data.userId },
    data: { teamId: parsed.data.action === "add" ? req.params.id : null },
  });
  res.json({ ok: true });
});
