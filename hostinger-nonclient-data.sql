-- Expertaid CRM non-client setup data export
-- Source: current CRM application setup data
-- Included: users, sessions, branding, quotation settings, products, account details, terms
-- Excluded intentionally: agreements, quotations, clients, and quotation edit history
-- Import this after importing hostinger-crm-schema.sql and selecting the target database.
-- No passwords are included. Configure CRM_LOGIN_PASSWORD and JWT_SECRET in hosting environment variables.

SET NAMES utf8mb4;

-- Existing application users. These are real account records from the current CRM.
INSERT INTO `users`
  (`id`, `openId`, `name`, `email`, `loginMethod`, `role`, `createdAt`, `updatedAt`, `lastSignedIn`, `companyLogoUrl`, `companyLogoKey`, `companyName`, `serviceCaption`, `footerCompanyName`, `sessionMode`, `currentSession`)
VALUES
  (1, 'oWcGYuSNDaZM5Y9LbZXWCa', 'instant experts', 'expertsinstant@gmail.com', 'google', 'admin', '2026-08-13 07:46:54', '2026-08-14 18:44:52', '2026-08-14 18:44:52', NULL, NULL, 'Expertaid Technologies Pvt. Ltd.', 'ERP Solutions • Software Development • IT Support', 'Expertaid Technologies Pvt Ltd', 'single', '2026-2027'),
  (750049, 'bY3GKByJwUjaVbx55VPUcU', 'Prabas Ravi Kumar', 'pravidnk8498@gmail.com', 'google', 'user', '2026-08-13 09:01:03', '2026-08-13 09:01:09', '2026-08-13 09:01:09', NULL, NULL, NULL, NULL, NULL, 'single', '2026-2027'),
  (750060, 'FNVCfmBm66YGnauX94hHvV', 'Thaneeru Mahesh', 'thaneerumahesh9696@gmail.com', 'google', 'user', '2026-08-13 09:02:17', '2026-08-13 09:02:19', '2026-08-13 09:02:20', NULL, NULL, NULL, NULL, NULL, 'single', '2026-2027'),
  (840004, 'CB65K8NAYrKEeDyZHKnHqK', 'ExpertAid Technologies Pvt Ltd', 'expertaidtech@gmail.com', 'google', 'user', '2026-08-13 09:14:13', '2026-08-13 11:07:02', '2026-08-14 11:07:03', NULL, NULL, NULL, NULL, NULL, 'all', '2026-2027'),
  (2130006, 'MXVL3g2jEA9QAgykSXtZkM', 'Joshan Kumar', 'joshan043@gmail.com', 'google', 'user', '2026-08-13 11:11:40', '2026-08-13 11:11:43', '2026-08-13 11:11:44', NULL, NULL, NULL, NULL, NULL, 'single', '2026-2027')
ON DUPLICATE KEY UPDATE
  `openId` = VALUES(`openId`),
  `name` = VALUES(`name`),
  `email` = VALUES(`email`),
  `loginMethod` = VALUES(`loginMethod`),
  `role` = VALUES(`role`),
  `companyLogoUrl` = VALUES(`companyLogoUrl`),
  `companyLogoKey` = VALUES(`companyLogoKey`),
  `companyName` = VALUES(`companyName`),
  `serviceCaption` = VALUES(`serviceCaption`),
  `footerCompanyName` = VALUES(`footerCompanyName`),
  `sessionMode` = VALUES(`sessionMode`),
  `currentSession` = VALUES(`currentSession`),
  `updatedAt` = VALUES(`updatedAt`),
  `lastSignedIn` = VALUES(`lastSignedIn`);

-- Academic session configuration.
INSERT INTO `sessions`
  (`id`, `ownerId`, `sessionLabel`, `startDate`, `endDate`, `createdAt`)
VALUES
  (1, 1, '2027-2028', '2027-04-01', '2028-03-31', '2026-08-14 06:36:55')
