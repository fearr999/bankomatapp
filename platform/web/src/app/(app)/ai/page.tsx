"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

const TYPES = [
  { value: "photo_analysis", label: "Анализ фотографий" },
  { value: "employee_efficiency", label: "Эффективность сотрудника" },
  { value: "load_forecast", label: "Прогноз загрузки" },
  { value: "assignment_recommendation", label: "Рекомендация по назначению" },
  { value: "anomaly_detection", label: "Поиск аномалий" },
  { value: "equipment_failure_prediction", label: "Прогноз поломки оборудования" },
  { value: "smart_search", label: "Интеллектуальный поиск" },
];

interface Insight {
  id: string;
  type: string;
  summary: string;
  createdAt: string;
}

export default function AiPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [type, setType] = useState(TYPES[0].value);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setInsights(await apiFetch<Insight[]>("/ai/insights"));
  }

  useEffect(() => {
    load();
  }, []);

  async function runDemo(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/ai/analyze", { method: "POST", body: JSON.stringify({ type, query }) });
      setQuery("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Sparkles size={22} />
        <h1 className="text-2xl font-semibold tracking-tight">AI-модуль</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Архитектура</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            Готова точка подключения: единый эндпоинт <code>POST /ai/analyze</code>, куда позже
            подключится реальная модель (например, Claude через Anthropic API) — сейчас он возвращает
            предсказуемую заглушку в том же формате, в котором будет отвечать модель, и сохраняет
            результат в базу (<code>AiInsight</code>), чтобы фронтенду не пришлось меняться, когда
            модель подключат по-настоящему.
          </p>
          <p>Из ТЗ предусмотрены следующие направления анализа (все уже в контракте API):</p>
          <ul className="ml-4 list-disc">
            {TYPES.map((t) => (
              <li key={t.value}>{t.label}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Демо-вызов (заглушка)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form onSubmit={runDemo} className="flex flex-wrap items-end gap-2">
            <select
              className="h-9 rounded-md border bg-transparent px-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <input
              className="h-9 flex-1 min-w-[200px] rounded-md border bg-transparent px-3 text-sm"
              placeholder="Запрос (для интеллектуального поиска)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" disabled={busy}>
              {busy ? "Выполняем..." : "Запустить"}
            </Button>
          </form>

          <div className="flex flex-col gap-2">
            {insights.map((i) => (
              <div key={i.id} className="rounded-md border p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {TYPES.find((t) => t.value === i.type)?.label ?? i.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(i.createdAt).toLocaleString("ru-RU")}
                  </span>
                </div>
                <p className="text-muted-foreground">{i.summary}</p>
              </div>
            ))}
            {insights.length === 0 && (
              <p className="text-sm text-muted-foreground">Запусков пока не было</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
