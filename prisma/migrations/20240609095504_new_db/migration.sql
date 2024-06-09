/*
  Warnings:

  - Added the required column `owner_id` to the `event_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_details` ADD COLUMN `owner_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `event_details` ADD CONSTRAINT `event_details_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
