import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const sitesRouter = Router();
sitesRouter.use(authenticate);

sitesRouter.get("/", async (req, res) => {
  const sites = await prisma.site.findMany({
    where: { organizationId: req.auth!.organizationId },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });
  res.json(sites);
});
