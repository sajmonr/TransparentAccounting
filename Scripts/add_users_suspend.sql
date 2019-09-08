ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `suspendFrom` DATETIME NULL AFTER `isDeleted`,
ADD COLUMN `suspendTo` DATETIME NULL AFTER `suspendFrom`;