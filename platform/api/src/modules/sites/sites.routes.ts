import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const sitesRouter = Router();
sitesRouter.use(authenticate);

sitesRouter.get("/", async (req, res) => {
  const contractorOrganizationId = req.auth!.contractorOrganizationId;
  const sites = await prisma.site.findMany({
    where: {
      organizationId: req.auth!.organizationId,
      // Подрядчик видит на карте только объекты, где у него есть назначенные заявки.
      ...(contractorOrganizationId
        ? { workOrders: { some: { assignedOrganizationId: contractorOrganizationId } } }
        : {}),
    },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });
  res.json(sites);
});
