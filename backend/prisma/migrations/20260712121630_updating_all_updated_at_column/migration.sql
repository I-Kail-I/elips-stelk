-- AlterTable
ALTER TABLE "auth"."users" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "activity" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "membersRole" ALTER COLUMN "updated_at" DROP NOT NULL;
