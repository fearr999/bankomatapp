"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Camera, WifiOff } from "lucide-react";
import { apiFetch, API_BASE } from "@/lib/api";
import { STATUS_LABELS, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { queuePhoto, listQueuedPhotos, flushOfflineQueue, type QueuedPhoto } from "@/lib/offline-queue";

interface OrderDetail {
  id: string;
  number: string;
  title: string;
  description: string | null;
  status: string;
  client?: { name: string } | null;
  site?: { name: string; address: string | null } | null;
  attachments: Array<{ id: string; url: string; createdAt: string }>;
  events: Array<{ id: string; type: string; message: string; createdAt: string; user?: { name: string } | null }>;
}

interface ChecklistField {
  id: string;
  label: string;
  type: "checkbox" | "text" | "number";
  required: boolean;
}
interface ChecklistTemplate {
  id: string;
  name: string;
  fields: ChecklistField[];
}
interface ChecklistSubmission {
  id: string;
  answers: Record<string, unknown>;
  createdAt: string;
  template: ChecklistTemplate;
}

const STATUS_FLOW = Object.keys(STATUS_LABELS);

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

function ChecklistSection({ workOrderId }: { workOrderId: string }) {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [submissions, setSubmissions] = useState<ChecklistSubmission[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [busy, setBusy] = useState(false);

  async function load() {
    const [t, s] = await Promise.all([
      apiFetch<ChecklistTemplate[]>("/checklists/templates"),
      apiFetch<ChecklistSubmission[]>(`/checklists/work-orders/${workOrderId}/submissions`),
    ]);
    setTemplates(t);
    setSubmissions(s);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workOrderId]);

  const selected = templates.find((t) => t.id === templateId);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setBusy(true);
    try {
      await apiFetch(`/checklists/work-orders/${workOrderId}/submissions`, {
        method: "POST",
        body: JSON.stringify({ templateId: selected.id, answers }),
      });
      setTemplateId("");
      setAnswers({});
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="flex flex-col gap-3 border-t border-border p-4">
      <h2 className="text-sm font-semibold">Чек-лист</h2>
      {submissions.map((s) => (
        <div key={s.id} className="rounded-lg border border-border p-3 text-sm">
          <p className="font-medium">{s.template.name}</p>
          <div className="mt-1 flex flex-col gap-0.5 text-xs text-muted-foreground">
            {s.template.fields.map((f) => (
              <span key={f.id}>
                {f.label}: {String(s.answers[f.id] ?? "—")}
              </span>
            ))}
          </div>
        </div>
      ))}

      {templates.length === 0 ? (
        <p className="text-sm text-muted-foreground">Шаблонов пока нет</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <select
            className="h-11 rounded-md border border-border bg-transparent px-3 text-sm"
            value={templateId}
            onChange={(e) => {
              setTemplateId(e.target.value);
              setAnswers({});
            }}
          >
            <option value="">Выбрать чек-лист...</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {selected && (
            <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
              {selected.fields.map((f) => (
                <div key={f.id} className="flex items-center justify-between gap-3 text-sm">
                  <label>
                    {f.label}
                    {f.required && " *"}
                  </label>
                  {f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={answers[f.id] === true}
                      onChange={(e) => setAnswers((a) => ({ ...a, [f.id]: e.target.checked }))}
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      className="h-10 w-32 rounded-md border border-border bg-transparent px-2 text-sm"
                      value={(answers[f.id] as string) ?? ""}
                      onChange={(e) => setAnswers((a) => ({ ...a, [f.id]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
              <Button type="submit" disabled={busy}>
                {busy ? "Сохраняем..." : "Сохранить чек-лист"}
              </Button>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

function OrderDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id") ?? "";
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [queued, setQueued] = useState<QueuedPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasLoadedRef = useRef(false);

  async function load() {
    if (!orderId) return;
    try {
      const data = await apiFetch<OrderDetail>(`/work-orders/${orderId}`);
      setOrder(data);
      setError(null);
      hasLoadedRef.current = true;
    } catch (e) {
      // Обрыв сети при уже открытой заявке (офлайн-режим) не должен стирать
      // с экрана уже показанные данные — иначе теряется и баннер очереди фото.
      if (!hasLoadedRef.current) {
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
      }
    }
    const q = await listQueuedPhotos();
    setQueued(q.filter((p) => p.workOrderId === orderId));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  async function changeStatus(status: string) {
    await apiFetch(`/work-orders/${orderId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
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
      try {
        await apiFetch(`/attachments/work-orders/${orderId}/photos`, { method: "POST", body: form });
      } catch {
        // Нет сети или бэкенд недоступен — кладём в офлайн-очередь IndexedDB, отправим позже.
        await queuePhoto({
          workOrderId: orderId,
          blob: file,
          filename: file.name,
          lat: loc?.lat,
          lng: loc?.lng,
        });
      }
      await load();
    } finally {
      setUploading(false);
    }
  }

  async function retryQueue() {
    await flushOfflineQueue();
    await load();
  }

  if (error) return <p className="p-4 text-sm text-red-500">{error}</p>;
  if (!order) return <p className="p-4 text-sm text-muted-foreground">Загрузка...</p>;

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <button onClick={() => router.back()} aria-label="Назад">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{order.number}</p>
          <p className="font-semibold leading-tight">{order.title}</p>
        </div>
        <StatusBadge status={order.status} />
      </header>

      {queued.length > 0 && (
        <button
          onClick={retryQueue}
          className="flex items-center gap-2 bg-amber-500/15 px-4 py-2 text-xs text-amber-500"
        >
          <WifiOff size={14} /> {queued.length} фото не отправлено — нажмите, чтобы повторить
        </button>
      )}

      <section className="flex flex-col gap-2 border-b border-border p-4 text-sm">
        <p className="text-muted-foreground">{order.description || "Без описания"}</p>
        <p className="text-xs text-muted-foreground">Клиент: {order.client?.name ?? "—"}</p>
        <p className="text-xs text-muted-foreground">
          Адрес: {order.site?.address ?? order.site?.name ?? "—"}
        </p>
      </section>

      <section className="flex flex-col gap-2 border-b border-border p-4">
        <h2 className="text-sm font-semibold">Сменить статус</h2>
        <div className="flex flex-wrap gap-2">
          {STATUS_FLOW.map((s) => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              disabled={s === order.status}
              className={`h-9 rounded-full px-3 text-xs ${
                s === order.status ? "bg-primary text-primary-foreground" : "border border-border"
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Фотографии</h2>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Camera size={16} /> {uploading ? "Загружаем..." : "Снять фото"}
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
        {order.attachments.length === 0 ? (
          <p className="text-sm text-muted-foreground">Фотографий пока нет</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {order.attachments.map((a) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={a.id}
                src={`${API_BASE}${a.url}`}
                alt=""
                className="aspect-square rounded-md border border-border object-cover"
              />
            ))}
          </div>
        )}
      </section>

      <ChecklistSection workOrderId={order.id} />

      <section className="flex flex-col gap-3 p-4">
        <h2 className="text-sm font-semibold">История</h2>
        {order.events.map((e) => (
          <div key={e.id} className="border-b border-border pb-2 text-sm last:border-0">
            <div className="flex items-center justify-between">
              <span>{e.message}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(e.createdAt).toLocaleString("ru-RU")}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{e.user?.name ?? "система"}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<p className="p-4 text-sm text-muted-foreground">Загрузка...</p>}>
      <OrderDetailContent />
    </Suspense>
  );
}
