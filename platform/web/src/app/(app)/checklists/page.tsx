"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { apiFetch } from "@/lib/api";

type FieldType = "checkbox" | "text" | "number";

interface Field {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}

interface Template {
  id: string;
  name: string;
  fields: Field[];
}

const TYPE_LABELS: Record<FieldType, string> = {
  checkbox: "Да/Нет",
  text: "Текст",
  number: "Число",
};

function emptyField(): Field {
  return { id: "", label: "", type: "checkbox", required: false };
}

export default function ChecklistsPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([emptyField()]);

  async function load() {
    try {
      setTemplates(await apiFetch<Template[]>("/checklists/templates"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function updateField(i: number, patch: Partial<Field>) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  async function createTemplate(e: React.FormEvent) {
    e.preventDefault();
    const cleanFields = fields
      .filter((f) => f.label.trim())
      .map((f) => ({ ...f, id: f.id.trim() || f.label.trim().toLowerCase().replace(/\s+/g, "_") }));
    if (cleanFields.length === 0) return;
    try {
      await apiFetch("/checklists/templates", {
        method: "POST",
        body: JSON.stringify({ name, fields: cleanFields }),
      });
      setName("");
      setFields([emptyField()]);
      setShowCreate(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка создания");
    }
  }

  async function removeTemplate(id: string) {
    await apiFetch(`/checklists/templates/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Чек-листы</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> Новый шаблон
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle>Новый шаблон</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createTemplate} className="flex flex-col gap-3">
              <Input
                placeholder="Название шаблона (например, «Обслуживание банкомата»)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="flex flex-col gap-2">
                {fields.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      placeholder="Название пункта"
                      value={f.label}
                      onChange={(e) => updateField(i, { label: e.target.value })}
                      className="flex-1"
                    />
                    <select
                      className="h-9 rounded-md border bg-transparent px-2 text-sm"
                      value={f.type}
                      onChange={(e) => updateField(i, { type: e.target.value as FieldType })}
                    >
                      {Object.entries(TYPE_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <label className="flex items-center gap-1 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={f.required}
                        onChange={(e) => updateField(i, { required: e.target.checked })}
                      />
                      обязательно
                    </label>
                    <button
                      type="button"
                      onClick={() => setFields((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground transition-colors hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit"
                  onClick={() => setFields((prev) => [...prev, emptyField()])}
                >
                  <Plus size={14} /> Добавить пункт
                </Button>
              </div>
              <Button type="submit" className="w-fit">
                Создать шаблон
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading && <PageLoader />}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {!loading && templates.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-foreground">{t.name}</CardTitle>
                <button
                  onClick={() => removeTemplate(t.id)}
                  className="text-muted-foreground transition-colors hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {t.fields.map((f) => (
                <div key={f.id} className="flex items-center justify-between text-sm">
                  <span>{f.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {TYPE_LABELS[f.type]}
                    {f.required ? " · обязательно" : ""}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
        {!loading && templates.length === 0 && (
          <p className="text-sm text-muted-foreground">Шаблонов пока нет — создайте первый.</p>
        )}
      </div>
    </div>
  );
}
