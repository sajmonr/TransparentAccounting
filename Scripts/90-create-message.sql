CREATE TABLE `applicationdomain`.`messagetype` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO `applicationdomain`.`messagetype` (`id`, `name`) VALUES ('0', 'success');
INSERT INTO `applicationdomain`.`messagetype` (`id`, `name`) VALUES ('1', 'error');
INSERT INTO `applicationdomain`.`messagetype` (`id`, `name`) VALUES ('2', 'info');

CREATE TABLE `applicationdomain`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `modalMessage` VARCHAR(256) NULL,
  `messageType` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`messageType` ASC) VISIBLE,
  CONSTRAINT `id`
    FOREIGN KEY (`messageType`)
    REFERENCES `applicationdomain`.`messagetype` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);
    
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1000,'Feature Not Implemented','This feature has not been implemented yet. Try again later.',1);
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1001,'Account cannot be deactivated','This account does not have a zero balance.',1);
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1002,'Account Deactivation Successful','This account was successfully deactivated.',0);
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1003,'Unauthorized','You are unauthorized to complete this action',1);
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1004,'Chart Of Accounts Help','This page allows you to create, edit, and deactivate accounts.',2);
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1005,'Duplicate Account Information','This action is not allowed. Either an ID or Name is already in the database',1);
INSERT INTO `applicationdomain`.`messages` (`id`,`title`,`modalMessage`,`messageType`) VALUES (1006,'Account Activation Successful','This account was successfully activated.',0);

