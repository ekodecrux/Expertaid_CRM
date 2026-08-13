ALTER TABLE `agreements` MODIFY COLUMN `perStudentPrice` decimal(12,2);--> statement-breakpoint
ALTER TABLE `agreements` ADD `pricingMode` enum('perStudent','package') DEFAULT 'perStudent' NOT NULL;--> statement-breakpoint
ALTER TABLE `agreements` ADD `packagePrice` decimal(14,2);