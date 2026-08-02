"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Camera, WifiOff, QrCode, FileDown, Link2, MapPin, ListChecks } from "lucide-react";
import { apiFetch, API_BASE, WEB_BASE, getToken } from "@/lib/api";
import { STATUS_KEYS, StatusBadge, useStatusLabels } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { queuePhoto, listQueuedPhotos, flushOfflineQueue, type QueuedPhoto } from "@/lib/offline-queue";
import { QrScannerModal } from "@/components/qr-scanner";
import { SignaturePad } from "@/components/signature-pad";
import { distanceMeters } from "@/lib/geo";

interface OrderDetail {
  id: string;
  number: string;
  title: string;
  description: string | null;
  status: string;
  slaStatus: string | null;
  publicTrackingToken: string | null;
  client?: { name: string } | null;
  site?: { id: string; name: string; address: string | null; lat: number | null; lng: number | null } | null;
  attachments: Array<{ id: string; url: string; createdAt: string }>;
  events: Array<{ id: string; type: string; message: string; createdAt: string; user?: { name: string } | null }>;
}

const SLA_STYLES: Record<string, string> = {
  overdue: "bg-red-500/15 text-red-500",
  at_risk: "bg-amber-500/15 text-amber-500",
  ok: "bg-emerald-500/15 text-emerald-500",
};

const ARRIVAL_RADIUS_M = 150;
const GEOFENCE_CHECK_MS = 20_000;

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

const STATUS_FLOW = STATUS_KEYS;

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
  const { t } = useLocale();
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [submissions, setSubmissions] = useState<ChecklistSubmission[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [busy, setBusy] = useState(false);

  async function load() {
    const [loadedTemplates, loadedSubmissions] = await Promise.all([
      apiFetch<ChecklistTemplate[]>("/checklists/templates"),
      apiFetch<ChecklistSubmission[]>(`/checklists/work-orders/${workOrderId}/submissions`),
    ]);
    setTemplates(loadedTemplates);
    setSubmissions(loadedSubmissions);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workOrderId]);

  const selected = templates.find((tpl) => tpl.id === templateId);

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
      <h2 className="text-sm font-semibold">{t.order.checklist}</h2>
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
        <EmptyState icon={ListChecks} title={t.order.noTemplates} size="sm" bordered={false} />
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
            <option value="">{t.order.selectChecklist}</option>
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
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
                {busy ? t.order.saving : t.order.saveChecklist}
              </Button>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

