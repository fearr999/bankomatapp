"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

const TYPE_KEYS = [
  "photo_analysis",
  "employee_efficiency",
  "load_forecast",
  "assignment_recommendation",
  "anomaly_detection",
  "equipment_failure_prediction",
  "smart_search",
] as const;

interface Insight {
  id: string;
  type: string;
  summary: string;
  createdAt: string;
}

export default function AiPage() {
  const { t, locale } = useLocale();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [type, setType] = useState<(typeof TYPE_KEYS)[number]>(TYPE_KEYS[0]);
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
        <h1 className="text-2xl font-semibold tracking-tight">{t.ai.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.ai.architecture}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>{t.ai.architectureText}</p>
          <p>{t.ai.directionsIntro}</p>
          <ul className="ml-4 list-disc">
            {TYPE_KEYS.map((key) => (
              <li key={key}>{t.ai.types[key]}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.ai.demoCall}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form onSubmit={runDemo} className="flex flex-wrap items-end gap-2">
            <select
              className="h-9 rounded-md border bg-transparent px-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value as (typeof TYPE_KEYS)[number])}
            >
              {TYPE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.ai.types[key]}
                </option>
              ))}
            </select>
            <input
              className="h-9 min-w-[200px] flex-1 rounded-md border bg-transparent px-3 text-sm outline-none transition-shadow duration-150 placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              placeholder={t.ai.queryPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" disabled={busy}>
              {busy ? t.ai.running : t.ai.run}
            </Button>
          </form>

          <div className="flex flex-col gap-2">
            {insights.map((i) => (
              <div key={i.id} className="rounded-md border p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {t.ai.types[i.type as keyof typeof t.ai.types] ?? i.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(i.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
                  </span>
                </div>
                <p className="text-muted-foreground">{i.summary}</p>
              </div>
            ))}
            {insights.length === 0 && (
              <p className="text-sm text-muted-foreground">{t.ai.noRunsYet}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
