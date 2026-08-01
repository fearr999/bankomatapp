"use client";

import { useEffect, useState } from "react";
import { Plus, ChevronDown, ChevronUp, AlertTriangle, Warehouse as WarehouseIcon, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";

interface Item {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  quantity: number;
  minQuantity: number | null;
}

interface Movement {
  id: string;
  type: string;
  quantity: number;
  comment: string | null;
  createdAt: string;
  user?: { name: string } | null;
  workOrder?: { number: string } | null;
}

const TYPE_LABELS: Record<string, string> = {
  receipt: "Приход",
  issue: "Выдача",
  return: "Возврат",
  writeoff: "Списание",
};

export default function WarehousePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("шт");
  const [quantity, setQuantity] = useState("0");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    try {
      setItems(await apiFetch<Item[]>("/warehouse/items"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch("/warehouse/items", {
      method: "POST",
      body: JSON.stringify({ name, sku, unit, quantity: Number(quantity) || 0 }),
    });
    setName("");
    setSku("");
    setQuantity("0");
    setShowCreate(false);
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Склад</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> Добавить позицию
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={createItem} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Название</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="w-32">
                <label className="mb-1 block text-xs text-muted-foreground">Артикул</label>
                <Input value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>
              <div className="w-24">
                <label className="mb-1 block text-xs text-muted-foreground">Ед.</label>
                <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
              </div>
              <div className="w-28">
                <label className="mb-1 block text-xs text-muted-foreground">Остаток</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Button type="submit">Добавить</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading && <PageLoader />}
      {!loading && items.length === 0 && (
        <EmptyState icon={WarehouseIcon} title="Товаров на складе пока нет" description="Добавьте первую позицию кнопкой выше" />
      )}
      <div className="flex flex-col gap-2">
        {!loading && items.map((it) => (
          <ItemRow
            key={it.id}
            item={it}
            expanded={expanded === it.id}
            onToggle={() => setExpanded(expanded === it.id ? null : it.id)}
            onChanged={load}
          />
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">Склад пуст.</p>}
      </div>
    </div>
  );
}

function ItemRow({
  item,
  expanded,
  onToggle,
  onChanged,
}: {
  item: Item;
  expanded: boolean;
  onToggle: () => void;
  onChanged: () => void;
}) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [type, setType] = useState("issue");
  const [qty, setQty] = useState("1");
  const [comment, setComment] = useState("");
  const low = item.minQuantity != null && item.quantity < item.minQuantity;

  async function loadMovements() {
    setMovements(await apiFetch<Movement[]>(`/warehouse/items/${item.id}/movements`));
  }

  useEffect(() => {
    if (expanded) loadMovements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  async function submitMovement(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch(`/warehouse/items/${item.id}/movements`, {
      method: "POST",
      body: JSON.stringify({ type, quantity: Number(qty) || 0, comment }),
    });
    setComment("");
    await loadMovements();
    onChanged();
  }

  return (
    <Card>
      <button onClick={onToggle} className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.name}</span>
          {item.sku && <span className="text-xs text-muted-foreground">({item.sku})</span>}
          {low && (
            <span className="flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-xs text-red-600">
              <AlertTriangle size={11} /> ниже минимума
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {item.quantity} {item.unit}
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {expanded && (
        <CardContent className="flex flex-col gap-3 border-t pt-4">
          <form onSubmit={submitMovement} className="flex flex-wrap items-end gap-2">
            <select
              className="h-9 rounded-md border bg-transparent px-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {Object.entries(TYPE_LABELS).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <Input
              type="number"
              className="w-24"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min={0}
            />
            <Input
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 min-w-[160px]"
            />
            <Button type="submit">Провести</Button>
          </form>

          <div className="flex flex-col gap-1.5">
            {movements.map((m) => (
              <div key={m.id} className="flex items-center justify-between text-xs">
                <span>
                  {TYPE_LABELS[m.type] ?? m.type} — {m.quantity} {item.unit}
                  {m.comment ? ` · ${m.comment}` : ""}
                </span>
                <span className="text-muted-foreground">
                  {m.user?.name ?? "—"} · {new Date(m.createdAt).toLocaleString("ru-RU")}
                </span>
              </div>
            ))}
            {movements.length === 0 && (
              <EmptyState icon={History} title="Движений пока нет" size="sm" bordered={false} />
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
