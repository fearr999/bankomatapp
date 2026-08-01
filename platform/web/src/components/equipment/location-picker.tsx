"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TASHKENT_CENTER: [number, number] = [41.3111, 69.2797];

const PIN_ICON = L.divIcon({
  className: "",
  html: `<div style="background:#ef4444;width:16px;height:16px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.25)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 16],
});

function ClickCapture({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function LocationPicker({
  lat,
  lng,
  onChange,
}: {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}) {
  return (
    <MapContainer
      center={lat != null && lng != null ? [lat, lng] : TASHKENT_CENTER}
      zoom={lat != null && lng != null ? 15 : 12}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem", cursor: "crosshair" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickCapture onPick={onChange} />
      {lat != null && lng != null && <Marker position={[lat, lng]} icon={PIN_ICON} />}
    </MapContainer>
  );
}
