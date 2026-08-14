CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`sessionLabel` varchar(16) NOT NULL,
	`startDate` varchar(32) NOT NULL,
	`endDate` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
