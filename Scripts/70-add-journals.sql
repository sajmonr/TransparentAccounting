CREATE TABLE `applicationdomain`.`journals` (
                                                `id` INT NOT NULL AUTO_INCREMENT,
                                                `name` VARCHAR(100) NOT NULL,
                                                PRIMARY KEY (`id`),
                                                UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO `applicationdomain`.`journals` (`name`) VALUES ('General Journal');

ALTER TABLE `applicationdomain`.`journalentries`
    CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ,
    ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;
;

ALTER TABLE `applicationdomain`.`journalentries`
    ADD COLUMN `journalId` INT NOT NULL DEFAULT 1 AFTER `approvedDate`;

ALTER TABLE `applicationdomain`.`journalentries`
    ADD COLUMN `type` INT NOT NULL DEFAULT 1 AFTER `journalId`;

CREATE TABLE `applicationdomain`.`journalentrytypes` (
                                                        `id` INT NOT NULL AUTO_INCREMENT,
                                                        `name` VARCHAR(45) NOT NULL,
                                                        PRIMARY KEY (`id`),
                                                        UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO `applicationdomain`.`journalentrytypes` (`name`) VALUES ('Regular');
INSERT INTO `applicationdomain`.`journalentrytypes` (`name`) VALUES ('Adjusting');

CREATE TABLE `applicationdomain`.`journaltransactions` (
                                                           `id` INT NOT NULL AUTO_INCREMENT,
                                                           `createdBy` INT NOT NULL,
                                                           `createDate` DATETIME NOT NULL DEFAULT now(),
                                                           `description` VARCHAR(1000) NULL,
                                                           `approvedBy` INT NULL,
                                                           `approveDate` DATETIME NULL,
                                                           `journalId` INT NOT NULL DEFAULT 1,
                                                           `type` INT NOT NULL DEFAULT 1,
                                                           PRIMARY KEY (`id`),
                                                           UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
ALTER TABLE `applicationdomain`.`journalentries`
    DROP COLUMN `type`,
    DROP COLUMN `journalId`,
    DROP COLUMN `approvedDate`,
    DROP COLUMN `approverId`,
    DROP COLUMN `description`,
    DROP COLUMN `createDate`,
    DROP COLUMN `createdBy`,
    ADD COLUMN `transactionId` INT NOT NULL AFTER `amount`;