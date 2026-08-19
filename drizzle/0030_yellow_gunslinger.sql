ALTER TABLE `clients` ADD `price` decimal(14,2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE `clients` ADD `gstRate` decimal(5,2) DEFAULT '18.00' NOT NULL;--> statement-breakpoint
ALTER TABLE `clients` ADD `gstMode` enum('inclusive','exclusive') DEFAULT 'exclusive' NOT NULL;--> statement-breakpoint
ALTER TABLE `clients` ADD `gstAmount` decimal(14,2) DEFAULT '0.00' NOT NULL;