-- Expertaid CRM database structure for Hostinger MySQL
-- Import this file after selecting the target database in phpMyAdmin.
-- This script creates tables only when they do not already exist.
-- It does not create, delete, or modify databases and does not insert sample data.

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `openId` VARCHAR(64) NOT NULL,
  `name` TEXT NULL,
  `email` VARCHAR(320) NULL,
  `loginMethod` VARCHAR(64) NULL,
  `role` ENUM('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `companyLogoUrl` TEXT NULL,
  `companyLogoKey` VARCHAR(512) NULL,
  `companyName` VARCHAR(255) NULL,
  `serviceCaption` VARCHAR(255) NULL,
  `footerCompanyName` VARCHAR(255) NULL,
  `sessionMode` ENUM('all','single') NOT NULL DEFAULT 'single',
  `currentSession` VARCHAR(16) NOT NULL DEFAULT '2026-2027',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `sessionLabel` VARCHAR(16) NOT NULL,
  `startDate` VARCHAR(32) NOT NULL,
  `endDate` VARCHAR(32) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sessions_ownerId_idx` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `quotationSettings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `companyGst` VARCHAR(32) NOT NULL,
  `companyAddress` TEXT NOT NULL,
  `validityDays` INT NOT NULL DEFAULT 15,
  `gstRate` DECIMAL(5,2) NOT NULL DEFAULT 18.00,
  `gstMode` ENUM('inclusive','exclusive') NOT NULL DEFAULT 'exclusive',
  `quotationPrefix` VARCHAR(24) NOT NULL DEFAULT 'QT',
  `invoiceNumberStart` INT NOT NULL DEFAULT 129,
  `invoiceNumberNext` INT NOT NULL DEFAULT 129,
  `terms` TEXT NOT NULL,
  `productsJson` TEXT NOT NULL,
  `logoUrl` TEXT NULL,
  `logoKey` VARCHAR(512) NULL,
  `scannerUrl` TEXT NULL,
  `scannerKey` VARCHAR(512) NULL,
  `signatureUrl` TEXT NULL,
  `signatureKey` VARCHAR(512) NULL,
  `accountCompanyName` VARCHAR(255) NULL,
  `accountNumber` VARCHAR(128) NULL,
  `accountIfsc` VARCHAR(64) NULL,
  `accountBranch` VARCHAR(255) NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quotationSettings_ownerId_unique` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `quotationEditHistory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quotationId` INT NOT NULL,
  `ownerId` INT NOT NULL,
  `editedBy` INT NOT NULL,
  `editedByName` VARCHAR(255) NOT NULL,
  `editedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `snapshotJson` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotationEditHistory_quotationId_idx` (`quotationId`),
  KEY `quotationEditHistory_ownerId_idx` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `quotations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `quotationNumber` VARCHAR(32) NOT NULL,
  `invoiceNumber` VARCHAR(32) NULL,
  `estimationNumber` INT NOT NULL DEFAULT 1,
  `status` ENUM('Awaiting','Success','Closed') NOT NULL DEFAULT 'Awaiting',
  `clientName` VARCHAR(255) NOT NULL,
  `clientAddress` TEXT NOT NULL,
  `clientContact` VARCHAR(64) NOT NULL,
  `clientEmail` VARCHAR(320) NULL,
  `clientGst` VARCHAR(32) NULL,
  `quotationDate` VARCHAR(32) NOT NULL,
  `validityDays` INT NOT NULL DEFAULT 15,
  `companyGst` VARCHAR(32) NOT NULL,
  `companyAddress` TEXT NOT NULL,
  `itemsJson` TEXT NOT NULL,
  `subtotal` DECIMAL(14,2) NOT NULL,
  `gstRate` DECIMAL(5,2) NOT NULL,
  `gstMode` ENUM('inclusive','exclusive') NOT NULL DEFAULT 'exclusive',
  `gstAmount` DECIMAL(14,2) NOT NULL,
  `grandTotal` DECIMAL(14,2) NOT NULL,
  `terms` TEXT NULL,
  `scannerUrl` TEXT NULL,
  `scannerKey` VARCHAR(512) NULL,
  `signatureUrl` TEXT NULL,
  `signatureKey` VARCHAR(512) NULL,
  `accountCompanyName` VARCHAR(255) NULL,
  `accountNumber` VARCHAR(128) NULL,
  `accountIfsc` VARCHAR(64) NULL,
  `accountBranch` VARCHAR(255) NULL,
  `lastEditedBy` INT NULL,
  `lastEditedByName` VARCHAR(255) NULL,
  `lastEditedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quotations_quotationNumber_unique` (`quotationNumber`),
  UNIQUE KEY `quotations_invoiceNumber_unique` (`invoiceNumber`),
  KEY `quotations_ownerId_idx` (`ownerId`),
  KEY `quotations_status_idx` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `agreements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `publicToken` VARCHAR(32) NOT NULL,
  `clientName` VARCHAR(255) NOT NULL,
  `clientOwnerName` VARCHAR(255) NOT NULL,
  `instituteType` ENUM('School','College','Academy') NOT NULL DEFAULT 'School',
  `branchCoverage` ENUM('individual','multiple') NOT NULL DEFAULT 'individual',
  `branchCount` INT NOT NULL DEFAULT 1,
  `contactNumber` VARCHAR(64) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `address` TEXT NOT NULL,
  `noOfStudents` INT NOT NULL,
  `pricingMode` ENUM('perStudent','package') NOT NULL DEFAULT 'perStudent',
  `perStudentPrice` DECIMAL(12,2) NULL,
  `packagePrice` DECIMAL(14,2) NULL,
  `noOfYearPlan` INT NOT NULL,
  `startDate` VARCHAR(32) NOT NULL,
  `endDate` VARCHAR(32) NOT NULL,
  `session` VARCHAR(16) NOT NULL DEFAULT '2026-2027',
  `totalPrice` DECIMAL(14,2) NOT NULL,
  `description` TEXT NULL,
  `logoUrl` TEXT NULL,
  `logoKey` VARCHAR(512) NULL,
  `status` ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `signatureUrl` TEXT NULL,
  `signatureKey` VARCHAR(512) NULL,
  `signatureDate` VARCHAR(32) NULL,
  `decidedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `agreements_publicToken_unique` (`publicToken`),
  KEY `agreements_ownerId_idx` (`ownerId`),
  KEY `agreements_status_idx` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional verification queries. They do not modify data.
-- SHOW TABLES;
-- DESCRIBE users;
-- DESCRIBE quotations;
-- DESCRIBE agreements;
