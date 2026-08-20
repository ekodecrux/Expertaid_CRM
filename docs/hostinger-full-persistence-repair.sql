-- Expertaid ERP CRM: combined non-destructive Hostinger repair
-- Existing tables/columns are preserved; CREATE TABLE IF NOT EXISTS and guarded ALTER statements skip objects that already exist.
-- Run this file once in the target database, then inspect the verification queries at the end.

-- Expertaid ERP CRM: separate Invoice and Receipt persistence
-- Run this script while connected to the application database.
-- It is non-destructive and creates each table only if it does not already exist.

CREATE TABLE IF NOT EXISTS `invoiceSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` int NOT NULL,
  `companyGst` varchar(32) NOT NULL,
  `companyAddress` text NOT NULL,
  `invoicePrefix` varchar(24) NOT NULL DEFAULT 'INV',
  `invoiceNumberStart` int NOT NULL DEFAULT 1,
  `invoiceNumberNext` int NOT NULL DEFAULT 1,
  `gstRate` decimal(5,2) NOT NULL DEFAULT 18.00,
  `gstMode` enum('inclusive','exclusive') NOT NULL DEFAULT 'exclusive',
  `defaultDueDays` int NOT NULL DEFAULT 15,
  `terms` text NOT NULL,
  `accountCompanyName` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(128) DEFAULT NULL,
  `accountIfsc` varchar(64) DEFAULT NULL,
  `accountBranch` varchar(255) DEFAULT NULL,
  `logoUrl` text,
  `logoKey` varchar(512) DEFAULT NULL,
  `scannerUrl` text,
  `scannerKey` varchar(512) DEFAULT NULL,
  `signatureUrl` text,
  `signatureKey` varchar(512) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoiceSettings_ownerId_unique` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` int NOT NULL,
  `invoiceNumber` varchar(32) NOT NULL,
  `status` enum('Draft','Due','Paid','Cancelled') NOT NULL DEFAULT 'Draft',
  `clientName` varchar(255) NOT NULL,
  `clientAddress` text NOT NULL,
  `clientContact` varchar(64) DEFAULT NULL,
  `clientEmail` varchar(320) DEFAULT NULL,
  `clientGst` varchar(32) DEFAULT NULL,
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
  `accountCompanyName` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(128) DEFAULT NULL,
  `accountIfsc` varchar(64) DEFAULT NULL,
  `accountBranch` varchar(255) DEFAULT NULL,
  `logoUrl` text,
  `logoKey` varchar(512) DEFAULT NULL,
  `signatureUrl` text,
  `signatureKey` varchar(512) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoices_invoiceNumber_unique` (`invoiceNumber`),
  KEY `invoices_ownerId_idx` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `receiptSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` int NOT NULL,
  `companyGst` varchar(32) NOT NULL,
  `companyAddress` text NOT NULL,
  `receiptPrefix` varchar(24) NOT NULL DEFAULT 'RCT',
  `receiptNumberStart` int NOT NULL DEFAULT 1,
  `receiptNumberNext` int NOT NULL DEFAULT 1,
  `terms` text NOT NULL,
  `accountCompanyName` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(128) DEFAULT NULL,
  `accountIfsc` varchar(64) DEFAULT NULL,
  `accountBranch` varchar(255) DEFAULT NULL,
  `logoUrl` text,
  `logoKey` varchar(512) DEFAULT NULL,
  `signatureUrl` text,
  `signatureKey` varchar(512) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receiptSettings_ownerId_unique` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` int NOT NULL,
  `receiptNumber` varchar(32) NOT NULL,
  `status` enum('Issued','Cancelled') NOT NULL DEFAULT 'Issued',
  `invoiceId` int DEFAULT NULL,
  `invoiceNumber` varchar(32) DEFAULT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientAddress` text NOT NULL,
  `clientContact` varchar(64) DEFAULT NULL,
  `clientEmail` varchar(320) DEFAULT NULL,
  `clientGst` varchar(32) DEFAULT NULL,
  `receiptDate` varchar(32) NOT NULL,
  `paymentDate` varchar(32) NOT NULL,
  `amount` decimal(14,2) NOT NULL,
  `itemsJson` text,
  `subtotal` decimal(14,2) DEFAULT NULL,
  `gstRate` decimal(5,2) DEFAULT NULL,
  `gstMode` enum('inclusive','exclusive') DEFAULT NULL,
  `gstAmount` decimal(14,2) DEFAULT NULL,
  `grandTotal` decimal(14,2) DEFAULT NULL,
  `paymentMode` enum('Cash','UPI','Bank Transfer','Card','Cheque','Other') NOT NULL DEFAULT 'Bank Transfer',
  `transactionReference` varchar(128) DEFAULT NULL,
  `receivedFor` varchar(255) NOT NULL,
  `notes` text,
  `terms` text,
  `companyGst` varchar(32) NOT NULL,
  `companyAddress` text NOT NULL,
  `accountCompanyName` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(128) DEFAULT NULL,
  `accountIfsc` varchar(64) DEFAULT NULL,
  `accountBranch` varchar(255) DEFAULT NULL,
  `logoUrl` text,
  `logoKey` varchar(512) DEFAULT NULL,
  `signatureUrl` text,
  `signatureKey` varchar(512) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipts_receiptNumber_unique` (`receiptNumber`),
  KEY `receipts_ownerId_idx` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional first defaults row for the existing admin owner. The application also creates
-- the row automatically when Save defaults is used, so this INSERT is safe to omit.
INSERT INTO `invoiceSettings` (`ownerId`, `companyGst`, `companyAddress`, `invoicePrefix`, `invoiceNumberStart`, `invoiceNumberNext`, `gstRate`, `gstMode`, `defaultDueDays`, `terms`, `accountCompanyName`)
SELECT 1, 'Expertaid Technologies Pvt. Ltd.', '', 'INV', 1, 1, 18.00, 'exclusive', 15, 'Payment is due within the agreed due date. Thank you for your business.', 'Expertaid Technologies Pvt Ltd.'
WHERE NOT EXISTS (SELECT 1 FROM `invoiceSettings` WHERE `ownerId` = 1);

INSERT INTO `receiptSettings` (`ownerId`, `companyGst`, `companyAddress`, `receiptPrefix`, `receiptNumberStart`, `receiptNumberNext`, `terms`, `accountCompanyName`)
SELECT 1, 'Expertaid Technologies Pvt. Ltd.', '', 'RCT', 1, 1, 'This receipt is issued against the payment described above.', 'Expertaid Technologies Pvt Ltd.'
WHERE NOT EXISTS (SELECT 1 FROM `receiptSettings` WHERE `ownerId` = 1);

-- Verification: these must return four separate tables.
SHOW TABLES LIKE 'invoiceSettings';
SHOW TABLES LIKE 'invoices';
SHOW TABLES LIKE 'receiptSettings';
SHOW TABLES LIKE 'receipts';

-- Verification: defaults are independent from transaction rows.
SELECT id, ownerId, invoicePrefix, invoiceNumberNext, gstRate, gstMode FROM `invoiceSettings`;
SELECT id, ownerId, receiptPrefix, receiptNumberNext FROM `receiptSettings`;
SELECT COUNT(*) AS invoice_records FROM `invoices`;
SELECT COUNT(*) AS receipt_records FROM `receipts`;

-- Profile and branding persistence table
-- Expertaid ERP CRM persistence repair
-- Run this script in the authoritative Hostinger MySQL database.
-- It is non-destructive: it creates the shared profile/branding envelope table only when absent.

CREATE TABLE IF NOT EXISTS `profileSettingsData` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `profileJson` TEXT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profileSettingsData_ownerId_unique` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Confirm the table and the owner record used by the application.
SHOW TABLES LIKE 'profileSettingsData';
DESCRIBE `profileSettingsData`;
SELECT `id`, `ownerId`, CHAR_LENGTH(`profileJson`) AS `profileJsonLength`, `createdAt`, `updatedAt`
FROM `profileSettingsData`
ORDER BY `updatedAt` DESC;

