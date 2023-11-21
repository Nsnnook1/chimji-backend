/*
  Warnings:

  - You are about to drop the column `deliveryId` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_deliveryId_fkey`;

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `deliveryId`;
