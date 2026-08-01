// Одноразовый скрипт: назначает Site.teamId для устройств из scripts/data/
// brigades-tashkent.json (коды ATM/картоматов по бригадам А/B/C — из
// скриншотов внешнего трекера уборки). Подключается к боевой Postgres
// напрямую через DATABASE_URL (запускается в GitHub Actions, не в песочнице
// агента — см. другие workflow_dispatch job'ы в этом репозитории).
import pg from "pg";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const data = JSON.parse(readFileSync(path.join(__dirname, "data", "brigades-tashkent.json"), "utf-8"));

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const orgRes = await client.query(
  'SELECT id FROM "Organization" WHERE "parentOrganizationId" IS NULL ORDER BY "createdAt" ASC'
);
if (orgRes.rows.length !== 1) {
  console.error(`Ожидалась ровно 1 организация верхнего уровня, найдено ${orgRes.rows.length}. Прерываю.`);
  process.exit(1);
}
const organizationId = orgRes.rows[0].id;

let grandMatched = 0;
let grandMissing = 0;

for (const [teamName, groups] of Object.entries(data)) {
  let teamRes = await client.query('SELECT id FROM "Team" WHERE name = $1 AND "organizationId" = $2', [
    teamName,
    organizationId,
  ]);
  let teamId;
  if (teamRes.rows.length) {
    teamId = teamRes.rows[0].id;
  } else {
    const newId = `team_${randomUUID()}`;
    await client.query(
      'INSERT INTO "Team" (id, name, "organizationId", "createdAt") VALUES ($1, $2, $3, now())',
      [newId, teamName, organizationId]
    );
    teamId = newId;
  }

  let matched = 0;
  const missing = [];

  for (const code of groups.atm) {
    const r = await client.query(
      'SELECT "siteId" FROM "Equipment" WHERE "serialNumber" = $1 AND "organizationId" = $2 AND "deviceType" = $3',
      [code, organizationId, "atm"]
    );
    if (r.rows.length && r.rows[0].siteId) {
      await client.query('UPDATE "Site" SET "teamId" = $1 WHERE id = $2', [teamId, r.rows[0].siteId]);
      matched++;
    } else {
      missing.push(`ATM ${code}`);
    }
  }

  for (const code of groups.cardomat) {
    const serial = `MS${code}`;
    const r = await client.query(
      'SELECT "siteId" FROM "Equipment" WHERE "serialNumber" = $1 AND "organizationId" = $2 AND "deviceType" = $3',
      [serial, organizationId, "cardomat"]
    );
    if (r.rows.length && r.rows[0].siteId) {
      await client.query('UPDATE "Site" SET "teamId" = $1 WHERE id = $2', [teamId, r.rows[0].siteId]);
      matched++;
    } else {
      missing.push(`КАРТ ${code}`);
    }
  }

  const total = groups.atm.length + groups.cardomat.length;
  console.log(`\n${teamName}: назначено ${matched}/${total}`);
  if (missing.length) {
    console.log(`  не найдено в базе (${missing.length}): ${missing.join(", ")}`);
  }
  grandMatched += matched;
  grandMissing += missing.length;
}

console.log(`\nИТОГО: назначено ${grandMatched}, не найдено в базе ${grandMissing}`);

await client.end();
