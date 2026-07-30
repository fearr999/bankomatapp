import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const equipmentRouter = Router();
equipmentRouter.use(authenticate);

equipmentRouter.get("/", async (_req, res) => {
  const equipment = await prisma.equipment.findMany({
    include: { site: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });
  res.json(equipment);
});

equipmentRouter.get("/:id", async (req, res) => {
  const item = await prisma.equipment.findUnique({
    where: { id: req.params.id },
    include: {
      site: { select: { id: true, name: true, address: true } },
      workOrders: {
        select: { id: true, number: true, title: true, status: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      },
    },
  });
  if (!item) return res.status(404).json({ error: "Оборудование не найдено" });
  res.json(item);
});

const dateOrNull = z
  .string()
  .optional()
  .transform((v) => (v ? new Date(v) : undefined));

const equipmentSchema = z.object({
  name: z.string().min(1),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  status: z.enum(["operational", "broken", "maintenance"]).optional(),
  siteId: z.string().optional(),
  warrantyUntil: dateOrNull,
  lastServiceAt: dateOrNull,
  nextServiceAt: dateOrNull,
  notes: z.string().optional(),
});

equipmentRouter.post("/", async (req, res) => {
  const parsed = equipmentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await prisma.equipment.create({ data: parsed.data });
  res.status(201).json(item);
});

equipmentRouter.patch("/:id", async (req, res) => {
  const parsed = equipmentSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await prisma.equipment.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(item);
});
