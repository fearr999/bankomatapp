import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const checklistsRouter = Router();
checklistsRouter.use(authenticate);

const fieldSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["checkbox", "text", "number"]),
  required: z.boolean().default(false),
});

checklistsRouter.get("/templates", async (_req, res) => {
  const templates = await prisma.checklistTemplate.findMany({ orderBy: { name: "asc" } });
  res.json(templates);
});

const createTemplateSchema = z.object({
  name: z.string().min(1),
  fields: z.array(fieldSchema).min(1),
});

checklistsRouter.post("/templates", async (req, res) => {
  const parsed = createTemplateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const template = await prisma.checklistTemplate.create({ data: parsed.data });
  res.status(201).json(template);
});

checklistsRouter.patch("/templates/:id", async (req, res) => {
  const parsed = createTemplateSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const template = await prisma.checklistTemplate.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json(template);
});

checklistsRouter.delete("/templates/:id", async (req, res) => {
  await prisma.checklistTemplate.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

const submitSchema = z.object({
  templateId: z.string(),
  answers: z.record(z.any()),
  score: z.number().optional(),
});

checklistsRouter.post("/work-orders/:id/submissions", async (req, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const submission = await prisma.checklistSubmission.create({
    data: {
      workOrderId: req.params.id,
      templateId: parsed.data.templateId,
      answers: parsed.data.answers,
      score: parsed.data.score,
      submittedById: req.auth!.userId,
    },
    include: { template: true },
  });

  await prisma.workOrderEvent.create({
    data: {
      workOrderId: req.params.id,
      userId: req.auth!.userId,
      type: "checklist",
      message: `Заполнен чек-лист «${submission.template.name}»`,
    },
  });

  res.status(201).json(submission);
});

checklistsRouter.get("/work-orders/:id/submissions", async (req, res) => {
  const submissions = await prisma.checklistSubmission.findMany({
    where: { workOrderId: req.params.id },
    include: { template: true, submittedBy: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(submissions);
});
