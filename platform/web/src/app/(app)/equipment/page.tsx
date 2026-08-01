"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { apiFetch } from "@/lib/api";

const LocationPicker = dynamic(
  () => import("@/components/equipment/location-picker").then((m) => m.LocationPicker),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full animate-fade-in items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 size={15} className="animate-spin" />
        Загрузка карты...
      </div>
    ),
  }
);

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [deviceType, setDeviceType] = useState("other");
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      setItems(await apiFetch<EquipmentRow[]>("/equipment"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let siteId: string | undefined;
      // Точка на карте/адрес указаны — сначала создаём объект (Site), потом
      // оборудование привязываем к нему. Без точки оборудование создаётся
      // само по себе, как и раньше (для складского/немаршрутного инвентаря).
      if (address.trim() || (lat != null && lng != null)) {
        const site = await apiFetch<{ id: string }>("/sites", {
          method: "POST",
          body: JSON.stringify({
            name: name || address || "Новый объект",
            address: address || undefined,
            lat: lat ?? undefined,
            lng: lng ?? undefined,
          }),
        });
        siteId = site.id;
      }
      await apiFetch("/equipment", {
        method: "POST",
        body: JSON.stringify({ name, model, serialNumber, deviceType, siteId }),
      });
      setName("");
      setModel("");
      setSerialNumber("");
      setAddress("");
      setLat(null);
      setLng(null);
      setShowMap(false);
      setShowCreate(false);
      await load();
    } finally {
      setSaving(false);
    }
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
          <CardContent className="flex flex-col gap-3 pt-5">
            <form onSubmit={create} className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-end">
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
                <div className="w-40">
                  <label className="mb-1 block text-xs text-muted-foreground">Тип</label>
                  <select
                    className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                  >
                    <option value="other">Другое</option>
                    <option value="atm">Банкомат</option>
                    <option value="cardomat">Картомат</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-muted-foreground">
                    Адрес объекта (необязательно)
                  </label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="г. Ташкент, ..."
                  />
                </div>
                <Button type="button" variant="outline" onClick={() => setShowMap((v) => !v)}>
                  {showMap ? "Скрыть карту" : "Указать точку на карте"}
                </Button>
                <Button type="submit" disabled={saving}>
                  Добавить
                </Button>
              </div>

              {showMap && (
                <div className="flex flex-col gap-1.5">
                  <div className="h-72 overflow-hidden rounded-md border">
                    <LocationPicker lat={lat} lng={lng} onChange={(la, ln) => { setLat(la); setLng(ln); }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lat != null && lng != null
                      ? `Точка выбрана: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
                      : "Кликните по карте, чтобы поставить точку"}
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <PageLoader />
      ) : (
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
      )}
    </div>
  );
}
