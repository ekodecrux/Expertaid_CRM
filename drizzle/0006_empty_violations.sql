ALTER TABLE `agreements` ADD `session` varchar(16) DEFAULT '2026-2027' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `sessionMode` enum('all','single') DEFAULT 'single' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `currentSession` varchar(16) DEFAULT '2026-2027' NOT NULL;