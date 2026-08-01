-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "teamId" TEXT;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
