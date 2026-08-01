-- Все столбцы nullable/с дефолтом — безопасное добавление без бэкофилла.
ALTER TABLE "Equipment" ADD COLUMN "maintenanceIntervalDays" INTEGER;

ALTER TABLE "WorkOrder" ADD COLUMN "publicTrackingToken" TEXT;
ALTER TABLE "WorkOrder" ADD COLUMN "slaEscalatedAt" TIMESTAMP(3);
CREATE UNIQUE INDEX "WorkOrder_publicTrackingToken_key" ON "WorkOrder"("publicTrackingToken");

ALTER TABLE "User" ADD COLUMN "pushSubscription" JSONB;
