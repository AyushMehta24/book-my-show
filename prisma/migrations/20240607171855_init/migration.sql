-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `eid`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `mid`;

-- CreateIndex
CREATE INDEX `bookings_event_id_event_type_idx` ON `bookings`(`event_id`, `event_type`);
