CREATE TABLE `quotationSettingsData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`settingsJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quotationSettingsData_id` PRIMARY KEY(`id`),
	CONSTRAINT `quotationSettingsData_ownerId_unique` UNIQUE(`ownerId`)
);
