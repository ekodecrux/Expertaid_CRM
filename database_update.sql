-- Expertaid ERP CRM consolidated database update
-- Generated from Drizzle migrations 0000 through 0039 in execution order.
-- Schema-only export: this file contains no customer/test data inserts or updates.
--
-- Usage:
--   1. Back up the target database before applying schema changes.
--   2. Use this file for a fresh schema, or compare it with the target database's
--      applied Drizzle migrations before applying to an existing installation.
--   3. Do not run this entire file against a database that already contains these
--      migrations; apply only migrations that are not yet recorded there.
--
-- The original migration files under drizzle/ remain the source of truth.

-- -----------------------------------------------------------------------------
-- Migration: 0000_slippery_cammi.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0001_uneven_killer_shrike.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `agreements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`publicToken` varchar(32) NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientOwnerName` varchar(255) NOT NULL,
	`contactNumber` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`address` text NOT NULL,
	`noOfStudents` int NOT NULL,
	`perStudentPrice` decimal(12,2) NOT NULL,
	`noOfYearPlan` int NOT NULL,
	`startDate` varchar(32) NOT NULL,
	`endDate` varchar(32) NOT NULL,
	`totalPrice` decimal(14,2) NOT NULL,
	`description` text,
	`status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`signatureDate` varchar(32),
	`decidedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agreements_id` PRIMARY KEY(`id`),
	CONSTRAINT `agreements_publicToken_unique` UNIQUE(`publicToken`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0002_chunky_cable.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` ADD `logoUrl` text;

ALTER TABLE `agreements` ADD `logoKey` varchar(512);

-- -----------------------------------------------------------------------------
-- Migration: 0003_friendly_lord_hawal.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` MODIFY COLUMN `perStudentPrice` decimal(12,2);

ALTER TABLE `agreements` ADD `pricingMode` enum('perStudent','package') DEFAULT 'perStudent' NOT NULL;

ALTER TABLE `agreements` ADD `packagePrice` decimal(14,2);

-- -----------------------------------------------------------------------------
-- Migration: 0004_faithful_viper.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` ADD `instituteType` enum('School','College','Academy') DEFAULT 'School' NOT NULL;

ALTER TABLE `agreements` ADD `branchCoverage` enum('individual','multiple') DEFAULT 'individual' NOT NULL;

ALTER TABLE `agreements` ADD `branchCount` int DEFAULT 1 NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0005_confused_war_machine.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `users` ADD `companyLogoUrl` text;

ALTER TABLE `users` ADD `companyLogoKey` varchar(512);

ALTER TABLE `users` ADD `companyName` varchar(255);

ALTER TABLE `users` ADD `serviceCaption` varchar(255);

ALTER TABLE `users` ADD `footerCompanyName` varchar(255);

-- -----------------------------------------------------------------------------
-- Migration: 0006_empty_violations.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` ADD `session` varchar(16) DEFAULT '2026-2027' NOT NULL;

ALTER TABLE `users` ADD `sessionMode` enum('all','single') DEFAULT 'single' NOT NULL;

ALTER TABLE `users` ADD `currentSession` varchar(16) DEFAULT '2026-2027' NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0007_pink_flatman.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`sessionLabel` varchar(16) NOT NULL,
	`startDate` varchar(32) NOT NULL,
	`endDate` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0008_brief_agent_brand.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `quotations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`quotationNumber` varchar(32) NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientAddress` text NOT NULL,
	`clientContact` varchar(64) NOT NULL,
	`clientEmail` varchar(320),
	`clientGst` varchar(32),
	`quotationDate` varchar(32) NOT NULL,
	`validityDays` int NOT NULL DEFAULT 15,
	`companyGst` varchar(32) NOT NULL,
	`companyAddress` text NOT NULL,
	`itemsJson` text NOT NULL,
	`subtotal` decimal(14,2) NOT NULL,
	`gstRate` decimal(5,2) NOT NULL,
	`gstAmount` decimal(14,2) NOT NULL,
	`grandTotal` decimal(14,2) NOT NULL,
	`terms` text,
	`scannerUrl` text,
	`scannerKey` varchar(512),
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quotations_id` PRIMARY KEY(`id`),
	CONSTRAINT `quotations_quotationNumber_unique` UNIQUE(`quotationNumber`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0009_glossy_loki.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `quotationSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`companyGst` varchar(32) NOT NULL,
	`companyAddress` text NOT NULL,
	`validityDays` int NOT NULL DEFAULT 15,
	`gstRate` decimal(5,2) NOT NULL DEFAULT '18.00',
	`terms` text NOT NULL,
	`productsJson` text NOT NULL,
	`logoUrl` text,
	`logoKey` varchar(512),
	`scannerUrl` text,
	`scannerKey` varchar(512),
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quotationSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `quotationSettings_ownerId_unique` UNIQUE(`ownerId`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0010_classy_cable.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotationSettings` ADD `gstMode` enum('inclusive','exclusive') DEFAULT 'exclusive' NOT NULL;

ALTER TABLE `quotations` ADD `gstMode` enum('inclusive','exclusive') DEFAULT 'exclusive' NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0011_colorful_master_mold.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `quotationEditHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quotationId` int NOT NULL,
	`ownerId` int NOT NULL,
	`editedBy` int NOT NULL,
	`editedByName` varchar(255) NOT NULL,
	`editedAt` timestamp NOT NULL DEFAULT (now()),
	`snapshotJson` text NOT NULL,
	CONSTRAINT `quotationEditHistory_id` PRIMARY KEY(`id`)
);


