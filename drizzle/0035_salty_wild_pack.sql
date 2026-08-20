CREATE TABLE `paymentPlanTerms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`paymentPlanId` int NOT NULL,
	`label` varchar(128) NOT NULL,
	`dueDate` varchar(32) NOT NULL,
	`amount` decimal(14,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentPlanTerms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paymentPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`projectId` int,
	`paymentCycle` enum('single','terms') NOT NULL DEFAULT 'terms',
	`totalAmount` decimal(14,2) NOT NULL,
	`initialPayment` decimal(14,2) NOT NULL DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentPlans_id` PRIMARY KEY(`id`)
);
