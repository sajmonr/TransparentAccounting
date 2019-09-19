UPDATE `applicationdomain`.`accounts` SET `subcategoryId` = '2' WHERE (`id` = '3');
UPDATE `applicationdomain`.`accounts` SET `subcategoryId` = '3' WHERE (`id` = '2');

update `applicationdomain`.`users` set passwordExpiration = date_add(now(), interval 120 day) where id > 0;

ALTER TABLE `applicationdomain`.`accounts`
    ADD COLUMN `accountId` INT NOT NULL AFTER `balance`;

UPDATE `applicationdomain`.`accounts` SET `accountId` = '101' WHERE (`id` = '1');
UPDATE `applicationdomain`.`accounts` SET `accountId` = '202' WHERE (`id` = '2');
UPDATE `applicationdomain`.`accounts` SET `accountId` = '122' WHERE (`id` = '3');
