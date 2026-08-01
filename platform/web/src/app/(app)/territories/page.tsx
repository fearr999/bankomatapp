"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { teamColor } from "@/lib/team-colors";
import type { TerritorySite } from "@/components/territories/territory-map-view";

const TerritoryMapView = dynamic(
  () => import("@/components/territories/territory-map-view").then((m) => m.TerritoryMapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Загрузка карты...
      </div>
    ),
  }
);

interface SiteApi {
  id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  team: { id: string; name: string } | null;
}

interface TeamApi {
  id: string;
  name: string;
}

type Tab = "list" | "map";

export default function TerritoriesPage() {
  const [tab, setTab] = useState<Tab>("list");
  const [sites, setSites] = useState<SiteApi[]>([]);
  const [teams, setTeams] = useState<TeamApi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Список: фильтр + выбор
  const [filterTeamId, setFilterTeamId] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkTeamId, setBulkTeamId] = useState<string>("");

  // Карта: рисование зоны
  const [drawing, setDrawing] = useState(false);
  const [polygon, setPolygon] = useState<[number, number][]>([]);
  const [zoneTeamId, setZoneTeamId] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function load() {
    setLoading(true);
    Promise.all([apiFetch<SiteApi[]>("/sites"), apiFetch<TeamApi[]>("/teams")])
      .then(([s, t]) => {
        setSites(s);
        setTeams(t);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const filteredSites = useMemo(() => {
    if (filterTeamId === "all") return sites;
    if (filterTeamId === "none") return sites.filter((s) => !s.team);
    return sites.filter((s) => s.team?.id === filterTeamId);
  }, [sites, filterTeamId]);

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === filteredSites.length ? new Set() : new Set(filteredSites.map((s) => s.id))
    );
  }

  async function quickReassign(siteId: string, teamId: string) {
    setStatus(null);
    try {
      await apiFetch<{ updated: number }>("/sites/assign-team", {
        method: "PATCH",
        body: JSON.stringify({ siteIds: [siteId], teamId: teamId || null }),
      });
      setSites((prev) =>
        prev.map((s) => (s.id === siteId ? { ...s, team: teams.find((t) => t.id === teamId) ?? null } : s))
      );
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Ошибка назначения");
    }
  }

  async function applyBulkAssign() {
    if (!selected.size) return;
    setBusy(true);
    setStatus(null);
    try {
      const teamId = bulkTeamId || null;
      const result = await apiFetch<{ updated: number }>("/sites/assign-team", {
        method: "PATCH",
        body: JSON.stringify({ siteIds: Array.from(selected), teamId }),
      });
      setStatus(`Назначено объектов: ${result.updated}`);
      setSelected(new Set());
      load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Ошибка назначения");
    } finally {
      setBusy(false);
    }
  }

  function handleMapPoint(point: [number, number]) {
    setPolygon((prev) => [...prev, point]);
  }

  function startDrawing() {
    setPolygon([]);
    setDrawing(true);
    setStatus(null);
  }

  function cancelDrawing() {
    setDrawing(false);
    setPolygon([]);
  }

  async function finishDrawing() {
    if (polygon.length < 3) {
      setStatus("Отметьте на карте минимум 3 точки зоны");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const teamId = zoneTeamId || null;
      const result = await apiFetch<{ updated: number }>("/sites/assign-zone", {
        method: "PATCH",
        body: JSON.stringify({ polygon, teamId }),
      });
      setStatus(`В зоне найдено и назначено объектов: ${result.updated}`);
      setDrawing(false);
      setPolygon([]);
      load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Ошибка назначения по зоне");
    } finally {
      setBusy(false);
    }
  }

  const mapSites: TerritorySite[] = sites
    .filter((s) => s.lat != null && s.lng != null)
    .map((s) => ({
      id: s.id,
      name: s.name,
      address: s.address,
      lat: s.lat as number,
      lng: s.lng as number,
      teamId: s.team?.id ?? null,
      teamName: s.team?.name ?? null,
    }));

  return (
    <div className="flex h-[calc(100vh-6.5rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Территории</h1>
          <p className="text-sm text-muted-foreground">
            Постоянная привязка объектов/устройств к бригадам — списком или зоной на карте.
          </p>
        </div>
        <div className="flex gap-2 rounded-md border p-1">
          <button
            onClick={() => setTab("list")}
            className={`rounded px-3 py-1.5 text-sm ${tab === "list" ? "bg-primary text-primary-foreground" : ""}`}
          >
            Список
          </button>
          <button
            onClick={() => setTab("map")}
            className={`rounded px-3 py-1.5 text-sm ${tab === "map" ? "bg-primary text-primary-foreground" : ""}`}
          >
            Карта
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {status && <p className="text-sm text-muted-foreground">{status}</p>}

      {tab === "list" && (
        <Card className="flex-1 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>Объекты ({filteredSites.length})</CardTitle>
            <div className="flex items-center gap-2">
              <select
                className="h-9 rounded-md border bg-transparent px-2 text-sm"
                value={filterTeamId}
                onChange={(e) => setFilterTeamId(e.target.value)}
              >
                <option value="all">Все бригады</option>
                <option value="none">Без бригады</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <select
                className="h-9 rounded-md border bg-transparent px-2 text-sm"
                value={bulkTeamId}
                onChange={(e) => setBulkTeamId(e.target.value)}
              >
                <option value="">Снять бригаду</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <Button size="sm" disabled={!selected.size || busy} onClick={applyBulkAssign}>
                Назначить выбранным ({selected.size})
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100%-4.5rem)] overflow-y-auto p-0">
            {loading ? (
              <p className="p-5 text-sm text-muted-foreground">Загрузка...</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="w-10 p-3">
                      <input
                        type="checkbox"
                        checked={selected.size > 0 && selected.size === filteredSites.length}
                        onChange={toggleAll}
                      />
                    </th>
                    <th className="p-3">Объект</th>
                    <th className="p-3">Адрес</th>
                    <th className="p-3">Бригада</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map((s) => (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selected.has(s.id)}
                          onChange={() => toggleSelected(s.id)}
                        />
                      </td>
                      <td className="p-3 font-medium">{s.name}</td>
                      <td className="p-3 text-muted-foreground">{s.address ?? "—"}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: teamColor(s.team?.id ?? null) }}
                          />
                          <select
                            className="h-8 rounded-md border bg-transparent px-1.5 text-sm"
                            value={s.team?.id ?? ""}
                            onChange={(e) => quickReassign(s.id, e.target.value)}
                          >
                            <option value="">без бригады</option>
                            {teams.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSites.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-5 text-center text-muted-foreground">
                        Объектов не найдено
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "map" && (
        <div className="flex flex-1 flex-col gap-3 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            {!drawing ? (
              <Button size="sm" onClick={startDrawing}>
                Нарисовать зону
              </Button>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">
                  Кликайте по карте, чтобы отметить точки зоны ({polygon.length})
                </span>
                <select
                  className="h-9 rounded-md border bg-transparent px-2 text-sm"
                  value={zoneTeamId}
                  onChange={(e) => setZoneTeamId(e.target.value)}
                >
                  <option value="">Снять бригаду</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <Button size="sm" disabled={busy || polygon.length < 3} onClick={finishDrawing}>
                  Завершить и назначить
                </Button>
                <Button size="sm" variant="outline" disabled={busy} onClick={cancelDrawing}>
                  Отмена
                </Button>
              </>
            )}
            <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {teams.map((t) => (
                <span key={t.id} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: teamColor(t.id) }} />
                  {t.name}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: teamColor(null) }} />
                без бригады
              </span>
            </div>
          </div>
          <Card className="flex-1 overflow-hidden p-0">
            <TerritoryMapView sites={mapSites} drawing={drawing} polygon={polygon} onPoint={handleMapPoint} />
          </Card>
        </div>
      )}
    </div>
  );
}
