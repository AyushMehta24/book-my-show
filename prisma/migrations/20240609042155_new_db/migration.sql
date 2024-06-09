/*
  Warnings:

  - You are about to drop the column `seatTypeId` on the `seats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `seats` DROP FOREIGN KEY `seats_seatTypeId_fkey`;

-- AlterTable
ALTER TABLE `seats` DROP COLUMN `seatTypeId`;

-- CreateTable
CREATE TABLE `_seat_typesToseats` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_seat_typesToseats_AB_unique`(`A`, `B`),
    INDEX `_seat_typesToseats_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_seat_typesToseats` ADD CONSTRAINT `_seat_typesToseats_A_fkey` FOREIGN KEY (`A`) REFERENCES `seat_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_seat_typesToseats` ADD CONSTRAINT `_seat_typesToseats_B_fkey` FOREIGN KEY (`B`) REFERENCES `seats`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
