"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { teamColor } from "@/lib/team-colors";
import { useLocale } from "@/lib/i18n/context";

export interface TerritorySite {
  id: string;
  name: string;
  address: string | null;
  lat: number;
  lng: number;
  teamId: string | null;
  teamName: string | null;
}

function dot(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.25)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const TASHKENT_CENTER: [number, number] = [41.3111, 69.2797];

function DrawClickCapture({ onPoint }: { onPoint: (point: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onPoint([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function TerritoryMapView({
  sites,
  drawing,
  polygon,
  onPoint,
}: {
  sites: TerritorySite[];
  drawing: boolean;
  polygon: [number, number][];
  onPoint: (point: [number, number]) => void;
}) {
  const { t } = useLocale();
  return (
    <MapContainer
      center={TASHKENT_CENTER}
      zoom={12}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem", cursor: drawing ? "crosshair" : undefined }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {drawing && <DrawClickCapture onPoint={onPoint} />}
      {polygon.length > 0 && (
        <Polygon positions={polygon} pathOptions={{ color: "#0ea5e9", fillOpacity: 0.15 }} />
      )}
      {sites.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={dot(teamColor(s.teamId))}>
          <Popup>
            <b>{s.name}</b>
            {s.address && (
              <>
                <br />
                {s.address}
              </>
            )}
            <br />
            {s.teamName ? `${t.territories.team}: ${s.teamName}` : t.territories.noTeam}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
