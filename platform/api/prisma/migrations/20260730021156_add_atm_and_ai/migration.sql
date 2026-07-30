-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "cassetteLevelPercent" DOUBLE PRECISION,
ADD COLUMN     "deviceType" TEXT NOT NULL DEFAULT 'other',
ADD COLUMN     "lastCollectionAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'normal';

-- CreateTable
CREATE TABLE "CollectionRecord" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "performedById" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceAccessLog" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "performedById" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceAccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiInsight" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "summary" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiInsight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionRecord" ADD CONSTRAINT "CollectionRecord_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionRecord" ADD CONSTRAINT "CollectionRecord_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAccessLog" ADD CONSTRAINT "DeviceAccessLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAccessLog" ADD CONSTRAINT "DeviceAccessLog_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
