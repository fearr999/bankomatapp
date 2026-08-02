"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Siren, DoorOpen, DoorClosed, Banknote, QrCode, History, ClipboardList } from "lucide-react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

interface EquipmentDetail {
  id: string;
  name: string;
  model: string | null;
  serialNumber: string | null;
  status: string;
  deviceType: string;
  cassetteLevelPercent: number | null;
  warrantyUntil: string | null;
  lastServiceAt: string | null;
  nextServiceAt: string | null;
  maintenanceIntervalDays: number | null;
  lastCollectionAt: string | null;
  notes: string | null;
  site?: { id: string; name: string; address: string | null } | null;
  workOrders: Array<{
    id: string;
    number: string;
    title: string;
    status: string;
    priority: string;
    updatedAt: string;
  }>;
  collections: Array<{
    id: string;
    amount: number | null;
    notes: string | null;
    createdAt: string;
    performedBy?: { name: string } | null;
  }>;
  accessLogs: Array<{
    id: string;
    action: string;
    notes: string | null;
    createdAt: string;
    performedBy?: { name: string } | null;
  }>;
}

export default function EquipmentDetailPage() {
  const { t, locale } = useLocale();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<EquipmentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [collectionAmount, setCollectionAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [nextServiceAt, setNextServiceAt] = useState("");
  const [intervalDays, setIntervalDays] = useState("");
  const [savingSchedule, setSavingSchedule] = useState(false);

  async function load() {
    try {
      const data = await apiFetch<EquipmentDetail>(`/equipment/${params.id}`);
      setItem(data);
      setNextServiceAt(data.nextServiceAt ? data.nextServiceAt.slice(0, 10) : "");
      setIntervalDays(data.maintenanceIntervalDays ? String(data.maintenanceIntervalDays) : "");
    } catch (e) {
      setError(e instanceof Error ? e.message : t.equipment.loadErrorDetail);
    }
  }

  async function saveSchedule(e: React.FormEvent) {
    e.preventDefault();
    setSavingSchedule(true);
    try {
      await apiFetch(`/equipment/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          nextServiceAt: nextServiceAt ? new Date(nextServiceAt).toISOString() : undefined,
          maintenanceIntervalDays: intervalDays ? Number(intervalDays) : undefined,
        }),
      });
      await load();
    } finally {
      setSavingSchedule(false);
    }
  }

  async function showQr(siteId: string) {
    setQrDataUrl(await QRCode.toDataURL(siteId, { width: 220, margin: 1 }));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function recordCollection(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await apiFetch(`/equipment/${params.id}/collections`, {
        method: "POST",
        body: JSON.stringify({ amount: collectionAmount ? Number(collectionAmount) : undefined }),
      });
      setCollectionAmount("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function logAccess(action: "open" | "close") {
    setBusy(true);
    try {
      await apiFetch(`/equipment/${params.id}/access-log`, {
        method: "POST",
        body: JSON.stringify({ action }),
      });
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function emergencyCall() {
    setBusy(true);
    try {
      const order = await apiFetch<{ id: string }>(`/equipment/${params.id}/emergency`, {
        method: "POST",
        body: JSON.stringify({ description: t.equipment.emergencyDescription }),
      });
      router.push(`/work-orders/${order.id}`);
    } finally {
      setBusy(false);
    }
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!item) return <PageLoader />;

  const warrantyActive = item.warrantyUntil && new Date(item.warrantyUntil) > new Date();
  const isAtmLike = item.deviceType === "atm" || item.deviceType === "cardomat";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{item.name}</h1>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          {t.equipmentStatus[item.status as keyof typeof t.equipmentStatus] ?? item.status}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.equipment.specs}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">
            {t.equipment.model}: {item.model ?? "—"}
          </span>
          <span className="text-muted-foreground">
            {t.equipment.serial}: {item.serialNumber ?? "—"}
          </span>
          <span className="text-muted-foreground">
            {t.equipment.site}: {item.site?.name ?? "—"}
          </span>
          <span className="text-muted-foreground">
            {t.equipment.address}: {item.site?.address ?? "—"}
          </span>
          <span className="text-muted-foreground">
            {t.equipment.warranty}:{" "}
            {item.warrantyUntil
              ? `${new Date(item.warrantyUntil).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU")} ${
                  warrantyActive ? `(${t.equipment.warrantyActive})` : `(${t.equipment.warrantyExpired})`
                }`
              : "—"}
          </span>
          <span className="text-muted-foreground">
            {t.equipment.lastService}:{" "}
            {item.lastServiceAt ? new Date(item.lastServiceAt).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU") : "—"}
          </span>
          <span className="text-muted-foreground">
            {t.equipment.nextService}:{" "}
            {item.nextServiceAt ? new Date(item.nextServiceAt).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU") : "—"}
          </span>
          {item.notes && (
            <span className="col-span-2 text-muted-foreground">
              {t.equipment.notes}: {item.notes}
            </span>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.equipment.scheduleAndQr}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={saveSchedule} className="flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">{t.equipment.nextService}</label>
              <Input
                type="date"
                value={nextServiceAt}
                onChange={(e) => setNextServiceAt(e.target.value)}
                className="w-40"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">{t.equipment.intervalDays}</label>
              <Input
                type="number"
                value={intervalDays}
                onChange={(e) => setIntervalDays(e.target.value)}
                className="w-32"
                placeholder={t.equipment.intervalPlaceholder}
              />
            </div>
            <Button type="submit" disabled={savingSchedule}>
              {savingSchedule ? t.equipment.saving : t.equipment.saveSchedule}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">{t.equipment.scheduleNote}</p>

          {item.site && (
            <div className="flex items-center gap-4 border-t pt-4">
              <Button variant="outline" onClick={() => showQr(item.site!.id)}>
                <QrCode size={16} /> {t.equipment.showQr}
              </Button>
              {qrDataUrl && (
                <div className="flex flex-col items-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt={t.equipment.qrAlt} className="rounded-md border" />
                  <span className="text-xs text-muted-foreground">{t.equipment.qrHint}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {isAtmLike && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.equipment.deviceControl}</CardTitle>
              <Button variant="outline" onClick={emergencyCall} disabled={busy} className="text-red-600">
                <Siren size={16} /> {t.equipment.emergencyCall}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {item.cassetteLevelPercent != null && (
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{t.equipment.cassetteLevel}</span>
                  <span>{item.cassetteLevelPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      item.cassetteLevelPercent >= 80
                        ? "bg-red-500"
                        : item.cassetteLevelPercent >= 50
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${item.cassetteLevelPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-end gap-2">
              <form onSubmit={recordCollection} className="flex items-end gap-2">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">{t.equipment.collectionAmount}</label>
                  <Input
                    type="number"
                    className="w-40"
                    value={collectionAmount}
                    onChange={(e) => setCollectionAmount(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={busy}>
                  <Banknote size={16} /> {t.equipment.collection}
                </Button>
              </form>
              <Button variant="outline" onClick={() => logAccess("open")} disabled={busy}>
                <DoorOpen size={16} /> {t.equipment.opened}
              </Button>
              <Button variant="outline" onClick={() => logAccess("close")} disabled={busy}>
                <DoorClosed size={16} /> {t.equipment.closed}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">{t.equipment.collectionHistory}</p>
                <div className="flex flex-col gap-1">
                  {item.collections.map((c) => (
                    <div key={c.id} className="text-xs text-muted-foreground">
                      {c.amount != null ? `${c.amount.toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")} сум` : "—"} ·{" "}
                      {c.performedBy?.name ?? "—"} · {new Date(c.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
                    </div>
                  ))}
                  {item.collections.length === 0 && (
                    <p className="text-xs text-muted-foreground">{t.equipment.noCollections}</p>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">{t.equipment.accessLog}</p>
                <div className="flex flex-col gap-1">
                  {item.accessLogs.map((a) => (
                    <div key={a.id} className="text-xs text-muted-foreground">
                      {a.action === "open" ? t.equipment.opened : t.equipment.closed} · {a.performedBy?.name ?? "—"} ·{" "}
                      {new Date(a.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
                    </div>
                  ))}
                  {item.accessLogs.length === 0 && (
                    <EmptyState icon={History} title={t.equipment.noRecords} size="sm" bordered={false} />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t.equipment.serviceHistory}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {item.workOrders.length === 0 && (
            <EmptyState icon={ClipboardList} title={t.equipment.noWorkOrders} size="sm" bordered={false} />
          )}
          {item.workOrders.map((o) => (
            <Link
              key={o.id}
              href={`/work-orders/${o.id}`}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
            >
              <div>
                <span className="font-medium">{o.number}</span>{" "}
                <span className="text-muted-foreground">{o.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge status={o.status} />
                <span className="text-xs text-muted-foreground">
                  {new Date(o.updatedAt).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU")}
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
