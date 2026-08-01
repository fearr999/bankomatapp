import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor } from "../../middleware/authenticate.js";

export const projectsRouter = Router();
projectsRouter.use(authenticate);
// Внутренний трекер задач команды — не входит в кабинет подрядчика.
projectsRouter.use(blockContractor);

const ISSUE_TYPES = ["EPIC", "STORY", "TASK", "BUG", "SUBTASK"] as const;
const ISSUE_STATUSES = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"] as const;
const ISSUE_PRIORITIES = ["LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST"] as const;

const issueSummarySelect = {
  id: true,
  number: true,
  type: true,
  title: true,
  status: true,
  priority: true,
  labels: true,
  storyPoints: true,
  dueDate: true,
  epicId: true,
  parentId: true,
  sprintId: true,
  assignee: { select: { id: true, name: true } },
  createdAt: true,
  updatedAt: true,
} as const;

projectsRouter.get("/", async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { organizationId: req.auth!.organizationId },
    include: { _count: { select: { issues: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(projects);
});

const createProjectSchema = z.object({
  name: z.string().min(1),
  key: z
    .string()
    .min(1)
    .max(10)
    .regex(/^[A-Za-zА-Яа-яЁё0-9]+$/, "Только буквы и цифры"),
  description: z.string().optional(),
});

projectsRouter.post("/", async (req, res) => {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const key = parsed.data.key.toUpperCase();

  const existing = await prisma.project.findFirst({
    where: { organizationId: req.auth!.organizationId, key },
  });
  if (existing) return res.status(409).json({ error: "Проект с таким ключом уже есть" });

  const project = await prisma.project.create({
    data: { name: parsed.data.name, key, description: parsed.data.description, organizationId: req.auth!.organizationId },
  });
  res.status(201).json(project);
});

projectsRouter.get("/:id", async (req, res) => {
  const project = await prisma.project.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
    include: { _count: { select: { issues: true, sprints: true } } },
  });
  if (!project) return res.status(404).json({ error: "Проект не найден" });
  res.json(project);
});

// --- Issues внутри проекта -------------------------------------------------

projectsRouter.get("/:id/issues", async (req, res) => {
  const project = await prisma.project.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!project) return res.status(404).json({ error: "Проект не найден" });

  const { status, type, priority, label, assigneeId, sprintId, epicId, search, backlogOnly } = req.query as Record<
    string,
    string | undefined
  >;

  const issues = await prisma.issue.findMany({
    where: {
      projectId: project.id,
      status: status ? (status as (typeof ISSUE_STATUSES)[number]) : undefined,
      type: type ? (type as (typeof ISSUE_TYPES)[number]) : undefined,
      priority: priority ? (priority as (typeof ISSUE_PRIORITIES)[number]) : undefined,
      labels: label ? { has: label } : undefined,
      assigneeId: assigneeId || undefined,
      epicId: epicId || undefined,
      parentId: null, // подзадачи не показываются на доске/бэклоге отдельно — только внутри родителя
      sprintId: backlogOnly === "true" ? null : sprintId || undefined,
      title: search ? { contains: search, mode: "insensitive" } : undefined,
    },
    select: issueSummarySelect,
    orderBy: { createdAt: "asc" },
  });
  res.json(issues);
});

const createIssueSchema = z.object({
  type: z.enum(ISSUE_TYPES).optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(ISSUE_PRIORITIES).optional(),
  labels: z.array(z.string()).optional(),
  storyPoints: z.number().int().positive().optional(),
  dueDate: z.string().datetime().optional(),
  assigneeId: z.string().optional(),
  epicId: z.string().optional(),
  parentId: z.string().optional(),
  sprintId: z.string().optional(),
});

projectsRouter.post("/:id/issues", async (req, res) => {
  const parsed = createIssueSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const project = await prisma.project.findFirst({ where: { id: req.params.id, organizationId } });
  if (!project) return res.status(404).json({ error: "Проект не найден" });

  if (parsed.data.assigneeId) {
    const assignee = await prisma.user.findFirst({ where: { id: parsed.data.assigneeId, organizationId } });
    if (!assignee) return res.status(400).json({ error: "Исполнитель не найден" });
  }
  if (parsed.data.epicId) {
    const epic = await prisma.issue.findFirst({ where: { id: parsed.data.epicId, projectId: project.id, type: "EPIC" } });
    if (!epic) return res.status(400).json({ error: "Эпик не найден" });
  }
  if (parsed.data.parentId) {
    const parent = await prisma.issue.findFirst({ where: { id: parsed.data.parentId, projectId: project.id } });
    if (!parent) return res.status(400).json({ error: "Родительская задача не найдена" });
  }

  const last = await prisma.issue.findFirst({ where: { projectId: project.id }, orderBy: { number: "desc" } });
  const number = (last?.number ?? 0) + 1;

  const issue = await prisma.issue.create({
    data: {
      projectId: project.id,
      number,
      type: parsed.data.parentId ? "SUBTASK" : parsed.data.type,
      title: parsed.data.title,
      description: parsed.data.description,
      priority: parsed.data.priority,
      labels: parsed.data.labels ?? [],
      storyPoints: parsed.data.storyPoints,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
      assigneeId: parsed.data.assigneeId,
      epicId: parsed.data.epicId,
      parentId: parsed.data.parentId,
      sprintId: parsed.data.sprintId,
      reporterId: req.auth!.userId,
      organizationId,
      events: { create: { type: "created", message: "Задача создана", userId: req.auth!.userId } },
    },
  });
  res.status(201).json(issue);
});

// --- Sprints внутри проекта --------------------------------------------------

projectsRouter.get("/:id/sprints", async (req, res) => {
  const project = await prisma.project.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!project) return res.status(404).json({ error: "Проект не найден" });

  const sprints = await prisma.sprint.findMany({
    where: { projectId: project.id },
    include: { _count: { select: { issues: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(sprints);
});

const createSprintSchema = z.object({
  name: z.string().min(1),
  goal: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

projectsRouter.post("/:id/sprints", async (req, res) => {
  const parsed = createSprintSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const project = await prisma.project.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!project) return res.status(404).json({ error: "Проект не найден" });

  const sprint = await prisma.sprint.create({
    data: {
      projectId: project.id,
      name: parsed.data.name,
      goal: parsed.data.goal,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    },
  });
  res.status(201).json(sprint);
});
