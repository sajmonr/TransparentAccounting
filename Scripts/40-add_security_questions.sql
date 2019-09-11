CREATE TABLE `applicationdomain`.`securityquestions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(300) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
  ALTER TABLE `applicationdomain`.`users` 
ADD COLUMN `securityQuestion` INT NOT NULL AFTER `address`,
ADD COLUMN `securityAnswer` VARCHAR(45) NULL AFTER `securityQuestion`;

INSERT INTO `applicationdomain`.`securityquestions` (`question`) VALUES ('Where did you go to high school?');
update `applicationdomain`.`users` set securityQuestion = 1, securityAnswer = 'secret' where id > 0