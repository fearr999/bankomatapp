import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const clientsRouter = Router();
clientsRouter.use(authenticate);

clientsRouter.get("/", async (_req, res) => {
  const clients = await prisma.client.findMany({
    include: { sites: { select: { id: true } }, workOrders: { select: { id: true } } },
    orderBy: { name: "asc" },
  });
  res.json(
    clients.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      sitesCount: c.sites.length,
      workOrdersCount: c.workOrders.length,
    }))
  );
});

const createSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

clientsRouter.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const client = await prisma.client.create({
    data: { ...parsed.data, email: parsed.data.email || undefined },
  });
  res.status(201).json(client);
});

clientsRouter.get("/:id", async (req, res) => {
  const client = await prisma.client.findUnique({
    where: { id: req.params.id },
    include: {
      sites: { include: { equipment: { select: { id: true, name: true, status: true } } } },
      workOrders: {
        select: { id: true, number: true, title: true, status: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      },
      contracts: { orderBy: { createdAt: "desc" } },
      interactions: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true } } },
      },
    },
  });
  if (!client) return res.status(404).json({ error: "Клиент не найден" });
  res.json(client);
});

const contractSchema = z.object({
  number: z.string().min(1),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
});

clientsRouter.post("/:id/contracts", async (req, res) => {
  const parsed = contractSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const contract = await prisma.contract.create({
    data: {
      clientId: req.params.id,
      number: parsed.data.number,
      notes: parsed.data.notes,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    },
  });
  res.status(201).json(contract);
});

const interactionSchema = z.object({
  type: z.enum(["call", "meeting", "email", "note"]),
  message: z.string().min(1),
});

clientsRouter.post("/:id/interactions", async (req, res) => {
  const parsed = interactionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const interaction = await prisma.interaction.create({
    data: { clientId: req.params.id, ...parsed.data, userId: req.auth!.userId },
  });
  res.status(201).json(interaction);
});
