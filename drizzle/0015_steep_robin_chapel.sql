ALTER TABLE `quotationSettings` ADD `accountCompanyName` varchar(255);--> statement-breakpoint
ALTER TABLE `quotationSettings` ADD `accountNumber` varchar(128);--> statement-breakpoint
ALTER TABLE `quotationSettings` ADD `accountIfsc` varchar(64);--> statement-breakpoint
ALTER TABLE `quotationSettings` ADD `accountBranch` varchar(255);--> statement-breakpoint
ALTER TABLE `quotations` ADD `accountCompanyName` varchar(255);--> statement-breakpoint
ALTER TABLE `quotations` ADD `accountNumber` varchar(128);--> statement-breakpoint
ALTER TABLE `quotations` ADD `accountIfsc` varchar(64);--> statement-breakpoint
ALTER TABLE `quotations` ADD `accountBranch` varchar(255);