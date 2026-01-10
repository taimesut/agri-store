/*
  Warnings:

  - You are about to drop the column `variant_id` on the `order_item` table. All the data in the column will be lost.
  - Added the required column `sku` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `variant_id`,
    ADD COLUMN `sku` VARCHAR(191) NOT NULL;
