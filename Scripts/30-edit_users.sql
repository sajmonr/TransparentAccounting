ALTER TABLE `applicationdomain`.`users` 
CHANGE COLUMN `password` `password` VARCHAR(256) NOT NULL ;

ALTER TABLE `applicationdomain`.`users` 
CHANGE COLUMN `isActive` `isActive` INT(11) NOT NULL DEFAULT '0' ;

ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `email` VARCHAR(100) NULL AFTER `suspendTo`;
ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `passwordTries` INT NOT NULL DEFAULT 0 AFTER `email`;
ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `passwordExpiration` DATETIME NOT NULL AFTER `passwordTries`;
ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `address` VARCHAR(300) NOT NULL AFTER `passwordExpiration`;


CREATE TABLE `applicationdomain`.`passwordhistory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
  ALTER TABLE `applicationdomain`.`passwordhistory` 
ADD COLUMN `added` DATETIME NOT NULL DEFAULT now() AFTER `password`;