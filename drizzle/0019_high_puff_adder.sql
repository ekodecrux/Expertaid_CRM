ALTER TABLE `agreements` ADD `subtotal` decimal(14,2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE `agreements` ADD `gstRate` decimal(5,2) DEFAULT '18.00' NOT NULL;--> statement-breakpoint
ALTER TABLE `agreements` ADD `gstMode` enum('inclusive','exclusive') DEFAULT 'exclusive' NOT NULL;--> statement-breakpoint
ALTER TABLE `agreements` ADD `gstAmount` decimal(14,2) DEFAULT '0.00' NOT NULL;