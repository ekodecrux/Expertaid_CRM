-- ERP CRM production data migration
-- Run once in the Hostinger MySQL database before restarting the Node.js application.
-- This table stores all quotation settings as database data, not source-code data.

CREATE TABLE IF NOT EXISTS `quotationSettingsData` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `ownerId` INT NOT NULL,
  `settingsJson` TEXT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quotationSettingsData_ownerId_unique` (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Existing legacy quotationSettings data is read once by the application and
-- migrated into quotationSettingsData on the first authenticated request.
-- Do not drop the legacy table until the migration has been verified in production.

-- Uploaded logos, scanners, signatures, and branding files remain in the
-- server-side uploads/ directory and are intentionally not stored in Git.
