import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const dashboardRouter = Router();
dashboardRouter.use(authenticate);

const ACTIVE_STATUSES = [
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "WAITING_MATERIALS",
  "WAITING_APPROVAL",
] as const;

dashboardRouter.get("/summary", async (_req, res) => {
  const [active, completed, inProgress, newCount, cancelled, onlineStaff, offlineStaff, overdue, recentEvents] =
    await Promise.all([
      prisma.workOrder.count({ where: { status: { in: [...ACTIVE_STATUSES] } } }),
      prisma.workOrder.count({ where: { status: { in: ["COMPLETED", "CLOSED"] } } }),
      prisma.workOrder.count({ where: { status: "IN_PROGRESS" } }),
      prisma.workOrder.count({ where: { status: "NEW" } }),
      prisma.workOrder.count({ where: { status: "CANCELLED" } }),
      prisma.user.count({ where: { status: "online" } }),
      prisma.user.count({ where: { status: "offline" } }),
      prisma.workOrder.count({
        where: {
          slaDueAt: { lt: new Date() },
          status: { notIn: ["COMPLETED", "CLOSED", "CANCELLED"] },
        },
      }),
      prisma.workOrderEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          user: { select: { name: true } },
          workOrder: { select: { number: true, title: true } },
        },
      }),
    ]);

  res.json({
    active,
    completed,
    inProgress,
    newCount,
    cancelled,
    onlineStaff,
    offlineStaff,
    overdue,
    recentEvents,
  });
});