-- Inspect the persisted envelope without modifying it.
SELECT `ownerId`, JSON_KEYS(`profileJson`) AS `storedSections`
FROM `profileSettingsData`
ORDER BY `updatedAt` DESC;

-- Billing schema repair for existing legacy tables
-- Expertaid ERP CRM: non-destructive billing schema repair
-- Run this while connected to the application database.
-- This migration preserves all rows and only adds columns that are missing.

SET @db_name = DATABASE();

-- Invoice settings requires logo, QR/scanner, and authorized-signature asset references.
SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoiceSettings' AND column_name = 'logoUrl'
  ),
  'SELECT 1',
  'ALTER TABLE `invoiceSettings` ADD COLUMN `logoUrl` TEXT NULL AFTER `accountBranch`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoiceSettings' AND column_name = 'logoKey'
  ),
  'SELECT 1',
  'ALTER TABLE `invoiceSettings` ADD COLUMN `logoKey` VARCHAR(512) NULL AFTER `logoUrl`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoiceSettings' AND column_name = 'scannerUrl'
  ),
  'SELECT 1',
  'ALTER TABLE `invoiceSettings` ADD COLUMN `scannerUrl` TEXT NULL AFTER `logoKey`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoiceSettings' AND column_name = 'scannerKey'
  ),
  'SELECT 1',
  'ALTER TABLE `invoiceSettings` ADD COLUMN `scannerKey` VARCHAR(512) NULL AFTER `scannerUrl`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoiceSettings' AND column_name = 'signatureUrl'
  ),
  'SELECT 1',
  'ALTER TABLE `invoiceSettings` ADD COLUMN `signatureUrl` TEXT NULL AFTER `scannerKey`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoiceSettings' AND column_name = 'signatureKey'
  ),
  'SELECT 1',
  'ALTER TABLE `invoiceSettings` ADD COLUMN `signatureKey` VARCHAR(512) NULL AFTER `signatureUrl`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Receipt settings requires logo and authorized-signature asset references.
SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'logoUrl'
  ),
  'SELECT 1',
  'ALTER TABLE `receiptSettings` ADD COLUMN `logoUrl` TEXT NULL AFTER `accountBranch`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'logoKey'
  ),
  'SELECT 1',
  'ALTER TABLE `receiptSettings` ADD COLUMN `logoKey` VARCHAR(512) NULL AFTER `logoUrl`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'signatureUrl'
  ),
  'SELECT 1',
  'ALTER TABLE `receiptSettings` ADD COLUMN `signatureUrl` TEXT NULL AFTER `logoKey`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'signatureKey'
  ),
  'SELECT 1',
  'ALTER TABLE `receiptSettings` ADD COLUMN `signatureKey` VARCHAR(512) NULL AFTER `signatureUrl`'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Confirm the columns required by the application are present.
SELECT table_name, column_name, column_type, is_nullable
FROM information_schema.columns
WHERE table_schema = DATABASE()
  AND table_name IN ('invoiceSettings', 'receiptSettings')
  AND column_name IN ('logoUrl', 'logoKey', 'scannerUrl', 'scannerKey', 'signatureUrl', 'signatureKey')
ORDER BY table_name, ordinal_position;

DESCRIBE `invoiceSettings`;
DESCRIBE `receiptSettings`;

-- These should execute without an Unknown column error.
SELECT `id`, `ownerId`, `companyGst`, `companyAddress`, `invoicePrefix`, `invoiceNumberStart`, `invoiceNumberNext`, `gstRate`, `gstMode`, `defaultDueDays`, `terms`, `accountCompanyName`, `accountNumber`, `accountIfsc`, `accountBranch`, `logoUrl`, `logoKey`, `scannerUrl`, `scannerKey`, `signatureUrl`, `signatureKey`, `createdAt`, `updatedAt`
FROM `invoiceSettings` WHERE `ownerId` = 1 LIMIT 1;