ON DUPLICATE KEY UPDATE
  `ownerId` = VALUES(`ownerId`),
  `sessionLabel` = VALUES(`sessionLabel`),
  `startDate` = VALUES(`startDate`),
  `endDate` = VALUES(`endDate`),
  `createdAt` = VALUES(`createdAt`);

-- Quotation settings, products, terms, account details, and storage references.
-- logoUrl and signatureUrl point to the original Manus storage and may need to be re-uploaded in Hostinger.
INSERT INTO `quotationSettings`
  (`id`, `ownerId`, `companyGst`, `companyAddress`, `validityDays`, `gstRate`, `gstMode`, `quotationPrefix`, `invoiceNumberStart`, `invoiceNumberNext`, `terms`, `productsJson`, `logoUrl`, `logoKey`, `scannerUrl`, `scannerKey`, `signatureUrl`, `signatureKey`, `accountCompanyName`, `accountNumber`, `accountIfsc`, `accountBranch`, `createdAt`, `updatedAt`)
VALUES
  (1, 1, '36AAGCE2615N1ZH', 'Survey No. 202, Ashoknagar, Hyderabad, Telangana 502032', 15, 18.00, 'exclusive', 'QT2601', 1, 4, 'Goods Once Sold Will Not be taken back', '[{"product":"ERP","productName":"ERP","itemName":"(Educational Management Software)","quantity":1,"unitPrice":10000},{"product":"ERP","productName":"Biometric","itemName":"Finger print","quantity":1,"unitPrice":7500},{"product":"ERP","productName":"Whatsapp","itemName":"Whatsapp integration","quantity":1,"unitPrice":3000},{"product":"ERP","productName":"Biometric","itemName":"Face","quantity":1,"unitPrice":18000}]', '/manus-storage/quotations/ZOYxEmGHV5/logo_65c750b0.png', 'quotations/ZOYxEmGHV5/logo_65c750b0.png', NULL, NULL, '/manus-storage/quotations/lTLB7kIQFD/signature_9a170d87.jpg', 'quotations/lTLB7kIQFD/signature_9a170d87.jpg', 'Expertaid Technologies Pvt Ltd.', '502000055251128', 'HDFC0009147', 'Ameerpur Branch, Hyd, TS-502032', '2026-08-14 07:09:40', '2026-08-14 15:35:52')
ON DUPLICATE KEY UPDATE
  `companyGst` = VALUES(`companyGst`),
  `companyAddress` = VALUES(`companyAddress`),
  `validityDays` = VALUES(`validityDays`),
  `gstRate` = VALUES(`gstRate`),
  `gstMode` = VALUES(`gstMode`),
  `quotationPrefix` = VALUES(`quotationPrefix`),
  `invoiceNumberStart` = VALUES(`invoiceNumberStart`),
  `invoiceNumberNext` = VALUES(`invoiceNumberNext`),
  `terms` = VALUES(`terms`),
  `productsJson` = VALUES(`productsJson`),
  `logoUrl` = VALUES(`logoUrl`),
  `logoKey` = VALUES(`logoKey`),
  `scannerUrl` = VALUES(`scannerUrl`),
  `scannerKey` = VALUES(`scannerKey`),
  `signatureUrl` = VALUES(`signatureUrl`),
  `signatureKey` = VALUES(`signatureKey`),
  `accountCompanyName` = VALUES(`accountCompanyName`),
  `accountNumber` = VALUES(`accountNumber`),
  `accountIfsc` = VALUES(`accountIfsc`),
  `accountBranch` = VALUES(`accountBranch`),
  `updatedAt` = VALUES(`updatedAt`);

-- Verification queries; these do not modify data.
-- SELECT id, email, role, companyName, currentSession FROM users;
-- SELECT * FROM sessions;
-- SELECT ownerId, companyGst, quotationPrefix, productsJson, accountCompanyName FROM quotationSettings;
