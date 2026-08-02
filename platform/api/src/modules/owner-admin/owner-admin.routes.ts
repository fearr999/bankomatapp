import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { requireOwnerSecret } from "../../middleware/owner-admin.js";

export const ownerAdminRouter = Router();
ownerAdminRouter.use(requireOwnerSecret);

function subscriptionView(org: { trialEndsAt: Date | null; subscriptionActive: boolean }) {
  const daysLeft = org.trialEndsAt
    ? Math.max(0, Math.ceil((org.trialEndsAt.getTime() - Date.now()) / 86_400_000))
    : null;
  const expired = !org.subscriptionActive && !!org.trialEndsAt && org.trialEndsAt < new Date();
  return { daysLeft, expired };
}

/// Только верхнеуровневые тенанты (не подрядчики внутри чужого банка) —
/// подписка платится организацией целиком, сабы её не платят отдельно.
ownerAdminRouter.get("/organizations", async (_req, res) => {
  const orgs = await prisma.organization.findMany({
    where: { parentOrganizationId: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      createdAt: true,
      trialEndsAt: true,
      subscriptionActive: true,
      _count: { select: { users: true, workOrders: true } },
    },
  });

  res.json(
    orgs.map((org) => ({
      id: org.id,
      name: org.name,
      createdAt: org.createdAt,
      trialEndsAt: org.trialEndsAt,
      subscriptionActive: org.subscriptionActive,
      usersCount: org._count.users,
      workOrdersCount: org._count.workOrders,
      ...subscriptionView(org),
    }))
  );
});

ownerAdminRouter.post("/organizations/:id/activate", async (req, res) => {
  const org = await prisma.organization
    .update({ where: { id: req.params.id }, data: { subscriptionActive: true } })
    .catch(() => null);
  if (!org) return res.status(404).json({ error: "Организация не найдена" });
  res.json({ id: org.id, subscriptionActive: org.subscriptionActive });
});

ownerAdminRouter.post("/organizations/:id/deactivate", async (req, res) => {
  const org = await prisma.organization
    .update({ where: { id: req.params.id }, data: { subscriptionActive: false } })
    .catch(() => null);
  if (!org) return res.status(404).json({ error: "Организация не найдена" });
  res.json({ id: org.id, subscriptionActive: org.subscriptionActive });
});
