"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Camera, FileDown, Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, STATUS_LABELS } from "@/components/ui/badge";
import { SlaBadge } from "@/components/ui/sla-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch, API_BASE, getToken } from "@/lib/api";
import { REQUEST_TYPE_LABELS } from "@/lib/request-types";

interface OrderDetail {
  id: string;
  number: string;
  title: string;
  description: string | null;
  status: string;
  requestType: string;
  slaStatus: string | null;
  publicTrackingToken: string | null;
  client?: { name: string } | null;
  site?: { name: string; address: string | null; lat: number | null; lng: number | null } | null;
  assignedTo?: { name: string } | null;
  team?: { name: string } | null;
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
  submittedBy?: { name: string } | null;
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
    <Card>
      <CardHeader>
        <CardTitle>Чек-лист</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {submissions.map((s) => (
          <div key={s.id} className="rounded-md border p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium">{s.template.name}</span>
              <span className="text-xs text-muted-foreground">
                {s.submittedBy?.name ?? "—"} · {new Date(s.createdAt).toLocaleString("ru-RU")}
              </span>
            </div>
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
          <p className="text-sm text-muted-foreground">
            Шаблонов пока нет — создайте в разделе «Чек-листы».
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <select
              className="h-9 rounded-md border bg-transparent px-2 text-sm"
              value={templateId}
              onChange={(e) => {
                setTemplateId(e.target.value);
                setAnswers({});
              }}
            >
              <option value="">Выбрать шаблон для заполнения...</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {selected && (
              <div className="flex flex-col gap-2 rounded-md border p-3">
                {selected.fields.map((f) => (
                  <div key={f.id} className="flex items-center justify-between gap-3 text-sm">
                    <label>
                      {f.label}
                      {f.required && " *"}
                    </label>
                    {f.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={answers[f.id] === true}
                        onChange={(e) => setAnswers((a) => ({ ...a, [f.id]: e.target.checked }))}
                      />
                    ) : (
                      <Input
                        type={f.type === "number" ? "number" : "text"}
                        className="w-40"
                        value={(answers[f.id] as string) ?? ""}
                        onChange={(e) => setAnswers((a) => ({ ...a, [f.id]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" disabled={busy} className="mt-2 w-fit">
                  {busy ? "Сохраняем..." : "Сохранить чек-лист"}
                </Button>
              </div>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
}

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

  async function downloadReport() {
    const res = await fetch(`${API_BASE}/work-orders/${params.id}/report.pdf`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order?.number ?? "report"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyTrackingLink() {
    if (!order?.publicTrackingToken) return;
    const url = `${window.location.origin}/track/${order.publicTrackingToken}`;
    navigator.clipboard.writeText(url);
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!order) return <p className="text-sm text-muted-foreground">Загрузка...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{order.number}</h1>
          <Badge status={order.status} />
          <SlaBadge status={order.slaStatus} />
          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={downloadReport}>
              <FileDown size={16} /> Скачать акт
            </Button>
            {order.publicTrackingToken && (
              <Button variant="outline" onClick={copyTrackingLink}>
                <Link2 size={16} /> Ссылка отслеживания
              </Button>
            )}
          </div>
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
              <span className="text-muted-foreground">
                Тип заявки: {REQUEST_TYPE_LABELS[order.requestType] ?? order.requestType}
              </span>
              <span className="text-muted-foreground">
                Исполнитель: {order.assignedTo?.name ?? order.team?.name ?? "—"}
              </span>
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

        <ChecklistSection workOrderId={order.id} />

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
