ALTER TABLE `applicationdomain`.`events` 
ADD COLUMN `original` VARCHAR(250) NULL AFTER `description`,
ADD COLUMN `updated` VARCHAR(250) NULL AFTER `original`;
