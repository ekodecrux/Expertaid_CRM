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
