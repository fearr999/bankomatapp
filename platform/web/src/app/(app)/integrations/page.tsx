"use client";

import { useEffect, useState } from "react";
import { Plug, Sheet, ExternalLink, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { apiFetch, getCurrentUser } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

interface GoogleSheetIntegration {
  id: string;
  spreadsheetUrl: string;
  sharedWithEmail: string;
  status: "active" | "error";
  lastSyncedAt: string | null;
}

interface StatusResponse {
  configured: boolean;
  integration: GoogleSheetIntegration | null;
}

function GoogleSheetsCard() {
  const { t, locale } = useLocale();
  const isAdmin = getCurrentUser()?.role === "ADMIN";
  const [data, setData] = useState<StatusResponse | null>(null);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setData(await apiFetch<StatusResponse>("/integrations/google-sheets"));
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function connect() {
    setBusy(true);
    setError(null);
    try {
      await apiFetch("/integrations/google-sheets/connect", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.googleSheets.connectError);
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    setBusy(true);
    try {
      await apiFetch("/integrations/google-sheets/disconnect", { method: "POST" });
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <Sheet size={16} className="text-muted-foreground" />
          {t.googleSheets.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{t.googleSheets.description}</p>

        {!data && <PageLoader className="p-0" />}

        {data && !data.configured && (
          <p className="flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-600">
            <AlertTriangle size={15} className="shrink-0" />
            {t.googleSheets.notConfigured}
          </p>
        )}

        {data && data.configured && !data.integration && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.googleSheets.emailPlaceholder}
              aria-label={t.googleSheets.emailLabel}
              disabled={!isAdmin || busy}
              className="sm:max-w-xs"
            />
            <Button onClick={connect} disabled={!isAdmin || busy || !email}>
              {busy ? t.googleSheets.connecting : t.googleSheets.connect}
            </Button>
          </div>
        )}
        {data && data.configured && !data.integration && !isAdmin && (
          <p className="text-xs text-muted-foreground">{t.googleSheets.adminOnly}</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {data?.integration && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600">
                {t.googleSheets.connected}
              </span>
              {data.integration.status === "error" && (
                <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-medium text-red-500">
                  {t.googleSheets.statusError}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {t.googleSheets.sharedWith}: <span className="text-foreground">{data.integration.sharedWithEmail}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {t.googleSheets.lastSync}:{" "}
              {data.integration.lastSyncedAt
                ? new Date(data.integration.lastSyncedAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")
                : t.googleSheets.neverSynced}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={data.integration.spreadsheetUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink size={14} /> {t.googleSheets.openSheet}
                </Button>
              </a>
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={disconnect} disabled={busy}>
                  {busy ? t.googleSheets.disconnecting : t.googleSheets.disconnect}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const { t } = useLocale();
  return (
    <div className="flex h-full animate-fade-in flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{t.nav.integrations}</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GoogleSheetsCard />
        <Card className="flex items-center justify-center">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <Plug className="text-muted-foreground" size={32} />
            <p className="max-w-md text-sm text-muted-foreground">
              Подключение Bitrix24, amoCRM, Odoo, ERPNext, карт (Google/OSM/Yandex), WhatsApp, Telegram, телефонии.
            </p>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              Модуль в разработке — следующий этап
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
