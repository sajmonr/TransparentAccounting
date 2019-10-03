ALTER TABLE `applicationdomain`.`journaltransactions`
    CHANGE COLUMN `approvedBy` `resolvedBy` INT(11) NULL ,
    CHANGE COLUMN `approveDate` `resolveDate` DATETIME NULL,
    CHANGE COLUMN `type` `type` INT(11) NOT NULL DEFAULT 0,
    ADD COLUMN `status` INT NOT NULL DEFAULT 0 AFTER `type`;
