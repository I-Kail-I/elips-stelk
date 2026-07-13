-- AlterTable
ALTER TABLE "membersRole" ADD COLUMN     "is_leader_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_tamat" BOOLEAN NOT NULL DEFAULT false;
