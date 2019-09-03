ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `isDeleted` INT NOT NULL DEFAULT 0 AFTER `fullName`;

CREATE TABLE `applicationdomain`.`events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `applicationdomain`.`journalentries` (
  `id` INT NOT NULL,
  `createdBy` INT NOT NULL,
  `createDate` DATETIME NOT NULL,
  `accountDebit` INT NOT NULL,
  `accountCredit` INT NOT NULL,
  `amount` DECIMAL NOT NULL,
  `description` TEXT NOT NULL,
  `approverId` INT NULL,
  `approvedDate` DATETIME NULL,
  PRIMARY KEY (`id`));