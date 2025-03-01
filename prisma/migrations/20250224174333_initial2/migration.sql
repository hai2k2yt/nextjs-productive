/*
  Warnings:

  - You are about to drop the column `hasedPassword` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasedPassword",
ADD COLUMN     "hashedPassword" TEXT;
