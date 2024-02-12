/*
  Warnings:

  - You are about to drop the column `body` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - Added the required column `Content` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Note` DROP COLUMN `body`,
    DROP COLUMN `title`,
    ADD COLUMN `Content` VARCHAR(191) NOT NULL;
