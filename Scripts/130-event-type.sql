ALTER TABLE `applicationdomain`.`events` 
ADD COLUMN `eventType` INT NOT NULL AFTER `updated`;

ALTER TABLE `applicationdomain`.`events`
    CHANGE COLUMN `original` `original` VARCHAR(3000) NULL DEFAULT NULL ,
    CHANGE COLUMN `updated` `updated` VARCHAR(3000) NULL DEFAULT NULL;

TRUNCATE `applicationdomain`.`events`;