-- Multi-tenancy: introduce Organization as the sole isolation boundary.
-- Existing rows (real data, not just seed) are backfilled into one
-- "Legacy Organization" so this migration never wipes anything.

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- Seed the fallback org that existing rows will be backfilled into.
INSERT INTO "Organization" ("id", "name", "createdAt")
VALUES ('legacy-org', 'Legacy Organization', CURRENT_TIMESTAMP);

-- AlterTable: add nullable first so backfill can run before NOT NULL is enforced.
ALTER TABLE "AiInsight" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "ChecklistTemplate" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "Client" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "Equipment" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "InventoryItem" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "Site" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "Team" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "User" ADD COLUMN "organizationId" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "organizationId" TEXT;

-- Backfill every existing row into the legacy organization.
UPDATE "AiInsight" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "ChecklistTemplate" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "Client" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "Equipment" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "InventoryItem" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "Site" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "Team" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "User" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;
UPDATE "WorkOrder" SET "organizationId" = 'legacy-org' WHERE "organizationId" IS NULL;

-- Now safe to enforce NOT NULL.
ALTER TABLE "AiInsight" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "ChecklistTemplate" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "Client" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "Equipment" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "InventoryItem" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "Site" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "Team" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "organizationId" SET NOT NULL;
ALTER TABLE "WorkOrder" ALTER COLUMN "organizationId" SET NOT NULL;

-- WorkOrder.number moves from a global unique constraint to unique-per-organization.
DROP INDEX "WorkOrder_number_key";
CREATE UNIQUE INDEX "WorkOrder_organizationId_number_key" ON "WorkOrder"("organizationId", "number");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Team" ADD CONSTRAINT "Team_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Client" ADD CONSTRAINT "Client_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Site" ADD CONSTRAINT "Site_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ChecklistTemplate" ADD CONSTRAINT "ChecklistTemplate_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AiInsight" ADD CONSTRAINT "AiInsight_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
