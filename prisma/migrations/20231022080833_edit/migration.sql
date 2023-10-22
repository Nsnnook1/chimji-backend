/*
  Warnings:

  - You are about to drop the column `menusId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `menusId` on the `OrderDetails` table. All the data in the column will be lost.
  - You are about to drop the `Menus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuId` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_menusId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderDetails` DROP FOREIGN KEY `OrderDetails_menusId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `menusId`,
    ADD COLUMN `menuId` INTEGER NULL;

-- AlterTable
ALTER TABLE `OrderDetails` DROP COLUMN `menusId`,
    ADD COLUMN `menuId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Menus`;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
