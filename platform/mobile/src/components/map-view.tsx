"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Иконки через divIcon — без внешних картинок маркеров, которые обычно
// ломаются со сборщиками (Next.js/webpack) и в статическом экспорте Capacitor.
function dot(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.2)" title="${label}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

const MY_ICON = dot("#3b82f6", "я");
const SITE_ICON = dot("#a855f7", "объект");

const TASHKENT_CENTER: [number, number] = [41.3111, 69.2797];

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 15);
      return;
    }
    map.fitBounds(points, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

export function MyRouteMap({
  myPosition,
  site,
}: {
  myPosition?: { lat: number; lng: number } | null;
  site?: { lat: number; lng: number; label: string } | null;
}) {
  const points: [number, number][] = [];
  if (myPosition) points.push([myPosition.lat, myPosition.lng]);
  if (site) points.push([site.lat, site.lng]);

  return (
    <MapContainer center={TASHKENT_CENTER} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {myPosition && (
        <Marker position={[myPosition.lat, myPosition.lng]} icon={MY_ICON}>
          <Popup>Моё местоположение</Popup>
        </Marker>
      )}
      {site && (
        <Marker position={[site.lat, site.lng]} icon={SITE_ICON}>
          <Popup>{site.label}</Popup>
        </Marker>
      )}
      <FitBounds points={points} />
    </MapContainer>
  );
}
