/*
  Warnings:

  - You are about to drop the column `fair` on the `seats` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `seats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seatTypeId]` on the table `seats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seatTypeId` to the `seats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seats` DROP COLUMN `fair`,
    DROP COLUMN `type`,
    ADD COLUMN `seatTypeId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `seat_types` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `fair` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `seats_seatTypeId_key` ON `seats`(`seatTypeId`);

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_seatTypeId_fkey` FOREIGN KEY (`seatTypeId`) REFERENCES `seat_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