SELECT `id`, `ownerId`, `companyGst`, `companyAddress`, `receiptPrefix`, `receiptNumberStart`, `receiptNumberNext`, `terms`, `accountCompanyName`, `accountNumber`, `accountIfsc`, `accountBranch`, `logoUrl`, `logoKey`, `signatureUrl`, `signatureKey`, `defaultProductsJson`, `createdAt`, `updatedAt`
FROM `receiptSettings` WHERE `ownerId` = 1 LIMIT 1;

-- Important: this script does not insert passwords, URLs, or credentials.
-- If a table itself is missing, run docs/hostinger-invoice-receipt.sql first.

-- Potentially dangerous statements intentionally omitted:
-- DROP TABLE, TRUNCATE, DELETE, and DROP COLUMN.


-- Invoice payment lifecycle: replace legacy Sent with the editable Due status.
SET @sql = IF(
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = @db_name AND table_name = 'invoices' AND column_name = 'status'
  ),
  'ALTER TABLE `invoices` MODIFY COLUMN `status` ENUM(''Draft'',''Due'',''Paid'',''Cancelled'') NOT NULL DEFAULT ''Draft''',
  'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Receipt transaction linkage and invoice-matched product/GST details.
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'invoiceId'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `invoiceId` INT NULL AFTER `status`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'invoiceNumber'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `invoiceNumber` VARCHAR(32) NULL AFTER `invoiceId`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'clientGst'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `clientGst` VARCHAR(32) NULL AFTER `clientEmail`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'itemsJson'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `itemsJson` TEXT NULL AFTER `amount`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'subtotal'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `subtotal` DECIMAL(14,2) NULL AFTER `itemsJson`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'gstRate'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `gstRate` DECIMAL(5,2) NULL AFTER `subtotal`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'gstMode'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `gstMode` ENUM(''inclusive'',''exclusive'') NULL AFTER `gstRate`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'gstAmount'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `gstAmount` DECIMAL(14,2) NULL AFTER `gstMode`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'grandTotal'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `grandTotal` DECIMAL(14,2) NULL AFTER `gstAmount`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SELECT table_name, column_name, column_type
FROM information_schema.columns
WHERE table_schema = @db_name
  AND ((table_name = 'invoices' AND column_name = 'status')
    OR (table_name = 'receipts' AND column_name IN ('invoiceId','invoiceNumber','clientGst','itemsJson','subtotal','gstRate','gstMode','gstAmount','grandTotal'))
    OR (table_name = 'receiptSettings' AND column_name = 'defaultProductsJson'))
ORDER BY table_name, ordinal_position;

-- Reference-style Receipt configuration fields.
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'footerCompanyName'), 'SELECT 1', 'ALTER TABLE `receiptSettings` ADD COLUMN `footerCompanyName` VARCHAR(255) DEFAULT ''FOR EXPERTAID TECHNOLOGIES PVT LTD.''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'footerMessage'), 'SELECT 1', 'ALTER TABLE `receiptSettings` ADD COLUMN `footerMessage` VARCHAR(255) DEFAULT ''Thank you for your business!''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'qrLabel'), 'SELECT 1', 'ALTER TABLE `receiptSettings` ADD COLUMN `qrLabel` VARCHAR(64) DEFAULT ''SCAN & PAY''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receiptSettings' AND column_name = 'defaultProductsJson'), 'SELECT 1', 'ALTER TABLE `receiptSettings` ADD COLUMN `defaultProductsJson` TEXT NULL');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'footerCompanyName'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `footerCompanyName` VARCHAR(255) NULL');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'footerMessage'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `footerMessage` VARCHAR(255) NULL');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'receipts' AND column_name = 'qrLabel'), 'SELECT 1', 'ALTER TABLE `receipts` ADD COLUMN `qrLabel` VARCHAR(64) NULL');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Project management: School, College, and Academy remain institute types under the ERP project.
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `clientIdPrefix` VARCHAR(24) NOT NULL,
  `clientIdStart` INT NOT NULL DEFAULT 1,
  `nextClientId` INT NOT NULL DEFAULT 1,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'agreements' AND column_name = 'projectId'), 'SELECT 1', 'ALTER TABLE `agreements` ADD COLUMN `projectId` INT NULL AFTER `id`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'agreements' AND column_name = 'clientId'), 'SELECT 1', 'ALTER TABLE `agreements` ADD COLUMN `clientId` VARCHAR(64) NULL AFTER `projectId`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
