/*
  Warnings:

  - You are about to drop the column `image` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `membersRole` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "membersRole" DROP COLUMN "image";
