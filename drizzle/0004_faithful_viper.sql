ALTER TABLE `agreements` ADD `instituteType` enum('School','College','Academy') DEFAULT 'School' NOT NULL;--> statement-breakpoint
ALTER TABLE `agreements` ADD `branchCoverage` enum('individual','multiple') DEFAULT 'individual' NOT NULL;--> statement-breakpoint
ALTER TABLE `agreements` ADD `branchCount` int DEFAULT 1 NOT NULL;