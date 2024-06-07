-- DropIndex
DROP INDEX `bookings_event_id_fkey` ON `bookings`;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `eid` FOREIGN KEY (`event_id`) REFERENCES `event_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `mid` FOREIGN KEY (`event_id`) REFERENCES `movie_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
