CREATE TABLE `quotationEditHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quotationId` int NOT NULL,
	`ownerId` int NOT NULL,
	`editedBy` int NOT NULL,
	`editedByName` varchar(255) NOT NULL,
	`editedAt` timestamp NOT NULL DEFAULT (now()),
	`snapshotJson` text NOT NULL,
	CONSTRAINT `quotationEditHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `quotations` ADD `lastEditedBy` int;--> statement-breakpoint
ALTER TABLE `quotations` ADD `lastEditedByName` varchar(255);--> statement-breakpoint
ALTER TABLE `quotations` ADD `lastEditedAt` timestamp;