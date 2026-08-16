CREATE TABLE `profileSettingsData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`profileJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profileSettingsData_id` PRIMARY KEY(`id`),
	CONSTRAINT `profileSettingsData_ownerId_unique` UNIQUE(`ownerId`)
);
