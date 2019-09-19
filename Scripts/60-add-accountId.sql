UPDATE `applicationdomain`.`accounts` SET `subcategoryId` = '2' WHERE (`id` = '3');
UPDATE `applicationdomain`.`accounts` SET `subcategoryId` = '3' WHERE (`id` = '2');

ALTER TABLE `applicationdomain`.`subcategories` 
ADD COLUMN `accountId` INT NOT NULL AFTER `categoryId`;

update subcategories set accountId = 101 where id = 1;
update subcategories set accountId = 122 where id = 2;
update subcategories set accountId = 202 where id = 3;

ALTER TABLE `applicationdomain`.`subcategories` 
ADD UNIQUE INDEX `accountId_UNIQUE` (`accountId` ASC) VISIBLE;
;

update `applicationdomain`.`users` set passwordExpiration = date_add(now(), interval 120 day) where id > 0;