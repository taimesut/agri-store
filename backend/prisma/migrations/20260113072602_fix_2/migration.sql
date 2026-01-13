/*
  Warnings:

  - You are about to drop the column `option_id` on the `product_option_value` table. All the data in the column will be lost.
  - The primary key for the `variant_option_value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `option_value_id` on the `variant_option_value` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_option_id,value]` on the table `product_option_value` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_option_id` to the `product_option_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_option_value_id` to the `variant_option_value` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_option_value` DROP FOREIGN KEY `product_option_value_option_id_fkey`;

-- DropForeignKey
ALTER TABLE `variant_option_value` DROP FOREIGN KEY `variant_option_value_option_value_id_fkey`;

-- DropIndex
DROP INDEX `product_option_value_option_id_value_key` ON `product_option_value`;

-- DropIndex
DROP INDEX `variant_option_value_option_value_id_fkey` ON `variant_option_value`;

-- AlterTable
ALTER TABLE `product_option_value` DROP COLUMN `option_id`,
    ADD COLUMN `product_option_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `variant_option_value` DROP PRIMARY KEY,
    DROP COLUMN `option_value_id`,
    ADD COLUMN `product_option_value_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`variant_id`, `product_option_value_id`);

-- CreateIndex
CREATE UNIQUE INDEX `product_option_value_product_option_id_value_key` ON `product_option_value`(`product_option_id`, `value`);

-- AddForeignKey
ALTER TABLE `product_option_value` ADD CONSTRAINT `product_option_value_product_option_id_fkey` FOREIGN KEY (`product_option_id`) REFERENCES `product_option`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variant_option_value` ADD CONSTRAINT `variant_option_value_product_option_value_id_fkey` FOREIGN KEY (`product_option_value_id`) REFERENCES `product_option_value`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