ALTER TABLE `quotations` ADD `lastEditedBy` int;

ALTER TABLE `quotations` ADD `lastEditedByName` varchar(255);

ALTER TABLE `quotations` ADD `lastEditedAt` timestamp;

-- -----------------------------------------------------------------------------
-- Migration: 0012_uneven_martin_li.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotationSettings` ADD `invoiceNumberStart` int DEFAULT 129 NOT NULL;

ALTER TABLE `quotationSettings` ADD `invoiceNumberNext` int DEFAULT 129 NOT NULL;

ALTER TABLE `quotations` ADD `invoiceNumber` varchar(32);

ALTER TABLE `quotations` ADD CONSTRAINT `quotations_invoiceNumber_unique` UNIQUE(`invoiceNumber`);

-- -----------------------------------------------------------------------------
-- Migration: 0013_worried_thundra.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotationSettings` ADD `quotationPrefix` varchar(24) DEFAULT 'QT' NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0014_eager_molly_hayes.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotations` ADD `estimationNumber` int DEFAULT 1 NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0015_steep_robin_chapel.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotationSettings` ADD `accountCompanyName` varchar(255);

ALTER TABLE `quotationSettings` ADD `accountNumber` varchar(128);

ALTER TABLE `quotationSettings` ADD `accountIfsc` varchar(64);

ALTER TABLE `quotationSettings` ADD `accountBranch` varchar(255);

ALTER TABLE `quotations` ADD `accountCompanyName` varchar(255);

ALTER TABLE `quotations` ADD `accountNumber` varchar(128);

ALTER TABLE `quotations` ADD `accountIfsc` varchar(64);

ALTER TABLE `quotations` ADD `accountBranch` varchar(255);

