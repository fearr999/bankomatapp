import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor, requireRole } from "../../middleware/authenticate.js";
import { nextOrderNumber } from "../workorders/workorders.routes.js";
import { workOrderMessages } from "../../lib/i18n-messages.js";

export const cleaningCyclesRouter = Router();
cleaningCyclesRouter.use(authenticate);
cleaningCyclesRouter.use(blockContractor);

const DONE_ORDER_STATUSES = ["COMPLETED", "CLOSED"] as const;

function withProgress<T extends { workOrders: { status: string }[] }>(cycle: T) {
  const total = cycle.workOrders.length;
  const done = cycle.workOrders.filter((o) => DONE_ORDER_STATUSES.includes(o.status as (typeof DONE_ORDER_STATUSES)[number])).length;
  return { ...cycle, progress: { total, done } };
}

cleaningCyclesRouter.get("/", async (req, res) => {
  const teamId = req.query.teamId as string | undefined;
  const cycles = await prisma.cleaningCycle.findMany({
    where: { organizationId: req.auth!.organizationId, ...(teamId ? { teamId } : {}) },
    include: {
      team: { select: { id: true, name: true } },
      workOrders: { select: { status: true } },
    },
    orderBy: [{ teamId: "asc" }, { number: "desc" }],
  });
  res.json(cycles.map(withProgress));
});

cleaningCyclesRouter.get("/:id", async (req, res) => {
  const cycle = await prisma.cleaningCycle.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
    include: {
      team: { select: { id: true, name: true } },
      workOrders: {
        select: {
          id: true,
          status: true,
          equipment: { select: { id: true, name: true, deviceType: true, serialNumber: true } },
          site: { select: { id: true, name: true, address: true } },
          updatedAt: true,
        },
        orderBy: { equipment: { serialNumber: "asc" } },
      },
    },
  });
  if (!cycle) return res.status(404).json({ error: "Цикл не найден" });
  res.json(withProgress(cycle));
});

const startCycleSchema = z.object({ teamId: z.string().min(1) });

cleaningCyclesRouter.post("/", requireRole("ADMIN", "DISPATCHER", "MANAGER"), async (req, res) => {
  const parsed = startCycleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const team = await prisma.team.findFirst({ where: { id: parsed.data.teamId, organizationId } });
  if (!team) return res.status(404).json({ error: "Бригада не найдена" });

  const activeCycle = await prisma.cleaningCycle.findFirst({
    where: { teamId: team.id, status: "ACTIVE" },
  });
  if (activeCycle) {
    return res.status(409).json({ error: "У бригады уже есть активный цикл", cycleId: activeCycle.id });
  }

  const sites = await prisma.site.findMany({
    where: { organizationId, teamId: team.id },
    include: { equipment: { where: { deviceType: { in: ["atm", "cardomat"] } } } },
  });
  const devices = sites.flatMap((s) => s.equipment.map((eq) => ({ equipment: eq, site: s })));
  if (devices.length === 0) {
    return res.status(400).json({ error: "У бригады нет ни одной точки с банкоматом/картоматом" });
  }

  const lastCycle = await prisma.cleaningCycle.findFirst({
    where: { teamId: team.id },
    orderBy: { number: "desc" },
    select: { number: true },
  });
  const number = (lastCycle?.number ?? 0) + 1;

  const cycle = await prisma.cleaningCycle.create({
    data: { number, teamId: team.id, organizationId, status: "ACTIVE" },
  });

  for (const { equipment, site } of devices) {
    const orderNumber = await nextOrderNumber(organizationId);
    await prisma.workOrder.create({
      data: {
        number: orderNumber,
        title: `Уборка: ${equipment.name}`,
        description: `Цикл уборки №${number}, бригада «${team.name}»`,
        requestType: "CLEANING",
        equipmentId: equipment.id,
        siteId: site.id,
        teamId: team.id,
        cleaningCycleId: cycle.id,
        createdById: req.auth!.userId,
        organizationId,
        events: {
          create: {
            type: "created",
            message: workOrderMessages.createdAutoCleaning(number).ru,
            messageUz: workOrderMessages.createdAutoCleaning(number).uz,
            userId: req.auth!.userId,
          },
        },
      },
    });
  }

  const full = await prisma.cleaningCycle.findUnique({
    where: { id: cycle.id },
    include: { team: { select: { id: true, name: true } }, workOrders: { select: { status: true } } },
  });
  res.status(201).json(withProgress(full!));
});

cleaningCyclesRouter.post("/:id/close", requireRole("ADMIN", "DISPATCHER", "MANAGER"), async (req, res) => {
  const cycle = await prisma.cleaningCycle.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!cycle) return res.status(404).json({ error: "Цикл не найден" });
  if (cycle.status !== "ACTIVE") return res.status(409).json({ error: "Цикл уже закрыт" });

  const updated = await prisma.cleaningCycle.update({
    where: { id: cycle.id },
    data: { status: "CLOSED_EARLY", closedAt: new Date() },
  });
  res.json(updated);
});

