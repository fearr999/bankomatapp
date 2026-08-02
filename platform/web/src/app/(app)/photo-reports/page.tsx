"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, User, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch, API_BASE } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

interface PhotoAttachment {
  id: string;
  url: string;
  lat: number | null;
  lng: number | null;
  createdAt: string;
  uploadedBy: { id: string; name: string } | null;
  workOrder: {
    id: string;
    number: string;
    title: string;
    site: { name: string; address: string | null } | null;
  };
}

export default function PhotoReportsPage() {
  const { t, locale } = useLocale();
  const [photos, setPhotos] = useState<PhotoAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<PhotoAttachment[]>("/attachments")
      .then(setPhotos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t.photoReports.title}</h1>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading && <PageLoader />}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {!loading && photos.map((p) => (
          <Card key={p.id} className="overflow-hidden p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${API_BASE}${p.url}`}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-square w-full bg-muted object-cover"
            />
            <CardContent className="flex flex-col gap-1 p-3 text-xs">
              <Link href={`/work-orders/${p.workOrder.id}`} className="font-medium hover:underline">
                {p.workOrder.number}
              </Link>
              <span className="text-muted-foreground">{p.workOrder.site?.name ?? p.workOrder.title}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <User size={11} /> {p.uploadedBy?.name ?? "—"}
              </span>
              {p.lat != null && p.lng != null && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin size={11} /> {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                </span>
              )}
              <span className="text-muted-foreground">
                {new Date(p.createdAt).toLocaleString(locale === "uz" ? "uz-UZ" : "ru-RU")}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && photos.length === 0 && (
        <EmptyState icon={Camera} title={t.photoReports.empty} description={t.photoReports.emptyDescription} />
      )}
    </div>
  );
}
