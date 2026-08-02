import "dotenv/config";
// Патчит express.Router, чтобы отклонённый промис из async-хендлера
// автоматически шёл в error-middleware ниже, а не зависал без ответа —
// сам Express 4 такого не делает. Импортировать после dotenv, но до того,
// как заведётся любой роутер.
import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
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
import { organizationsRouter } from "./modules/organizations/organizations.routes.js";
import { publicRouter } from "./modules/public/public.routes.js";
import { projectsRouter } from "./modules/projects/projects.routes.js";
import { issuesRouter } from "./modules/projects/issues.routes.js";
import { sprintsRouter } from "./modules/projects/sprints.routes.js";
import { cleaningCyclesRouter } from "./modules/cleaning-cycles/cleaning-cycles.routes.js";
import { ownerAdminRouter } from "./modules/owner-admin/owner-admin.routes.js";
import { googleSheetsRouter } from "./modules/integrations/google-sheets.routes.js";
import { startTelegramPolling, isTelegramConfigured } from "./lib/telegram.js";
import { startSupportBotPolling, isSupportBotConfigured } from "./lib/support-bot.js";
import { startBackgroundJobs } from "./lib/background-jobs.js";

// Один необработанный отказ промиса в асинхронном роуте (например, сбой сети
// при обращении к внешнему API вроде Telegram) не должен ронять весь сервер.
process.on("unhandledRejection", (err) => {
  console.error("Необработанная ошибка промиса:", err);
});

// CORS_ORIGINS — необязательный список разрешённых доменов через запятую
// (например "https://app.corpi.example,https://admin.corpi.example"). Если
// не задан — поведение как раньше (открыто для всех origin), чтобы ничего
// не сломать до того, как в проде явно пропишут реальные домены фронтендов.
const corsOrigins = process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean);

const app = express();
app.use(
  helmet({
    // Чистый JSON-API + раздача изображений, HTML не отдаём — CSP тут не
    // применим и только мешает; остальные заголовки helmet (nosniff,
    // X-Frame-Options и т.п.) оставляем как есть, это чистый выигрыш.
    contentSecurityPolicy: false,
    // Фото/подписи из /uploads встраиваются <img>-тегами с другого origin
    // (веб- и мобильный фронтенд) — не блокируем кросс-origin встраивание.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors(corsOrigins ? { origin: corsOrigins } : undefined));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/health", (_req, res) => res.json({ ok: true }));

// Брутфорс-защита на вход/регистрацию — не трогает остальной API.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Слишком много попыток. Попробуйте позже." },
});
app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);
// Тот же лимит на /owner-admin — единственная защита от подбора общего
// секрета панели владельца, кроме самого секрета.
app.use("/owner-admin", authLimiter);

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
app.use("/organizations", organizationsRouter);
app.use("/public", publicRouter);
app.use("/projects", projectsRouter);
app.use("/issues", issuesRouter);
app.use("/sprints", sprintsRouter);
app.use("/cleaning-cycles", cleaningCyclesRouter);
app.use("/owner-admin", ownerAdminRouter);
app.use("/integrations/google-sheets", googleSheetsRouter);

// Последний обработчик — подстраховка на случай ошибки, до которой не
// дотянулся try/catch в самом роуте (в т.ч. отклонённые промисы благодаря
// express-async-errors выше). Без него запрос завис бы без ответа до таймаута
// клиента вместо аккуратного 500. Внутренние детали (стек, сообщение Prisma)
// клиенту не отдаём — только в лог сервера.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Необработанная ошибка в роуте:", err);
  if (res.headersSent) return;
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Corpi API запущен на http://localhost:${port}`);
  if (isTelegramConfigured()) {
    startTelegramPolling();
    console.log("Telegram-бот: опрос обновлений запущен");
  } else {
    console.log("Telegram-бот: TELEGRAM_BOT_TOKEN не задан, уведомления в Telegram отключены");
  }
  if (isSupportBotConfigured()) {
    startSupportBotPolling();
    console.log("Support-бот: опрос обновлений запущен");
  } else {
    console.log("Support-бот: TELEGRAM_SUPPORT_BOT_TOKEN не задан, отключён");
  }
  startBackgroundJobs();
  console.log("Фоновые задачи запущены: эскалация SLA, плановое ТО (каждые 5 минут)");
});
