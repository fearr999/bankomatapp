"use client";

import { useEffect, useState } from "react";
import { FileDown, FileSpreadsheet, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch, API_BASE, getToken } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

interface CleaningSummaryRow {
  equipmentId: string;
  name: string;
  deviceType: string;
  siteName: string | null;
  count: number;
  dates: string[];
}

interface CleaningSummaryResponse {
  from: string;
  to: string;
  rows: CleaningSummaryRow[];
}

function currentMonthRange() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { from: fmt(from), to: fmt(to) };
}

export default function ReportsPage() {
  const { t, locale } = useLocale();
  const defaultRange = currentMonthRange();
  const [from, setFrom] = useState(defaultRange.from);
  const [to, setTo] = useState(defaultRange.to);
  const [data, setData] = useState<CleaningSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<CleaningSummaryResponse>(
        `/reports/cleaning-summary?from=${from}&to=${to}`
      );
      setData(res);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function download(kind: "xlsx" | "pdf") {
    const res = await fetch(`${API_BASE}/reports/cleaning-summary.${kind}?from=${from}&to=${to}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaning-report-${from}_${to}.${kind}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const deviceLabel = (type: string) =>
    type === "atm" ? t.reports.deviceAtm : type === "cardomat" ? t.reports.deviceCardomat : type;

  const dateFmt = (iso: string) => new Date(iso).toLocaleDateString(locale === "uz" ? "uz-UZ" : "ru-RU");

  const totalCleanings = data?.rows.reduce((sum, r) => sum + r.count, 0) ?? 0;
  const zeroCount = data?.rows.filter((r) => r.count === 0).length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.reports.title}</h1>
        <p className="text-sm text-muted-foreground">{t.reports.subtitle}</p>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 pt-5">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">{t.reports.from}</label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-40" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">{t.reports.to}</label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-40" />
          </div>
          <Button onClick={load}>{t.reports.apply}</Button>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={() => download("xlsx")}>
              <FileSpreadsheet size={16} /> {t.reports.downloadExcel}
            </Button>
            <Button variant="outline" onClick={() => download("pdf")}>
              <FileDown size={16} /> {t.reports.downloadPdf}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && <PageLoader />}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && data && (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-5">
                <p className="text-2xl font-semibold tracking-tight">{data.rows.length}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.reports.equipment}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-2xl font-semibold tracking-tight">{totalCleanings}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.reports.totalCleanings}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className={`text-2xl font-semibold tracking-tight ${zeroCount > 0 ? "text-red-500" : ""}`}>
                  {zeroCount}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.reports.zeroCleanings}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.reports.title}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              {data.rows.length === 0 ? (
                <EmptyState icon={Landmark} title={t.reports.noData} className="py-10" />
              ) : (
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="px-4 py-2 font-medium">{t.reports.equipment}</th>
                      <th className="px-4 py-2 font-medium">{t.reports.site}</th>
                      <th className="px-4 py-2 font-medium">{t.reports.deviceType}</th>
                      <th className="px-4 py-2 font-medium">{t.reports.count}</th>
                      <th className="px-4 py-2 font-medium">{t.reports.dates}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((r) => (
                      <tr key={r.equipmentId} className={`border-b last:border-0 ${r.count === 0 ? "bg-red-500/5" : ""}`}>
                        <td className="px-4 py-2 font-medium">{r.name}</td>
                        <td className="px-4 py-2 text-muted-foreground">{r.siteName ?? "—"}</td>
                        <td className="px-4 py-2 text-muted-foreground">{deviceLabel(r.deviceType)}</td>
                        <td className={`px-4 py-2 ${r.count === 0 ? "text-red-500" : ""}`}>{r.count}</td>
                        <td className="px-4 py-2 text-xs text-muted-foreground">
                          {r.dates.length ? r.dates.map(dateFmt).join(", ") : t.reports.noDates}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
