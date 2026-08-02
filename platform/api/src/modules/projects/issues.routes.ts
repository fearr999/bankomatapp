import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor } from "../../middleware/authenticate.js";
import { UPLOADS_DIR } from "../attachments/attachments.routes.js";
import { issueMessages } from "../../lib/i18n-messages.js";

export const issuesRouter = Router();
issuesRouter.use(authenticate);
issuesRouter.use(blockContractor);

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const ISSUE_TYPES = ["EPIC", "STORY", "TASK", "BUG", "SUBTASK"] as const;
const ISSUE_STATUSES = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"] as const;
const ISSUE_PRIORITIES = ["LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST"] as const;

issuesRouter.get("/:id", async (req, res) => {
  const issue = await prisma.issue.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
    include: {
      project: { select: { id: true, name: true, key: true } },
      assignee: { select: { id: true, name: true } },
      reporter: { select: { id: true, name: true } },
      epic: { select: { id: true, number: true, title: true } },
      parent: { select: { id: true, number: true, title: true, status: true } },
      subtasks: {
        select: { id: true, number: true, title: true, status: true, assignee: { select: { id: true, name: true } } },
      },
      epicChildren: {
        select: { id: true, number: true, title: true, status: true, type: true },
      },
      sprint: { select: { id: true, name: true, status: true } },
      attachments: { include: { uploadedBy: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
      events: { orderBy: { createdAt: "asc" }, include: { user: { select: { name: true } } } },
    },
  });
  if (!issue) return res.status(404).json({ error: "Задача не найдена" });
  res.json(issue);
});

const updateIssueSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  type: z.enum(ISSUE_TYPES).optional(),
  status: z.enum(ISSUE_STATUSES).optional(),
  priority: z.enum(ISSUE_PRIORITIES).optional(),
  labels: z.array(z.string()).optional(),
  storyPoints: z.number().int().positive().nullable().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  assigneeId: z.string().nullable().optional(),
  epicId: z.string().nullable().optional(),
  sprintId: z.string().nullable().optional(),
});

issuesRouter.patch("/:id", async (req, res) => {
  const parsed = updateIssueSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const organizationId = req.auth!.organizationId;
  const existing = await prisma.issue.findFirst({ where: { id: req.params.id, organizationId } });
  if (!existing) return res.status(404).json({ error: "Задача не найдена" });

  if (parsed.data.assigneeId) {
    const assignee = await prisma.user.findFirst({ where: { id: parsed.data.assigneeId, organizationId } });
    if (!assignee) return res.status(400).json({ error: "Исполнитель не найден" });
  }

  const events: Array<{ type: string; message: string; messageUz: string; userId: string }> = [];
  if (parsed.data.status && parsed.data.status !== existing.status) {
    const statusChangeMessage = issueMessages.statusChanged(existing.status, parsed.data.status);
    events.push({
      type: "status_change",
      message: statusChangeMessage.ru,
      messageUz: statusChangeMessage.uz,
      userId: req.auth!.userId,
    });
  }
  if (parsed.data.assigneeId !== undefined && parsed.data.assigneeId !== existing.assigneeId) {
    const assignmentMessage = issueMessages.assignmentChanged();
    events.push({
      type: "assignment",
      message: assignmentMessage.ru,
      messageUz: assignmentMessage.uz,
      userId: req.auth!.userId,
    });
  }

  const { dueDate, ...rest } = parsed.data;
  const issue = await prisma.issue.update({
    where: { id: req.params.id },
    data: {
      ...rest,
      dueDate: dueDate === undefined ? undefined : dueDate ? new Date(dueDate) : null,
      events: events.length ? { create: events } : undefined,
    },
  });
  res.json(issue);
});

issuesRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.issue.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Задача не найдена" });
  // Отвязываем подзадачи/дочерние эпика, а не удаляем каскадом — потеря
  // связанных задач при удалении эпика была бы неожиданным поведением.
  await prisma.issue.updateMany({ where: { parentId: existing.id }, data: { parentId: null } });
  await prisma.issue.updateMany({ where: { epicId: existing.id }, data: { epicId: null } });
  await prisma.issueEvent.deleteMany({ where: { issueId: existing.id } });
  await prisma.issueAttachment.deleteMany({ where: { issueId: existing.id } });
  await prisma.issue.delete({ where: { id: existing.id } });
  res.json({ ok: true });
});

issuesRouter.post("/:id/comments", async (req, res) => {
  const message = req.body?.message;
  if (typeof message !== "string" || !message.trim()) return res.status(400).json({ error: "message обязателен" });

  const existing = await prisma.issue.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Задача не найдена" });

  const event = await prisma.issueEvent.create({
    data: { issueId: req.params.id, type: "comment", message, userId: req.auth!.userId },
  });
  res.status(201).json(event);
});

issuesRouter.post("/:id/attachments", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не передан" });

  const existing = await prisma.issue.findFirst({
    where: { id: req.params.id, organizationId: req.auth!.organizationId },
  });
  if (!existing) return res.status(404).json({ error: "Задача не найдена" });

  const attachment = await prisma.issueAttachment.create({
    data: { issueId: req.params.id, url: `/uploads/${req.file.filename}`, uploadedById: req.auth!.userId },
  });
  const attachmentEventMessage = issueMessages.attachmentAdded();
  await prisma.issueEvent.create({
    data: {
      issueId: req.params.id,
      type: "attachment",
      message: attachmentEventMessage.ru,
      messageUz: attachmentEventMessage.uz,
      userId: req.auth!.userId,
    },
  });
  res.status(201).json(attachment);
});
