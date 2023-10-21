/*
  Warnings:

  - Added the required column `detail` to the `Menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Menus` ADD COLUMN `detail` VARCHAR(191) NOT NULL;
