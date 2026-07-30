import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const warehouseRouter = Router();
warehouseRouter.use(authenticate);

warehouseRouter.get("/items", async (_req, res) => {
  const items = await prisma.inventoryItem.findMany({ orderBy: { name: "asc" } });
  res.json(items);
});

const createItemSchema = z.object({
  name: z.string().min(1),
  sku: z.string().optional(),
  unit: z.string().optional(),
  quantity: z.number().optional(),
  minQuantity: z.number().optional(),
});

warehouseRouter.post("/items", async (req, res) => {
  const parsed = createItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const item = await prisma.inventoryItem.create({ data: parsed.data });
  res.status(201).json(item);
});

warehouseRouter.get("/items/:id/movements", async (req, res) => {
  const movements = await prisma.stockMovement.findMany({
    where: { itemId: req.params.id },
    include: {
      user: { select: { name: true } },
      workOrder: { select: { number: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(movements);
});

const MOVEMENT_TYPES = ["receipt", "issue", "return", "writeoff"] as const;
const movementSchema = z.object({
  type: z.enum(MOVEMENT_TYPES),
  quantity: z.number().positive(),
  workOrderId: z.string().optional(),
  comment: z.string().optional(),
});

// receipt/return увеличивают остаток, issue/writeoff уменьшают
const SIGN: Record<(typeof MOVEMENT_TYPES)[number], 1 | -1> = {
  receipt: 1,
  return: 1,
  issue: -1,
  writeoff: -1,
};

warehouseRouter.post("/items/:id/movements", async (req, res) => {
  const parsed = movementSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const delta = SIGN[parsed.data.type] * parsed.data.quantity;

  try {
    const [movement] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: {
          itemId: req.params.id,
          type: parsed.data.type,
          quantity: parsed.data.quantity,
          workOrderId: parsed.data.workOrderId,
          comment: parsed.data.comment,
          userId: req.auth!.userId,
        },
      }),
      prisma.inventoryItem.update({
        where: { id: req.params.id },
        data: { quantity: { increment: delta } },
      }),
    ]);
    res.status(201).json(movement);
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : "Ошибка операции" });
  }
});
