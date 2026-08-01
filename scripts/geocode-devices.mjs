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

// Узбекская адресация (махалли, кварталы, разнобой в написании районов) плохо
// ложится на прямой free-text запрос в Nominatim — с первого раза находится
// меньше четверти адресов. Поэтому пробуем цепочку всё более грубых вариантов
// и запоминаем, на каком уровне точности нашли совпадение.
// ВАЖНО: \w и \b в JS-регулярках понимают только ASCII, кириллицу не видят —
// границы слов вокруг русских токенов не срабатывают так, как для латиницы.
// Поэтому здесь везде литеральные совпадения без \b/\w.
const DISTRICT_FIXES = [
  [/шайхантохурский/gi, "Шайхантахурский"],
  [/шайхонтохурский/gi, "Шайхантахурский"],
  [/юнусобадский/gi, "Юнусабадский"],
  [/мирзо[\s-]?улугбекский/gi, "Мирзо-Улугбекский"],
];

function normalizeAddress(addr) {
  let s = addr;
  for (const [re, repl] of DISTRICT_FIXES) s = s.replace(re, repl);
  return s
    .replace(/г\.\s*Таш[кc]ент\.{0,2}/gi, "Ташкент")
    .replace(/р-н/gi, "район")
    // "Шайхантахурский районул.Укчи" — источник иногда склеивает район со
    // следующим словом без пробела/запятой.
    .replace(/район(?=[А-ЯЁа-яё])/g, "район ")
    .replace(/ул\.\s*/gi, "улица ")
    .replace(/просп\.\s*/gi, "проспект ")
    .replace(/д\.\s*(?=\d)/gi, "дом ")
    // "103 Б дом" / "8 \"Б\" дом" — номер иногда идёт ПЕРЕД словом "дом"
    // вместо обычного порядка "дом 103 Б".
    .replace(/["'«»]/g, "")
    .replace(/(\d+\s*[А-ЯЁ]?)\s+дом(?=[,\s]|$)/gi, "дом $1")
    .replace(/[\u200b\u00a0]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*$/g, "")
    .trim();
}

// Список — не только Ташкент: часть точек в Самарканде, Фергане, Намангане
// и других областных центрах. КРИТИЧНО подставлять в резервные варианты
// (poi/district) реальный город адреса, а не хардкодить "Ташкент" — иначе
// Nominatim радостно находит одноимённое заведение/микрорайон в Ташкенте
// вместо настоящего города, и точка улетает за сотни километров молча.
const KNOWN_CITIES = [
  "Алмалык", "Ангрен", "Андижан", "Асака", "Ахангаран", "Бекабад", "Бука",
  "Бухара", "Газалкент", "Гулистан", "Гулистон", "Джизак", "Каган", "Карши",
  "Келес", "Кибрай", "Коканд", "Маргилан", "Навои", "Наманган", "Нукус",
  "Нурафшан", "Нурафшон", "Самарканд", "Термез", "Ургенч", "Фергана", "Хива",
  "Чирчик", "Янгиюль",
].sort((a, b) => b.length - a.length);

function extractCity(address) {
  for (const city of KNOWN_CITIES) {
    if (address.includes(city)) return city;
  }
  return "Ташкент";
}

// Возвращает список вариантов запроса от самого точного к самому грубому,
// вместе с меткой точности результата, если этот вариант сработает.
function addressVariants(entry) {
  const variants = [];
  const norm = normalizeAddress(entry.address);
  variants.push({ q: norm, precision: "exact" });
  const city = extractCity(entry.address);

  const parts = norm
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // Постепенно отбрасываем самые детальные хвосты (дом, квартал и т.п.),
  // оставляя как минимум "город, улица" (было >=3 — то есть для простых
  // адресов вида "город, улица, дом" — ровно 3 части — эта ветка вообще
  // не срабатывала, и после неудачного точного совпадения сразу летели
  // в ненадёжный poi/district, хотя "город, улица" без номера дома часто
  // находится).
  for (let keep = parts.length - 1; keep >= 2; keep--) {
    variants.push({ q: parts.slice(0, keep).join(", "), precision: "street" });
  }

  if (entry.place && entry.place.trim()) {
    variants.push({ q: `${entry.place.trim()}, ${city}, Узбекистан`, precision: "poi" });
  }

  const district = parts.find((p) => /район/i.test(p));
  if (district) {
    variants.push({ q: `${district}, ${city}, Узбекистан`, precision: "district" });
  }

  return variants;
}

async function geocodeOnce(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=uz&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();
  if (!data.length) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon), displayName: data[0].display_name };
}

