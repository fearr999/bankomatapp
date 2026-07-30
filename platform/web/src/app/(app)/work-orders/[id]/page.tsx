"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, STATUS_LABELS } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch, API_BASE } from "@/lib/api";

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
  attachments: Array<{ id: string; url: string; createdAt: string }>;
  events: Array<{
    id: string;
    type: string;
    message: string;
    createdAt: string;
    user?: { name: string } | null;
  }>;
}

function getBrowserLocation(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 4000 }
    );
  });
}

const STATUS_FLOW = Object.keys(STATUS_LABELS);

export default function WorkOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  async function uploadPhoto(file: File) {
    setUploading(true);
    try {
      const loc = await getBrowserLocation();
      const form = new FormData();
      form.append("photo", file);
      if (loc) {
        form.append("lat", String(loc.lat));
        form.append("lng", String(loc.lng));
      }
      await apiFetch(`/attachments/work-orders/${params.id}/photos`, {
        method: "POST",
        body: form,
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить фото");
    } finally {
      setUploading(false);
    }
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
            <div className="flex items-center justify-between">
              <CardTitle>Фотографии</CardTitle>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Camera size={16} /> {uploading ? "Загружаем..." : "Добавить фото"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadPhoto(file);
                  e.target.value = "";
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            {order.attachments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Фотографий пока нет</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {order.attachments.map((a) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={a.id}
                    src={`${API_BASE}${a.url}`}
                    alt=""
                    className="aspect-square rounded-md border object-cover"
                  />
                ))}
              </div>
            )}
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
