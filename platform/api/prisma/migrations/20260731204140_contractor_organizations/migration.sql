-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('BANK', 'CONTRACTOR', 'CLEANING', 'SERVICE', 'CASH_COLLECTION', 'LOGISTICS', 'SECURITY', 'OTHER');

-- CreateEnum
CREATE TYPE "ExecutorType" AS ENUM ('STAFF', 'CONTRACTOR', 'CLEANING', 'CASH_COLLECTOR', 'SERVICE_ENGINEER', 'LOGISTICIAN', 'SECURITY', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkOrderType" AS ENUM ('REPAIR', 'MAINTENANCE', 'CLEANING', 'CASH_COLLECTION', 'DELIVERY', 'EQUIPMENT_MOVE', 'INSTALLATION', 'DECOMMISSION', 'INSPECTION', 'AUDIT', 'OTHER');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "contractEndAt" TIMESTAMP(3),
ADD COLUMN     "contractNumber" TEXT,
ADD COLUMN     "contractStartAt" TIMESTAMP(3),
ADD COLUMN     "inn" TEXT,
ADD COLUMN     "parentOrganizationId" TEXT,
ADD COLUMN     "serviceRegion" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "type" "OrganizationType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "contractorOrganizationId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contractorOrganizationId" TEXT,
ADD COLUMN     "executorType" "ExecutorType" NOT NULL DEFAULT 'STAFF';

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "assignedOrganizationId" TEXT,
ADD COLUMN     "requestType" "WorkOrderType" NOT NULL DEFAULT 'OTHER';

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_parentOrganizationId_fkey" FOREIGN KEY ("parentOrganizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contractorOrganizationId_fkey" FOREIGN KEY ("contractorOrganizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_contractorOrganizationId_fkey" FOREIGN KEY ("contractorOrganizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_assignedOrganizationId_fkey" FOREIGN KEY ("assignedOrganizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
