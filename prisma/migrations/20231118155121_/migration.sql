-- DropIndex
DROP INDEX `User_mobile_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `mobile` VARCHAR(191) NULL;
