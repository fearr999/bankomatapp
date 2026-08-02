-- AlterTable
ALTER TABLE "IssueEvent" ADD COLUMN     "messageUz" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "messageUz" TEXT,
ADD COLUMN     "titleUz" TEXT;

-- AlterTable
ALTER TABLE "WorkOrderEvent" ADD COLUMN     "messageUz" TEXT;
