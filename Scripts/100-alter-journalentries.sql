ALTER TABLE `applicationdomain`.`journalentries`
    CHANGE COLUMN `debit` `side` INT(11) NOT NULL ;

CREATE TABLE `applicationdomain`.`attachments` (
   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `path` VARCHAR(300) NOT NULL,
   `transactionId` INT NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);