// Второй бесплатный геокодер (без API-ключа) — komoot/Photon. Использует
// другой поисковый движок (Elasticsearch с опечатко-устойчивым поиском)
// поверх во многом той же базы OSM, но с другой токенизацией — иногда
// находит то, что не находит Nominatim, и наоборот. Пробуем последним
// резервным вариантом, когда вся цепочка Nominatim не сработала.
async function geocodePhoton(query) {
  const url = `https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Photon HTTP ${res.status}`);
  const data = await res.json();
  const feat = data.features && data.features[0];
  if (!feat) return null;
  const [lon, lat] = feat.geometry.coordinates;
  return { lat: Number(lat), lng: Number(lon) };
}

// Короткие ссылки вида yandex.uz/maps/-/XXXXX редиректят на страницу с
// координатами в query-параметре ll=lon,lat (порядок обратный обычному
// lat,lng!) или whatshere[point]=lon,lat. Резолвим редирект и вытаскиваем
// координаты регуляркой — это точнее, чем угадывать адрес через Nominatim.
async function resolveYandexLink(shortUrl) {
  const res = await fetch(shortUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CorpiFSM-OneOffImport/1.0)" },
    redirect: "follow",
  });
  const finalUrl = res.url || shortUrl;
  // Тело страницы тоже не читаем — достаточно конечного URL, но на всякий
  // случай сливаем body чтобы не оставлять сокет открытым.
  await res.text().catch(() => {});
  const match = finalUrl.match(/[?&](?:ll|whatshere%5Bpoint%5D|whatshere\[point\])=([\d.]+)%2C([\d.]+)|[?&](?:ll|whatshere\[point\])=([\d.]+),([\d.]+)/);
  if (!match) return null;
  const lon = Number(match[1] ?? match[3]);
  const lat = Number(match[2] ?? match[4]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lng: lon };
}