-- -----------------------------------------------------------------------------
-- Migration: 0016_next_nuke.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotations` ADD `status` enum('Awaiting','Success','Closed') DEFAULT 'Awaiting' NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0017_marvelous_thing.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `quotationSettingsData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`settingsJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quotationSettingsData_id` PRIMARY KEY(`id`),
	CONSTRAINT `quotationSettingsData_ownerId_unique` UNIQUE(`ownerId`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0018_dusty_boom_boom.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `profileSettingsData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`profileJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profileSettingsData_id` PRIMARY KEY(`id`),
	CONSTRAINT `profileSettingsData_ownerId_unique` UNIQUE(`ownerId`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0019_high_puff_adder.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` ADD `subtotal` decimal(14,2) DEFAULT '0.00' NOT NULL;

ALTER TABLE `agreements` ADD `gstRate` decimal(5,2) DEFAULT '18.00' NOT NULL;

ALTER TABLE `agreements` ADD `gstMode` enum('inclusive','exclusive') DEFAULT 'exclusive' NOT NULL;

ALTER TABLE `agreements` ADD `gstAmount` decimal(14,2) DEFAULT '0.00' NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0020_bent_zemo.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `quotations` ADD `logoUrl` text;

ALTER TABLE `quotations` ADD `logoKey` varchar(512);

-- -----------------------------------------------------------------------------
-- Migration: 0021_windy_ulik.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `invoiceSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`companyGst` varchar(32) NOT NULL,
	`companyAddress` text NOT NULL,
	`invoicePrefix` varchar(24) NOT NULL DEFAULT 'INV',
	`invoiceNumberStart` int NOT NULL DEFAULT 1,
	`invoiceNumberNext` int NOT NULL DEFAULT 1,
	`gstRate` decimal(5,2) NOT NULL DEFAULT '18.00',
	`gstMode` enum('inclusive','exclusive') NOT NULL DEFAULT 'exclusive',
	`defaultDueDays` int NOT NULL DEFAULT 15,
	`terms` text NOT NULL,
	`accountCompanyName` varchar(255),
	`accountNumber` varchar(128),
	`accountIfsc` varchar(64),
	`accountBranch` varchar(255),
	`logoUrl` text,
	`logoKey` varchar(512),
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `invoiceSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `invoiceSettings_ownerId_unique` UNIQUE(`ownerId`)
);


CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`invoiceNumber` varchar(32) NOT NULL,
	`status` enum('Draft','Sent','Paid','Cancelled') NOT NULL DEFAULT 'Draft',
	`clientName` varchar(255) NOT NULL,
	`clientAddress` text NOT NULL,
	`clientContact` varchar(64),
	`clientEmail` varchar(320),
	`clientGst` varchar(32),
	`invoiceDate` varchar(32) NOT NULL,
	`dueDate` varchar(32) NOT NULL,
	`itemsJson` text NOT NULL,
	`subtotal` decimal(14,2) NOT NULL,
	`gstRate` decimal(5,2) NOT NULL,
	`gstMode` enum('inclusive','exclusive') NOT NULL DEFAULT 'exclusive',
	`gstAmount` decimal(14,2) NOT NULL,
	`grandTotal` decimal(14,2) NOT NULL,
	`notes` text,
	`terms` text,
	`companyGst` varchar(32) NOT NULL,
	`companyAddress` text NOT NULL,
	`accountCompanyName` varchar(255),
	`accountNumber` varchar(128),
	`accountIfsc` varchar(64),
	`accountBranch` varchar(255),
	`logoUrl` text,
	`logoKey` varchar(512),
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`),
	CONSTRAINT `invoices_invoiceNumber_unique` UNIQUE(`invoiceNumber`)
);


CREATE TABLE `receiptSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`companyGst` varchar(32) NOT NULL,
	`companyAddress` text NOT NULL,
	`receiptPrefix` varchar(24) NOT NULL DEFAULT 'RCT',
	`receiptNumberStart` int NOT NULL DEFAULT 1,
	`receiptNumberNext` int NOT NULL DEFAULT 1,
	`terms` text NOT NULL,
	`accountCompanyName` varchar(255),
	`accountNumber` varchar(128),
	`accountIfsc` varchar(64),
	`accountBranch` varchar(255),
	`logoUrl` text,
	`logoKey` varchar(512),
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `receiptSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `receiptSettings_ownerId_unique` UNIQUE(`ownerId`)
);


CREATE TABLE `receipts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`receiptNumber` varchar(32) NOT NULL,
	`status` enum('Issued','Cancelled') NOT NULL DEFAULT 'Issued',
	`clientName` varchar(255) NOT NULL,
	`clientAddress` text NOT NULL,
	`clientContact` varchar(64),
	`clientEmail` varchar(320),
	`receiptDate` varchar(32) NOT NULL,
	`paymentDate` varchar(32) NOT NULL,
	`amount` decimal(14,2) NOT NULL,
	`paymentMode` enum('Cash','UPI','Bank Transfer','Card','Cheque','Other') NOT NULL DEFAULT 'Bank Transfer',
	`transactionReference` varchar(128),
	`receivedFor` varchar(255) NOT NULL,
	`notes` text,
	`terms` text,
	`companyGst` varchar(32) NOT NULL,
	`companyAddress` text NOT NULL,
	`accountCompanyName` varchar(255),
	`accountNumber` varchar(128),
	`accountIfsc` varchar(64),
	`accountBranch` varchar(255),
	`logoUrl` text,
	`logoKey` varchar(512),
	`signatureUrl` text,
	`signatureKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `receipts_id` PRIMARY KEY(`id`),
	CONSTRAINT `receipts_receiptNumber_unique` UNIQUE(`receiptNumber`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0022_lazy_mesmero.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `invoiceSettings` ADD `scannerUrl` text;

ALTER TABLE `invoiceSettings` ADD `scannerKey` varchar(512);

-- -----------------------------------------------------------------------------
-- Migration: 0023_sloppy_roughhouse.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `invoices` MODIFY COLUMN `status` enum('Draft','Due','Paid','Cancelled') NOT NULL DEFAULT 'Draft';

ALTER TABLE `receipts` ADD `invoiceId` int;

ALTER TABLE `receipts` ADD `invoiceNumber` varchar(32);

ALTER TABLE `receipts` ADD `clientGst` varchar(32);

ALTER TABLE `receipts` ADD `itemsJson` text;

ALTER TABLE `receipts` ADD `subtotal` decimal(14,2);

ALTER TABLE `receipts` ADD `gstRate` decimal(5,2);

ALTER TABLE `receipts` ADD `gstMode` enum('inclusive','exclusive');

ALTER TABLE `receipts` ADD `gstAmount` decimal(14,2);

ALTER TABLE `receipts` ADD `grandTotal` decimal(14,2);

-- -----------------------------------------------------------------------------
-- Migration: 0024_pink_molten_man.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `receiptSettings` ADD `footerCompanyName` varchar(255) DEFAULT 'FOR EXPERTAID TECHNOLOGIES PVT LTD.';

ALTER TABLE `receiptSettings` ADD `footerMessage` varchar(255) DEFAULT 'Thank you for your business!';

ALTER TABLE `receiptSettings` ADD `qrLabel` varchar(64) DEFAULT 'SCAN & PAY';

ALTER TABLE `receipts` ADD `footerCompanyName` varchar(255);

ALTER TABLE `receipts` ADD `footerMessage` varchar(255);

ALTER TABLE `receipts` ADD `qrLabel` varchar(64);

-- -----------------------------------------------------------------------------
-- Migration: 0025_motionless_union_jack.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `receiptSettings` ADD `defaultProductsJson` text;

-- -----------------------------------------------------------------------------
-- Migration: 0026_common_moira_mactaggert.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `receiptSettings` MODIFY COLUMN `defaultProductsJson` text;

-- -----------------------------------------------------------------------------
-- Migration: 0027_mushy_cardiac.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`clientIdPrefix` varchar(24) NOT NULL,
	`clientIdStart` int NOT NULL DEFAULT 1,
	`nextClientId` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);


ALTER TABLE `agreements` ADD `projectId` int;

ALTER TABLE `agreements` ADD `clientId` varchar(64);

-- -----------------------------------------------------------------------------
-- Migration: 0028_right_gateway.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `projects` ADD `isMain` boolean DEFAULT false NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0029_acoustic_robin_chapel.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int,
	`clientId` varchar(64) NOT NULL,
	`ownerId` int NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientOwnerName` varchar(255) NOT NULL,
	`instituteType` enum('School','College','Academy') NOT NULL DEFAULT 'School',
	`branchCoverage` enum('individual','multiple') NOT NULL DEFAULT 'individual',
	`branchCount` int NOT NULL DEFAULT 1,
	`contactNumber` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`address` text NOT NULL,
	`noOfStudents` int NOT NULL DEFAULT 0,
	`pricingMode` enum('perStudent','package') NOT NULL DEFAULT 'perStudent',
	`perStudentPrice` decimal(12,2),
	`packagePrice` decimal(14,2),
	`noOfYearPlan` int NOT NULL DEFAULT 1,
	`startDate` varchar(32) NOT NULL,
	`endDate` varchar(32) NOT NULL,
	`session` varchar(16) NOT NULL DEFAULT '2026-2027',
	`totalPrice` decimal(14,2) NOT NULL DEFAULT '0.00',
	`description` text,
	`logoUrl` text,
	`logoKey` varchar(512),
	`status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`),
	CONSTRAINT `clients_clientId_unique` UNIQUE(`clientId`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0030_yellow_gunslinger.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `clients` ADD `price` decimal(14,2) DEFAULT '0.00' NOT NULL;

ALTER TABLE `clients` ADD `gstRate` decimal(5,2) DEFAULT '18.00' NOT NULL;

ALTER TABLE `clients` ADD `gstMode` enum('inclusive','exclusive') DEFAULT 'exclusive' NOT NULL;

ALTER TABLE `clients` ADD `gstAmount` decimal(14,2) DEFAULT '0.00' NOT NULL;

-- -----------------------------------------------------------------------------
-- Migration: 0031_broad_titanium_man.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `clients` MODIFY COLUMN `status` enum('Active','Inactive','Hold','Close') NOT NULL DEFAULT 'Active';

-- -----------------------------------------------------------------------------
-- Migration: 0032_jittery_madelyne_pryor.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `clients` MODIFY COLUMN `status` enum('Active','Inactive','Hold','Cancelled','Renewal','Extended','Closed') NOT NULL DEFAULT 'Active';

ALTER TABLE `agreements` ADD `clientStatus` enum('Active','Inactive','Hold','Cancelled','Renewal','Extended','Closed');

-- -----------------------------------------------------------------------------
-- Migration: 0033_little_earthquake.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` ADD `renewalOfAgreementId` int;

ALTER TABLE `agreements` ADD `renewalType` enum('continuous','sixMonths','oneYear');

-- -----------------------------------------------------------------------------
-- Migration: 0034_familiar_nova.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `invoices` ADD `clientId` varchar(64);

ALTER TABLE `receipts` ADD `clientId` varchar(64);

-- -----------------------------------------------------------------------------
-- Migration: 0035_salty_wild_pack.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `paymentPlanTerms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`paymentPlanId` int NOT NULL,
	`label` varchar(128) NOT NULL,
	`dueDate` varchar(32) NOT NULL,
	`amount` decimal(14,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentPlanTerms_id` PRIMARY KEY(`id`)
);


CREATE TABLE `paymentPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`projectId` int,
	`paymentCycle` enum('single','terms') NOT NULL DEFAULT 'terms',
	`totalAmount` decimal(14,2) NOT NULL,
	`initialPayment` decimal(14,2) NOT NULL DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentPlans_id` PRIMARY KEY(`id`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0036_brainy_ezekiel_stane.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `paymentPlans` MODIFY COLUMN `paymentCycle` enum('single','terms','installments','months') NOT NULL DEFAULT 'installments';

-- -----------------------------------------------------------------------------
-- Migration: 0037_mighty_sentinels.sql
-- -----------------------------------------------------------------------------
CREATE TABLE `clientProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`projectId` int,
	`productName` varchar(255) NOT NULL,
	`description` text,
	`quantity` decimal(12,2) NOT NULL DEFAULT '1.00',
	`unitPrice` decimal(14,2) NOT NULL,
	`gstRate` decimal(5,2) NOT NULL DEFAULT '0.00',
	`gstMode` enum('inclusive','exclusive') NOT NULL DEFAULT 'exclusive',
	`subtotal` decimal(14,2) NOT NULL,
	`gstAmount` decimal(14,2) NOT NULL,
	`totalAmount` decimal(14,2) NOT NULL,
	`paidAmount` decimal(14,2) NOT NULL DEFAULT '0.00',
	`paymentStatus` enum('Pending','Partially Paid','Paid') NOT NULL DEFAULT 'Pending',
	`dueDate` varchar(32),
	`paymentDate` varchar(32),
	`paymentMode` varchar(64),
	`transactionReference` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clientProducts_id` PRIMARY KEY(`id`)
);

-- -----------------------------------------------------------------------------
-- Migration: 0038_kind_tomas.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `invoices` ADD `projectId` int;

-- -----------------------------------------------------------------------------
-- Migration: 0039_daily_magma.sql
-- -----------------------------------------------------------------------------
ALTER TABLE `agreements` ADD `paymentTrackingStartedAt` timestamp;

ALTER TABLE `clients` ADD `paymentTrackingStartedAt` timestamp;