INSERT INTO `projects` (`ownerId`, `name`, `clientIdPrefix`, `clientIdStart`, `nextClientId`)
SELECT 1, 'ERP', 'ERP', 1, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `projects` WHERE `ownerId` = 1 AND LOWER(`name`) = 'erp');

-- Settings main-project designation. The marked project controls ERP-specific Agreement fields.
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'projects' AND column_name = 'isMain'), 'SELECT 1', 'ALTER TABLE `projects` ADD COLUMN `isMain` BOOLEAN NOT NULL DEFAULT FALSE AFTER `clientIdPrefix`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
UPDATE `projects` SET `isMain` = CASE WHEN LOWER(`name`) = 'erp' THEN 1 ELSE 0 END WHERE `ownerId` = 1 AND EXISTS (SELECT 1 FROM `projects` WHERE `ownerId` = 1 AND LOWER(`name`) = 'erp');
SELECT `id`, `name`, `clientIdPrefix`, `isMain`, `nextClientId` FROM `projects` WHERE `ownerId` = 1 ORDER BY `isMain` DESC, `name`;

-- Standalone Clients module: Add Client records with project-generated Client IDs.
CREATE TABLE IF NOT EXISTS `clients` (
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
  `status` enum('Active','Inactive','Hold','Cancelled','Renewal','Extended','Closed') NOT NULL DEFAULT 'Active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_clientId_unique` (`clientId`)
);

-- Add Client price and standard GST fields for the simplified Add Client workflow.
SET @db_name = DATABASE();
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'clients' AND column_name = 'price'), 'SELECT 1', 'ALTER TABLE `clients` ADD COLUMN `price` DECIMAL(14,2) NOT NULL DEFAULT 0.00');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'clients' AND column_name = 'gstRate'), 'SELECT 1', 'ALTER TABLE `clients` ADD COLUMN `gstRate` DECIMAL(5,2) NOT NULL DEFAULT 18.00');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'clients' AND column_name = 'gstMode'), 'SELECT 1', 'ALTER TABLE `clients` ADD COLUMN `gstMode` ENUM(''inclusive'',''exclusive'') NOT NULL DEFAULT ''exclusive''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'clients' AND column_name = 'gstAmount'), 'SELECT 1', 'ALTER TABLE `clients` ADD COLUMN `gstAmount` DECIMAL(14,2) NOT NULL DEFAULT 0.00');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Expand standalone Client statuses for edit and lifecycle management.
ALTER TABLE `clients` MODIFY COLUMN `status` enum('Active','Inactive','Hold','Cancelled','Renewal','Extended','Closed') NOT NULL DEFAULT 'Active';

-- Persist the client lifecycle status separately from the agreement approval status.
SET @sql = IF(EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = @db_name AND table_name = 'agreements' AND column_name = 'clientStatus'), 'SELECT 1', 'ALTER TABLE `agreements` ADD COLUMN `clientStatus` ENUM(''Active'',''Inactive'',''Hold'',''Cancelled'',''Renewal'',''Extended'',''Closed'') NULL AFTER `status`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
