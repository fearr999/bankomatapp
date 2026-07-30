"use client";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "./api";

export interface GeoState {
  status: "idle" | "watching" | "denied" | "unsupported";
  lastSyncAt: Date | null;
  lastCoords: { lat: number; lng: number } | null;
  error: string | null;
}

const SYNC_INTERVAL_MS = 30_000;

/** Пока страница открыта — раз в 30с шлём геопозицию на /users/me/location (GPS check-in из ТЗ). */
export function useGeoCheckin(enabled: boolean) {
  const [state, setState] = useState<GeoState>({
    status: "idle",
    lastSyncAt: null,
    lastCoords: null,
    error: null,
  });
  const lastSentRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState((s) => ({ ...s, status: "unsupported" }));
      return;
    }

    const send = (lat: number, lng: number) => {
      const now = Date.now();
      if (now - lastSentRef.current < SYNC_INTERVAL_MS) return;
      lastSentRef.current = now;
      apiFetch("/users/me/location", { method: "POST", body: JSON.stringify({ lat, lng }) })
        .then(() => setState((s) => ({ ...s, lastSyncAt: new Date(), error: null })))
        .catch((err) => setState((s) => ({ ...s, error: String(err.message ?? err) })));
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setState((s) => ({ ...s, status: "watching", lastCoords: coords }));
        send(coords.lat, coords.lng);
      },
      (err) => setState((s) => ({ ...s, status: "denied", error: err.message })),
      { enableHighAccuracy: true, maximumAge: 15_000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return state;
}
