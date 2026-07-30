import "dotenv/config";
import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { workOrdersRouter } from "./modules/workorders/workorders.routes.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes.js";
import { teamsRouter } from "./modules/teams/teams.routes.js";
import { attachmentsRouter, UPLOADS_DIR } from "./modules/attachments/attachments.routes.js";
import { checklistsRouter } from "./modules/checklists/checklists.routes.js";
import { sitesRouter } from "./modules/sites/sites.routes.js";
import { equipmentRouter } from "./modules/equipment/equipment.routes.js";
import { warehouseRouter } from "./modules/warehouse/warehouse.routes.js";
import { clientsRouter } from "./modules/clients/clients.routes.js";
import { analyticsRouter } from "./modules/analytics/analytics.routes.js";
import { aiRouter } from "./modules/ai/ai.routes.js";
import { notificationsRouter } from "./modules/notifications/notifications.routes.js";
import { startTelegramPolling, isTelegramConfigured } from "./lib/telegram.js";

// Один необработанный отказ промиса в асинхронном роуте (например, сбой сети
// при обращении к внешнему API вроде Telegram) не должен ронять весь сервер.
process.on("unhandledRejection", (err) => {
  console.error("Необработанная ошибка промиса:", err);
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/work-orders", workOrdersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/teams", teamsRouter);
app.use("/attachments", attachmentsRouter);
app.use("/checklists", checklistsRouter);
app.use("/sites", sitesRouter);
app.use("/equipment", equipmentRouter);
app.use("/warehouse", warehouseRouter);
app.use("/clients", clientsRouter);
app.use("/analytics", analyticsRouter);
app.use("/ai", aiRouter);
app.use("/notifications", notificationsRouter);

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`CorePi API запущен на http://localhost:${port}`);
  if (isTelegramConfigured()) {
    startTelegramPolling();
    console.log("Telegram-бот: опрос обновлений запущен");
  } else {
    console.log("Telegram-бот: TELEGRAM_BOT_TOKEN не задан, уведомления в Telegram отключены");
  }
});