function sqlEscape(v) {
  if (v === null || v === undefined) return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`;
}

async function main() {
  // GEOCODE_FILE ограничивает запуск одним файлом данных (например, только
  // новыми картоматами), чтобы не гонять повторно уже обработанные адреса.
  const onlyFile = process.env.GEOCODE_FILE;
  const files = readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !onlyFile || f === onlyFile);
  const results = [];
  const notFound = [];

  for (const file of files) {
    const entries = JSON.parse(readFileSync(path.join(DATA_DIR, file), "utf-8"));
    for (const entry of entries) {
      let geo = null;
      let precision = null;
      let usedQuery = null;

      if (entry.yandexUrl) {
        process.stdout.write(`Геокодирую ${entry.code} (yandex-link) — ${entry.yandexUrl} ... `);
        try {
          geo = await resolveYandexLink(entry.yandexUrl);
        } catch (e) {
          console.log("ошибка запроса:", e.message);
          geo = null;
        }
        if (geo) {
          precision = "yandex-link";
          usedQuery = entry.yandexUrl;
          console.log(`${geo.lat}, ${geo.lng}`);
        } else {
          console.log("не распознано, пробую адрес");
        }
      }

      const variants = geo ? [] : addressVariants(entry);
      for (const variant of variants) {
        process.stdout.write(`Геокодирую ${entry.code} (${variant.precision}) — ${variant.q} ... `);
        try {
          geo = await geocodeOnce(variant.q);
        } catch (e) {
          console.log("ошибка запроса:", e.message);
          geo = null;
        }
        // Nominatim usage policy: не чаще 1 запроса в секунду.
        await new Promise((r) => setTimeout(r, 1100));
        if (geo) {
          precision = variant.precision;
          usedQuery = variant.q;
          console.log(`${geo.lat}, ${geo.lng}`);
          break;
        }
        console.log("нет совпадения");
      }

      // Nominatim ничего не нашёл вообще ни на одном уровне — пробуем Photon
      // (другой бесплатный геокодер без ключа, другая поисковая база).
      if (!geo) {
        const photonQueries = [normalizeAddress(entry.address)];
        if (entry.place && entry.place.trim()) {
          photonQueries.push(`${entry.place.trim()}, ${extractCity(entry.address)}, Узбекистан`);
        }
        for (const q of photonQueries) {
          process.stdout.write(`Геокодирую ${entry.code} (photon) — ${q} ... `);
          try {
            geo = await geocodePhoton(q);
          } catch (e) {
            console.log("ошибка запроса:", e.message);
            geo = null;
          }
          await new Promise((r) => setTimeout(r, 1100));
          if (geo) {
            precision = "photon";
            usedQuery = q;
            console.log(`${geo.lat}, ${geo.lng}`);
            break;
          }
          console.log("нет совпадения");
        }
      }

      if (!geo) {
        notFound.push(entry);
        continue;
      }
      results.push({ ...entry, lat: geo.lat, lng: geo.lng, precision, matchedQuery: usedQuery });
    }
  }

  writeFileSync(path.join(OUT_DIR, "geocoded.json"), JSON.stringify(results, null, 2));
  writeFileSync(path.join(OUT_DIR, "not-found.json"), JSON.stringify(notFound, null, 2));

  const sqlLines = [
    "-- Автосгенерировано scripts/geocode-devices.mjs — точки банкоматов/картоматов.",
    "-- 1) Сначала выполните этот запрос и найдите id вашей организации:",
    '--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;',
    "-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id (текстовый поиск-замена) и выполните файл целиком.",
    "BEGIN;",
    "",
  ];

  let approxCount = 0;
  for (const r of results) {
    const deviceLabel = r.deviceType === "cardomat" ? "Картомат" : "Банкомат";
    const siteName = r.place && r.place.trim() ? r.place.trim() : `${deviceLabel} ${r.code}`;
    const siteId = `site_${randomUUID()}`;
    const equipmentId = `eq_${randomUUID()}`;
    // "poi" — нечёткий поиск по названию заведения — тоже ненадёжен: на
    // практике так же уводит на совпадение по имени в другом городе (см.
    // историю коммитов), не только "district".
    const isApprox = r.precision === "district" || r.precision === "poi" || r.precision === "photon";
    if (isApprox) approxCount++;
    const notes = isApprox
      ? `ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную`
      : null;
    sqlLines.push(
      `INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ` +
        `(${sqlEscape(siteId)}, ${sqlEscape(siteName)}, ${sqlEscape(r.address)}, ${r.lat}, ${r.lng}, 'ORG_ID_HERE', now());`
    );
    sqlLines.push(
      `INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ` +
        `(${sqlEscape(equipmentId)}, ${sqlEscape(`${deviceLabel} ${r.code}`)}, ${sqlEscape(r.code)}, 'operational', ${sqlEscape(r.deviceType)}, ${sqlEscape(siteId)}, 'ORG_ID_HERE', ${sqlEscape(notes)}, now());`
    );
    sqlLines.push("");
  }

  sqlLines.push("COMMIT;");

  writeFileSync(path.join(OUT_DIR, "import.sql"), sqlLines.join("\n"));

  console.log(
    `\nГотово: ${results.length} найдено (из них ${approxCount} приблизительно, по центру района), ${notFound.length} не найдено.`
  );
}

main();