function OrderDetailContent() {
  const { t, locale } = useLocale();
  const statusLabels = useStatusLabels();
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id") ?? "";
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [queued, setQueued] = useState<QueuedPhoto[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [qrMessage, setQrMessage] = useState<string | null>(null);
  const [nearSite, setNearSite] = useState(false);
  const [savingSignature, setSavingSignature] = useState(false);
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
        setError(e instanceof Error ? e.message : t.order.loadError);
      }
    }
    const q = await listQueuedPhotos();
    setQueued(q.filter((p) => p.workOrderId === orderId));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // Геозона-автоприбытие: пока заявка "в пути"/"назначена" и есть координаты
  // объекта, периодически сверяем позицию сотрудника — рядом ли он.
  useEffect(() => {
    if (!order?.site?.lat || !order?.site?.lng) return;
    if (!["ASSIGNED", "EN_ROUTE"].includes(order.status)) {
      setNearSite(false);
      return;
    }
    const siteCoords = { lat: order.site.lat, lng: order.site.lng };
    function check() {
      if (typeof navigator === "undefined" || !navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const d = distanceMeters({ lat: pos.coords.latitude, lng: pos.coords.longitude }, siteCoords);
          setNearSite(d <= ARRIVAL_RADIUS_M);
        },
        () => {},
        { timeout: 5000, maximumAge: 15_000 }
      );
    }
    check();
    const id = setInterval(check, GEOFENCE_CHECK_MS);
    return () => clearInterval(id);
  }, [order?.site?.lat, order?.site?.lng, order?.status]);

  async function changeStatus(status: string) {
    await apiFetch(`/work-orders/${orderId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
    await load();
  }

  async function confirmArrivalQr(scannedSiteId: string) {
    setShowScanner(false);
    try {
      await apiFetch(`/work-orders/${orderId}/confirm-arrival-qr`, {
        method: "POST",
        body: JSON.stringify({ scannedSiteId }),
      });
      setQrMessage(t.order.arrivalConfirmed);
      await load();
    } catch (e) {
      setQrMessage(e instanceof Error ? e.message : t.order.qrMismatch);
    }
    setTimeout(() => setQrMessage(null), 4000);
  }

  async function saveSignature(blob: Blob) {
    setSavingSignature(true);
    try {
      const form = new FormData();
      form.append("photo", blob, "signature.png");
      form.append("kind", "signature");
      await apiFetch(`/attachments/work-orders/${orderId}/photos`, { method: "POST", body: form });
      await load();
    } finally {
      setSavingSignature(false);
    }
  }

  async function downloadReport() {
    const res = await fetch(`${API_BASE}/work-orders/${orderId}/report.pdf`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  function copyTrackingLink() {
    if (!order?.publicTrackingToken) return;
    navigator.clipboard?.writeText(`${WEB_BASE}/track/${order.publicTrackingToken}`);
    setQrMessage(t.order.linkCopied);
    setTimeout(() => setQrMessage(null), 3000);
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
  if (!order) return <PageLoader />;

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
        <button onClick={() => router.back()} aria-label={t.order.back}>
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
          <WifiOff size={14} /> {queued.length} {t.order.photosNotSent}
        </button>
      )}

      {qrMessage && (
        <div className="bg-blue-500/15 px-4 py-2 text-xs text-blue-500">{qrMessage}</div>
      )}

      {nearSite && (
        <button
          onClick={() => changeStatus("ARRIVED")}
          className="flex items-center gap-2 bg-emerald-500/15 px-4 py-2 text-xs font-medium text-emerald-600"
        >
          <MapPin size={14} /> {t.order.nearSitePrompt}
        </button>
      )}

      <section className="flex flex-col gap-2 border-b border-border p-4 text-sm">
        <div className="flex items-center gap-2">
          {order.slaStatus && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${SLA_STYLES[order.slaStatus]}`}>
              {t.sla[order.slaStatus as keyof typeof t.sla]}
            </span>
          )}
        </div>
        <p className="text-muted-foreground">{order.description || t.order.noDescription}</p>
        <p className="text-xs text-muted-foreground">{t.order.client}: {order.client?.name ?? "—"}</p>
        <p className="text-xs text-muted-foreground">
          {t.order.address}: {order.site?.address ?? order.site?.name ?? "—"}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {order.site && (
            <Button variant="outline" onClick={() => setShowScanner(true)}>
              <QrCode size={16} /> {t.order.scanArrivalQr}
            </Button>
          )}
          <Button variant="outline" onClick={downloadReport}>
            <FileDown size={16} /> {t.order.downloadReport}
          </Button>
          {order.publicTrackingToken && (
            <Button variant="outline" onClick={copyTrackingLink}>
              <Link2 size={16} /> {t.order.clientLink}
            </Button>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-border p-4">
        <h2 className="text-sm font-semibold">{t.order.changeStatus}</h2>
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
              {statusLabels[s as keyof typeof statusLabels]}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{t.order.photos}</h2>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Camera size={16} /> {uploading ? t.order.uploading : t.order.takePhoto}
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
          <EmptyState icon={Camera} title={t.order.noPhotos} size="sm" bordered={false} />
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

      <section className="flex flex-col gap-3 border-b border-border p-4">
        <h2 className="text-sm font-semibold">{t.order.signature}</h2>
        <SignaturePad onSave={saveSignature} busy={savingSignature} />
      </section>

      <section className="flex flex-col gap-3 p-4">
        <h2 className="text-sm font-semibold">{t.order.history}</h2>
        {order.events.map((e) => (
          <div key={e.id} className="border-b border-border pb-2 text-sm last:border-0">
            <div className="flex items-center justify-between">
              <span>{e.message}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(e.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{e.user?.name ?? t.order.system}</span>
          </div>
        ))}
      </section>

      {showScanner && (
        <QrScannerModal onDetect={confirmArrivalQr} onClose={() => setShowScanner(false)} />
      )}
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <OrderDetailContent />
    </Suspense>
  );
}
