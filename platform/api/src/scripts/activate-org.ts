import { prisma } from "../lib/prisma.js";

// Ручная активация оплатившей организации — вызывается владельцем платформы
// после того, как компания оплатила счёт. Снимает блокировку по истечении
// пробного периода (см. middleware/authenticate.ts), продления пробного
// периода это не даёт и не отменяет — это отдельный переключатель.
//
// Использование: npm run activate-org -- "название или часть названия"
//                npm run activate-org -- <organizationId>
//                npm run activate-org -- "название" --deactivate  (отменить)

async function main() {
  const args = process.argv.slice(2);
  const deactivate = args.includes("--deactivate");
  const query = args.filter((a) => a !== "--deactivate").join(" ").trim();

  if (!query) {
    console.error("Укажите название организации или её id: npm run activate-org -- <название|id>");
    process.exit(1);
  }

  const orgs = await prisma.organization.findMany({
    where: {
      parentOrganizationId: null, // верхнеуровневые тенанты — сабы подрядчиков не платят отдельно
      OR: [{ id: query }, { name: { contains: query, mode: "insensitive" } }],
    },
    select: { id: true, name: true, trialEndsAt: true, subscriptionActive: true },
  });

  if (orgs.length === 0) {
    console.error(`Организация не найдена: "${query}"`);
    process.exit(1);
  }
  if (orgs.length > 1) {
    console.error(`Найдено несколько организаций, уточните запрос:`);
    for (const o of orgs) console.error(`  ${o.id}  ${o.name}`);
    process.exit(1);
  }

  const org = orgs[0];
  const updated = await prisma.organization.update({
    where: { id: org.id },
    data: { subscriptionActive: !deactivate },
  });

  console.log(
    `${updated.name} (${updated.id}): subscriptionActive = ${updated.subscriptionActive}` +
      (deactivate ? "" : " — доступ разблокирован")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
