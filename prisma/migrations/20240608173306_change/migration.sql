/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `seats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `seats_id_seatTypeId_key` ON `seats`;

-- CreateIndex
CREATE UNIQUE INDEX `seats_id_key` ON `seats`(`id`);
