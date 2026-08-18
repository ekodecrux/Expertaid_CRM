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

SELECT `id`, `ownerId`, `companyGst`, `companyAddress`, `receiptPrefix`, `receiptNumberStart`, `receiptNumberNext`, `terms`, `accountCompanyName`, `accountNumber`, `accountIfsc`, `accountBranch`, `logoUrl`, `logoKey`, `signatureUrl`, `signatureKey`, `createdAt`, `updatedAt`
FROM `receiptSettings` WHERE `ownerId` = 1 LIMIT 1;

-- Important: this script does not insert passwords, URLs, or credentials.
-- If a table itself is missing, run docs/hostinger-invoice-receipt.sql first.

-- Potentially dangerous statements intentionally omitted:
-- DROP TABLE, TRUNCATE, DELETE, and DROP COLUMN.

