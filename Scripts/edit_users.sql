ALTER TABLE `applicationdomain`.`users` 
CHANGE COLUMN `password` `password` VARCHAR(256) NOT NULL ;

ALTER TABLE `applicationdomain`.`users` 
CHANGE COLUMN `isActive` `isActive` INT(11) NOT NULL DEFAULT '0' ;

CREATE TABLE `applicationdomain`.`passwordhistory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);