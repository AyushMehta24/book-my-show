/*
  Warnings:

  - You are about to drop the `_seat_typesToseats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seatTypeId` to the `seats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_seat_typesToseats` DROP FOREIGN KEY `_seat_typesToseats_A_fkey`;

-- DropForeignKey
ALTER TABLE `_seat_typesToseats` DROP FOREIGN KEY `_seat_typesToseats_B_fkey`;

-- AlterTable
ALTER TABLE `seats` ADD COLUMN `seatTypeId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_seat_typesToseats`;

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_seatTypeId_fkey` FOREIGN KEY (`seatTypeId`) REFERENCES `seat_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
