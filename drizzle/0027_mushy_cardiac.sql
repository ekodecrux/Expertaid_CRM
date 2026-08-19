CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`clientIdPrefix` varchar(24) NOT NULL,
	`clientIdStart` int NOT NULL DEFAULT 1,
	`nextClientId` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `agreements` ADD `projectId` int;--> statement-breakpoint
ALTER TABLE `agreements` ADD `clientId` varchar(64);