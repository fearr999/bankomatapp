// Одноразовый скрипт: геокодирует список банкоматов/картоматов (адрес -> lat/lng)
// через Nominatim (OpenStreetMap) и генерирует готовый SQL для ручного запуска
// в консоли Postgres на Railway. Не трогает никакую БД сам — только читает JSON
// с адресами из scripts/data/*.json и пишет SQL в scripts/out/.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const OUT_DIR = path.join(__dirname, "out");
mkdirSync(OUT_DIR, { recursive: true });

const USER_AGENT = "CorpiFSM-OneOffImport/1.0 (internal data import script)";

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=uz&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();
  if (!data.length) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon), displayName: data[0].display_name };
}

function sqlEscape(v) {
  if (v === null || v === undefined) return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`;
}

async function main() {
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  const results = [];
  const notFound = [];

  for (const file of files) {
    const entries = JSON.parse(readFileSync(path.join(DATA_DIR, file), "utf-8"));
    for (const entry of entries) {
      process.stdout.write(`Геокодирую ${entry.code} — ${entry.address} ... `);
      let geo = null;
      try {
        geo = await geocode(entry.address);
      } catch (e) {
        console.log("ошибка запроса:", e.message);
      }
      // Nominatim usage policy: не чаще 1 запроса в секунду.
      await new Promise((r) => setTimeout(r, 1100));
      if (!geo) {
        console.log("НЕ НАЙДЕНО");
        notFound.push(entry);
        continue;
      }
      console.log(`${geo.lat}, ${geo.lng}`);
      results.push({ ...entry, lat: geo.lat, lng: geo.lng });
    }
  }

  writeFileSync(path.join(OUT_DIR, "geocoded.json"), JSON.stringify(results, null, 2));
  writeFileSync(path.join(OUT_DIR, "not-found.json"), JSON.stringify(notFound, null, 2));

  const sqlLines = [
    "-- Автосгенерировано scripts/geocode-devices.mjs — точки банкоматов/картоматов бригады А.",
    "-- 1) Сначала выполните этот запрос и найдите id вашей организации:",
    '--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;',
    "-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id (текстовый поиск-замена) и выполните файл целиком.",
    "BEGIN;",
    "",
  ];

  for (const r of results) {
    const deviceLabel = r.deviceType === "cardomat" ? "Картомат" : "Банкомат";
    const siteName = r.place && r.place.trim() ? r.place.trim() : `${deviceLabel} ${r.code}`;
    const siteId = `site_${randomUUID()}`;
    const equipmentId = `eq_${randomUUID()}`;
    sqlLines.push(
      `INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ` +
        `(${sqlEscape(siteId)}, ${sqlEscape(siteName)}, ${sqlEscape(r.address)}, ${r.lat}, ${r.lng}, 'ORG_ID_HERE', now());`
    );
    sqlLines.push(
      `INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ` +
        `(${sqlEscape(equipmentId)}, ${sqlEscape(`${deviceLabel} ${r.code}`)}, ${sqlEscape(r.code)}, 'operational', ${sqlEscape(r.deviceType)}, ${sqlEscape(siteId)}, 'ORG_ID_HERE', ${sqlEscape("Бригада А")}, now());`
    );
    sqlLines.push("");
  }

  sqlLines.push("COMMIT;");

  writeFileSync(path.join(OUT_DIR, "import.sql"), sqlLines.join("\n"));

  console.log(`\nГотово: ${results.length} найдено, ${notFound.length} не найдено.`);
}

main();
