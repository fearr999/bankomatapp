import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import { hashPassword } from "./lib/auth.js";

async function main() {
  const passwordHash = await hashPassword("password123");

  const admin = await prisma.user.upsert({
    where: { email: "admin@fsm.local" },
    update: {},
    create: {
      email: "admin@fsm.local",
      name: "Админ Админов",
      role: "ADMIN",
      status: "online",
      passwordHash,
    },
  });

  const dispatcher = await prisma.user.upsert({
    where: { email: "dispatcher@fsm.local" },
    update: {},
    create: {
      email: "dispatcher@fsm.local",
      name: "Диспетчер Иванова",
      role: "DISPATCHER",
      status: "online",
      passwordHash,
    },
  });

  const worker = await prisma.user.upsert({
    where: { email: "worker@fsm.local" },
    update: {},
    create: {
      email: "worker@fsm.local",
      name: "Инженер Петров",
      role: "WORKER",
      specialization: "Обслуживание банкоматов",
      status: "online",
      lat: 41.311,
      lng: 69.279,
      locationUpdatedAt: new Date(),
      passwordHash,
    },
  });

  const worker2 = await prisma.user.upsert({
    where: { email: "worker2@fsm.local" },
    update: {},
    create: {
      email: "worker2@fsm.local",
      name: "Инженер Сидоров",
      role: "WORKER",
      specialization: "Обслуживание картоматов",
      status: "offline",
      lat: 41.334,
      lng: 69.29,
      locationUpdatedAt: new Date(Date.now() - 1000 * 60 * 90),
      passwordHash,
    },
  });

  const client = await prisma.client.upsert({
    where: { id: "seed-client-1" },
    update: {},
    create: { id: "seed-client-1", name: "ООО Клиент Плюс", phone: "+998900000000" },
  });

  const site = await prisma.site.upsert({
    where: { id: "seed-site-1" },
    update: {},
    create: {
      id: "seed-site-1",
      name: 'Банкомат ТЦ "Мега"',
      address: "г. Ташкент, пр. Мега 5",
      lat: 41.32,
      lng: 69.25,
      clientId: client.id,
    },
  });

  const existing = await prisma.workOrder.count();
  if (existing === 0) {
    await prisma.workOrder.create({
      data: {
        number: "WO-2026-00001",
        title: "Плановое обслуживание банкомата",
        description: "Чистка картоприёмника, проверка купюроприёмника",
        status: "NEW",
        clientId: client.id,
        siteId: site.id,
        createdById: admin.id,
        events: { create: { type: "created", message: "Заявка создана (seed)", userId: admin.id } },
      },
    });
  }

  console.log("Сид готов. Логины (пароль для всех: password123):");
  console.log(`  ${admin.email} — ADMIN`);
  console.log(`  ${dispatcher.email} — DISPATCHER`);
  console.log(`  ${worker.email} — WORKER`);
  console.log(`  ${worker2.email} — WORKER`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
