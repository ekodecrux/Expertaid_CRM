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
