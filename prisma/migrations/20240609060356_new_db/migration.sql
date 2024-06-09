/*
  Warnings:

  - You are about to alter the column `date` on the `event_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `date` on the `movie_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `event_details` MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `movie_details` MODIFY `date` DATETIME(3) NOT NULL;
