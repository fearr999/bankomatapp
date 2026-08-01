import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const STATUS_LABELS: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначена",
  EN_ROUTE: "Исполнитель в пути",
  ARRIVED: "Исполнитель на месте",
  IN_PROGRESS: "В работе",
  WAITING_MATERIALS: "Ожидает материалы",
  WAITING_APPROVAL: "Требуется согласование",
  COMPLETED: "Завершена",
  CLOSED: "Закрыта",
  CANCELLED: "Отменена",
};

export const publicRouter = Router();

/// Публичное отслеживание заявки по одноразовому токену — без логина, без
/// раскрытия внутренних данных (никаких id исполнителей, финансов и т.п.).
publicRouter.get("/track/:token", async (req, res) => {
  const order = await prisma.workOrder.findUnique({
    where: { publicTrackingToken: req.params.token },
    select: {
      number: true,
      title: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      site: { select: { name: true, address: true } },
      events: {
        where: { type: { in: ["created", "status_change", "assignment", "qr_arrival"] } },
        orderBy: { createdAt: "asc" },
        select: { message: true, createdAt: true },
      },
    },
  });
  if (!order) return res.status(404).json({ error: "Ссылка недействительна" });

  res.json({
    number: order.number,
    title: order.title,
    status: order.status,
    statusLabel: STATUS_LABELS[order.status] ?? order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    site: order.site,
    timeline: order.events,
  });
});
