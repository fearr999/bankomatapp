"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapEmployee {
  id: string;
  name: string;
  status: string;
  lat: number;
  lng: number;
  currentOrder?: { number: string; title: string } | null;
}

export interface MapOrder {
  id: string;
  number: string;
  title: string;
  status: string;
  lat: number;
  lng: number;
}

// Leaflet-иконки строим через divIcon — не тянем внешние картинки маркеров,
// которые обычно ломаются со сборщиками (Next.js/webpack).
function dot(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.2)" title="${label}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const EMPLOYEE_ICON_ONLINE = dot("#22c55e", "online");
const EMPLOYEE_ICON_OFFLINE = dot("#71717a", "offline");
const ORDER_ICON = dot("#3b82f6", "order");

const TASHKENT_CENTER: [number, number] = [41.3111, 69.2797];

export function MapView({ employees, orders }: { employees: MapEmployee[]; orders: MapOrder[] }) {
  return (
    <MapContainer
      center={TASHKENT_CENTER}
      zoom={12}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {employees.map((e) => (
        <Marker
          key={e.id}
          position={[e.lat, e.lng]}
          icon={e.status === "online" ? EMPLOYEE_ICON_ONLINE : EMPLOYEE_ICON_OFFLINE}
        >
          <Popup>
            <b>{e.name}</b>
            <br />
            {e.status === "online" ? "На линии" : "Офлайн"}
            {e.currentOrder && (
              <>
                <br />
                Заявка: {e.currentOrder.number}
              </>
            )}
          </Popup>
        </Marker>
      ))}
      {orders.map((o) => (
        <Marker key={o.id} position={[o.lat, o.lng]} icon={ORDER_ICON}>
          <Popup>
            <b>{o.number}</b>
            <br />
            {o.title}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
