-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_parent_id_fkey`;

-- DropIndex
DROP INDEX `category_parent_id_fkey` ON `category`;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
