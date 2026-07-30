"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, STATUS_LABELS } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

interface OrderDetail {
  id: string;
  number: string;
  title: string;
  description: string | null;
  status: string;
  client?: { name: string } | null;
  site?: { name: string; address: string | null; lat: number | null; lng: number | null } | null;
  assignedTo?: { name: string } | null;
  createdBy?: { name: string } | null;
  events: Array<{
    id: string;
    type: string;
    message: string;
    createdAt: string;
    user?: { name: string } | null;
  }>;
}

const STATUS_FLOW = Object.keys(STATUS_LABELS);

export default function WorkOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  async function load() {
    try {
      const data = await apiFetch<OrderDetail>(`/work-orders/${params.id}`);
      setOrder(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function changeStatus(status: string) {
    await apiFetch(`/work-orders/${params.id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await load();
  }

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    await apiFetch(`/work-orders/${params.id}/comments`, {
      method: "POST",
      body: JSON.stringify({ message: comment }),
    });
    setComment("");
    await load();
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!order) return <p className="text-sm text-muted-foreground">Загрузка...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{order.number}</h1>
          <Badge status={order.status} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{order.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p className="text-muted-foreground">{order.description || "Без описания"}</p>
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <span className="text-muted-foreground">Клиент: {order.client?.name ?? "—"}</span>
              <span className="text-muted-foreground">Объект: {order.site?.name ?? "—"}</span>
              <span className="text-muted-foreground">Адрес: {order.site?.address ?? "—"}</span>
              <span className="text-muted-foreground">Исполнитель: {order.assignedTo?.name ?? "—"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>История изменений</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {order.events.map((e) => (
              <div key={e.id} className="border-b pb-2 text-sm last:border-0">
                <div className="flex items-center justify-between">
                  <span>{e.message}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(e.createdAt).toLocaleString("ru-RU")}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{e.user?.name ?? "система"}</span>
              </div>
            ))}
            <form onSubmit={addComment} className="flex gap-2 pt-2">
              <Input
                placeholder="Добавить комментарий..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit">Отправить</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Сменить статус</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1.5">
          {STATUS_FLOW.map((s) => (
            <Button
              key={s}
              variant={s === order.status ? "default" : "outline"}
              className="justify-start"
              onClick={() => changeStatus(s)}
              disabled={s === order.status}
            >
              {STATUS_LABELS[s]}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
