import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor } from "../../middleware/authenticate.js";

export const sprintsRouter = Router();
sprintsRouter.use(authenticate);
sprintsRouter.use(blockContractor);

const updateSprintSchema = z.object({
  name: z.string().min(1).optional(),
  goal: z.string().optional(),
  startDate: z.string().datetime().nullable().optional(),
  endDate: z.string().datetime().nullable().optional(),
});

sprintsRouter.patch("/:id", async (req, res) => {
  const parsed = updateSprintSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existing = await prisma.sprint.findFirst({
    where: { id: req.params.id, project: { organizationId: req.auth!.organizationId } },
  });
  if (!existing) return res.status(404).json({ error: "Спринт не найден" });

  const { startDate, endDate, ...rest } = parsed.data;
  const sprint = await prisma.sprint.update({
    where: { id: req.params.id },
    data: {
      ...rest,
      startDate: startDate === undefined ? undefined : startDate ? new Date(startDate) : null,
      endDate: endDate === undefined ? undefined : endDate ? new Date(endDate) : null,
    },
  });
  res.json(sprint);
});

/// Старт спринта — в один момент в проекте активен только один спринт
/// (как в Jira/Scrum), поэтому остальные ACTIVE-спринты этого проекта
/// автоматически не трогаем — так решает пользователь, но проверяем явный
/// конфликт, чтобы не завести дублирующий "активный" статус молча.
sprintsRouter.post("/:id/start", async (req, res) => {
  const sprint = await prisma.sprint.findFirst({
    where: { id: req.params.id, project: { organizationId: req.auth!.organizationId } },
  });
  if (!sprint) return res.status(404).json({ error: "Спринт не найден" });

  const alreadyActive = await prisma.sprint.findFirst({
    where: { projectId: sprint.projectId, status: "ACTIVE", id: { not: sprint.id } },
  });
  if (alreadyActive) {
    return res.status(409).json({ error: `В проекте уже есть активный спринт «${alreadyActive.name}»` });
  }

  const updated = await prisma.sprint.update({
    where: { id: sprint.id },
    data: { status: "ACTIVE", startDate: sprint.startDate ?? new Date() },
  });
  res.json(updated);
});

/// Завершение спринта — как в Jira: незавершённые задачи возвращаются
/// в бэклог проекта (sprintId сбрасывается), спринт помечается COMPLETED.
sprintsRouter.post("/:id/complete", async (req, res) => {
  const sprint = await prisma.sprint.findFirst({
    where: { id: req.params.id, project: { organizationId: req.auth!.organizationId } },
  });
  if (!sprint) return res.status(404).json({ error: "Спринт не найден" });

  const [, updated] = await prisma.$transaction([
    prisma.issue.updateMany({
      where: { sprintId: sprint.id, status: { not: "DONE" } },
      data: { sprintId: null },
    }),
    prisma.sprint.update({
      where: { id: sprint.id },
      data: { status: "COMPLETED", endDate: sprint.endDate ?? new Date() },
    }),
  ]);
  res.json(updated);
});
