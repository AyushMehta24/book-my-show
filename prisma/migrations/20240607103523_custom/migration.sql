-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_event_id_fkey`;

-- AlterTable
ALTER TABLE `event_details` MODIFY `fair` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `payments` MODIFY `fair` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `seats` MODIFY `fair` DOUBLE NOT NULL;
