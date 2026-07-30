"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

interface EquipmentRow {
  id: string;
  name: string;
  model: string | null;
  serialNumber: string | null;
  status: string;
  nextServiceAt: string | null;
  site?: { name: string } | null;
}

const STATUS_LABELS: Record<string, string> = {
  operational: "Исправно",
  broken: "Неисправно",
  maintenance: "На обслуживании",
};

const STATUS_STYLES: Record<string, string> = {
  operational: "bg-emerald-500/10 text-emerald-600",
  broken: "bg-red-500/10 text-red-600",
  maintenance: "bg-amber-500/10 text-amber-600",
};

export default function EquipmentPage() {
  const [items, setItems] = useState<EquipmentRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  async function load() {
    try {
      setItems(await apiFetch<EquipmentRow[]>("/equipment"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch("/equipment", {
      method: "POST",
      body: JSON.stringify({ name, model, serialNumber }),
    });
    setName("");
    setModel("");
    setSerialNumber("");
    setShowCreate(false);
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Оборудование</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> Добавить оборудование
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={create} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Название</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Модель</label>
                <Input value={model} onChange={(e) => setModel(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Серийный номер</label>
                <Input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
              </div>
              <Button type="submit">Добавить</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link key={it.id} href={`/equipment/${it.id}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardContent className="flex flex-col gap-1.5 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{it.name}</span>
                  <span className={`rounded px-2 py-0.5 text-xs ${STATUS_STYLES[it.status]}`}>
                    {STATUS_LABELS[it.status] ?? it.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {it.model ?? "—"} {it.serialNumber ? `· S/N ${it.serialNumber}` : ""}
                </span>
                <span className="text-xs text-muted-foreground">{it.site?.name ?? "Без объекта"}</span>
                {it.nextServiceAt && (
                  <span className="text-xs text-muted-foreground">
                    Следующее ТО: {new Date(it.nextServiceAt).toLocaleDateString("ru-RU")}
                  </span>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">Оборудования пока нет.</p>
        )}
      </div>
    </div>
  );
}
