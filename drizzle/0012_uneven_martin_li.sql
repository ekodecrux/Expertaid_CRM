ALTER TABLE `quotationSettings` ADD `invoiceNumberStart` int DEFAULT 129 NOT NULL;--> statement-breakpoint
ALTER TABLE `quotationSettings` ADD `invoiceNumberNext` int DEFAULT 129 NOT NULL;--> statement-breakpoint
ALTER TABLE `quotations` ADD `invoiceNumber` varchar(32);--> statement-breakpoint
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_invoiceNumber_unique` UNIQUE(`invoiceNumber`);