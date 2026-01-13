/*
  Warnings:

  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - The primary key for the `product_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_image` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `product_option_value` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `product_option_value` table. All the data in the column will be lost.
  - The primary key for the `product_tag_link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `product_tag_link` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `product_tag_link` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the column `optionValue1Id` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the column `optionValue2Id` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the column `optionValue3Id` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `shipping` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[variant_id]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,title]` on the table `product_option` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[option_id,value]` on the table `product_option_value` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `shipping` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `full_name` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_id` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `product_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `product_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_id` to the `product_option_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_tag_link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `product_tag_link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `shipping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `inventory_variantId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `order_item_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `product_category_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `product_category_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `product_image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_option` DROP FOREIGN KEY `product_option_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_option_value` DROP FOREIGN KEY `product_option_value_optionId_fkey`;

-- DropForeignKey
ALTER TABLE `product_tag_link` DROP FOREIGN KEY `product_tag_link_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_tag_link` DROP FOREIGN KEY `product_tag_link_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant` DROP FOREIGN KEY `product_variant_optionValue1Id_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant` DROP FOREIGN KEY `product_variant_optionValue2Id_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant` DROP FOREIGN KEY `product_variant_optionValue3Id_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant` DROP FOREIGN KEY `product_variant_productId_fkey`;

-- DropForeignKey
ALTER TABLE `shipping` DROP FOREIGN KEY `shipping_orderId_fkey`;

-- DropIndex
DROP INDEX `category_parentId_fkey` ON `category`;

-- DropIndex
DROP INDEX `inventory_variantId_key` ON `inventory`;

-- DropIndex
DROP INDEX `order_customerId_fkey` ON `order`;

-- DropIndex
DROP INDEX `order_item_orderId_fkey` ON `order_item`;

-- DropIndex
DROP INDEX `payment_orderId_key` ON `payment`;

-- DropIndex
DROP INDEX `product_category_categoryId_fkey` ON `product_category`;

-- DropIndex
DROP INDEX `product_image_productId_fkey` ON `product_image`;

-- DropIndex
DROP INDEX `product_option_productId_name_key` ON `product_option`;

-- DropIndex
DROP INDEX `product_option_value_optionId_value_key` ON `product_option_value`;

-- DropIndex
DROP INDEX `product_tag_link_tagId_fkey` ON `product_tag_link`;

-- DropIndex
DROP INDEX `product_variant_optionValue1Id_fkey` ON `product_variant`;

-- DropIndex
DROP INDEX `product_variant_optionValue2Id_fkey` ON `product_variant`;

-- DropIndex
DROP INDEX `product_variant_optionValue3Id_fkey` ON `product_variant`;

-- DropIndex
DROP INDEX `product_variant_productId_fkey` ON `product_variant`;

-- DropIndex
DROP INDEX `shipping_orderId_key` ON `shipping`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createdAt`,
    DROP COLUMN `parentId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `parent_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `createdAt`,
    DROP COLUMN `fullName`,
    DROP COLUMN `passwordHash`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `full_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password_hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `updatedAt`,
    DROP COLUMN `variantId`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `variant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `createdAt`,
    DROP COLUMN `customerId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `customer_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `orderId`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `orderId`,
    DROP COLUMN `paidAt`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `paid_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `product_category` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    DROP COLUMN `productId`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`product_id`, `category_id`);

-- AlterTable
ALTER TABLE `product_image` DROP COLUMN `productId`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product_option` DROP COLUMN `name`,
    DROP COLUMN `position`,
    DROP COLUMN `productId`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product_option_value` DROP COLUMN `optionId`,
    DROP COLUMN `position`,
    ADD COLUMN `option_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product_tag_link` DROP PRIMARY KEY,
    DROP COLUMN `productId`,
    DROP COLUMN `tagId`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `tag_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`product_id`, `tag_id`);

-- AlterTable
ALTER TABLE `product_variant` DROP COLUMN `createdAt`,
    DROP COLUMN `optionValue1Id`,
    DROP COLUMN `optionValue2Id`,
    DROP COLUMN `optionValue3Id`,
    DROP COLUMN `productId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shipping` DROP COLUMN `orderId`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `variant_option_value` (
    `variant_id` VARCHAR(191) NOT NULL,
    `option_value_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`variant_id`, `option_value_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `inventory_variant_id_key` ON `inventory`(`variant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `payment_order_id_key` ON `payment`(`order_id`);

-- CreateIndex
CREATE UNIQUE INDEX `product_option_product_id_title_key` ON `product_option`(`product_id`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `product_option_value_option_id_value_key` ON `product_option_value`(`option_id`, `value`);

-- CreateIndex
CREATE UNIQUE INDEX `shipping_order_id_key` ON `shipping`(`order_id`);

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tag_link` ADD CONSTRAINT `product_tag_link_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tag_link` ADD CONSTRAINT `product_tag_link_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `product_tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_option` ADD CONSTRAINT `product_option_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_option_value` ADD CONSTRAINT `product_option_value_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `product_option`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant` ADD CONSTRAINT `product_variant_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variant_option_value` ADD CONSTRAINT `variant_option_value_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `product_variant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variant_option_value` ADD CONSTRAINT `variant_option_value_option_value_id_fkey` FOREIGN KEY (`option_value_id`) REFERENCES `product_option_value`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `product_variant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shipping` ADD CONSTRAINT `shipping_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
