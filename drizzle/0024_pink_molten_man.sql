ALTER TABLE `receiptSettings` ADD `footerCompanyName` varchar(255) DEFAULT 'FOR EXPERTAID TECHNOLOGIES PVT LTD.';--> statement-breakpoint
ALTER TABLE `receiptSettings` ADD `footerMessage` varchar(255) DEFAULT 'Thank you for your business!';--> statement-breakpoint
ALTER TABLE `receiptSettings` ADD `qrLabel` varchar(64) DEFAULT 'SCAN & PAY';--> statement-breakpoint
ALTER TABLE `receipts` ADD `footerCompanyName` varchar(255);--> statement-breakpoint
ALTER TABLE `receipts` ADD `footerMessage` varchar(255);--> statement-breakpoint
ALTER TABLE `receipts` ADD `qrLabel` varchar(64);