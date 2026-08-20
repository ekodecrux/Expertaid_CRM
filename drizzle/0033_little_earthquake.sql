ALTER TABLE `agreements` ADD `renewalOfAgreementId` int;--> statement-breakpoint
ALTER TABLE `agreements` ADD `renewalType` enum('continuous','sixMonths','oneYear');