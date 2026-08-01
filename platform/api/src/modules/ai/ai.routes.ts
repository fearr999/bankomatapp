import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { authenticate, blockContractor } from "../../middleware/authenticate.js";

export const aiRouter = Router();
aiRouter.use(authenticate);
aiRouter.use(blockContractor);

/// Архитектурная заготовка под AI-модуль из ТЗ. Реального подключения
/// модели нет (нет ключа/провайдера) — эндпоинт возвращает предсказуемую
/// заглушку в ТОЙ ЖЕ форме, в которой позже будет отвечать настоящая модель,
/// и сохраняет результат в AiInsight. Когда появится провайдер (Anthropic API
/// и т.д.), внутри analyze_() меняется только тело функции — контракт роута
/// остаётся прежним для фронтенда.
const SUPPORTED_TYPES = [
  "photo_analysis",
  "employee_efficiency",
  "load_forecast",
  "assignment_recommendation",
  "anomaly_detection",
  "equipment_failure_prediction",
  "smart_search",
] as const;

const analyzeSchema = z.object({
  type: z.enum(SUPPORTED_TYPES),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
  query: z.string().optional(),
});

function stubAnalyze(type: (typeof SUPPORTED_TYPES)[number], query?: string) {
  const stubs: Record<(typeof SUPPORTED_TYPES)[number], string> = {
    photo_analysis: "Анализ фотографий подключится здесь: проверка полноты работ, качества снимка, распознавание повреждений.",
    employee_efficiency: "Здесь появится оценка эффективности сотрудника на основе истории заявок, времени выполнения и SLA.",
    load_forecast: "Здесь появится прогноз загрузки бригад на ближайший период по истории заявок.",
    assignment_recommendation: "Здесь появится рекомендация, кому назначить заявку, с учётом загрузки, специализации и расстояния.",
    anomaly_detection: "Здесь появится поиск аномалий: подозрительно долгие визиты, отклонения GPS, нетипичные паттерны.",
    equipment_failure_prediction: "Здесь появится прогноз поломки оборудования по истории обслуживания и инкассаций.",
    smart_search: query
      ? `Интеллектуальный поиск по запросу «${query}» подключится здесь (сейчас — заглушка).`
      : "Здесь появится интеллектуальный поиск по всей системе.",
  };
  return stubs[type];
}

aiRouter.post("/analyze", async (req, res) => {
  const parsed = analyzeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const summary = stubAnalyze(parsed.data.type, parsed.data.query);

  const insight = await prisma.aiInsight.create({
    data: {
      type: parsed.data.type,
      targetType: parsed.data.targetType,
      targetId: parsed.data.targetId,
      summary,
      payload: { stub: true, note: "Реальная модель не подключена" },
      organizationId: req.auth!.organizationId,
    },
  });

  res.status(201).json(insight);
});

aiRouter.get("/insights", async (req, res) => {
  const insights = await prisma.aiInsight.findMany({
    where: { organizationId: req.auth!.organizationId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json(insights);
});
