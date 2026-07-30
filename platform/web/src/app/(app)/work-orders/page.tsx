"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

interface WorkOrder {
  id: string;
  number: string;
  title: string;
  status: string;
  createdAt: string;
  client?: { name: string } | null;
  site?: { name: string; address: string | null } | null;
  assignedTo?: { name: string } | null;
}

export default function WorkOrdersPage() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const data = await apiFetch<WorkOrder[]>("/work-orders");
      setOrders(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/work-orders", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
      setTitle("");
      setDescription("");
      setShowCreate(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка создания");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Заявки</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> Новая заявка
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={createOrder} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Название</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Описание</label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <Button type="submit" disabled={busy}>
                {busy ? "Создаём..." : "Создать"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Номер</th>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Клиент / Объект</th>
                <th className="px-4 py-3 font-medium">Исполнитель</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Создана</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <Link href={`/work-orders/${o.id}`} className="font-medium hover:underline">
                      {o.number}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{o.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.client?.name ?? "—"} {o.site ? `/ ${o.site.name}` : ""}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.assignedTo?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    Заявок пока нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
