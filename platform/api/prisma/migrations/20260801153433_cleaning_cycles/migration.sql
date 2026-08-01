-- CreateEnum
CREATE TYPE "CleaningCycleStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CLOSED_EARLY');

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "cleaningCycleId" TEXT;

-- CreateTable
CREATE TABLE "CleaningCycle" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" "CleaningCycleStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "CleaningCycle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CleaningCycle_teamId_number_key" ON "CleaningCycle"("teamId", "number");

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_cleaningCycleId_fkey" FOREIGN KEY ("cleaningCycleId") REFERENCES "CleaningCycle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningCycle" ADD CONSTRAINT "CleaningCycle_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningCycle" ADD CONSTRAINT "CleaningCycle_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
