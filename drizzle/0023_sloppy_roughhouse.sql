ALTER TABLE `invoices` MODIFY COLUMN `status` enum('Draft','Due','Paid','Cancelled') NOT NULL DEFAULT 'Draft';--> statement-breakpoint
ALTER TABLE `receipts` ADD `invoiceId` int;--> statement-breakpoint
ALTER TABLE `receipts` ADD `invoiceNumber` varchar(32);--> statement-breakpoint
ALTER TABLE `receipts` ADD `clientGst` varchar(32);--> statement-breakpoint
ALTER TABLE `receipts` ADD `itemsJson` text;--> statement-breakpoint
ALTER TABLE `receipts` ADD `subtotal` decimal(14,2);--> statement-breakpoint
ALTER TABLE `receipts` ADD `gstRate` decimal(5,2);--> statement-breakpoint
ALTER TABLE `receipts` ADD `gstMode` enum('inclusive','exclusive');--> statement-breakpoint
ALTER TABLE `receipts` ADD `gstAmount` decimal(14,2);--> statement-breakpoint
ALTER TABLE `receipts` ADD `grandTotal` decimal(14,2);