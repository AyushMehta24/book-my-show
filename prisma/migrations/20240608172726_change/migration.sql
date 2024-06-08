/*
  Warnings:

  - A unique constraint covering the columns `[id,seatTypeId]` on the table `seats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `seats_id_seatTypeId_key` ON `seats`(`id`, `seatTypeId`);
