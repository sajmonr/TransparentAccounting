CREATE DATABASE if not exists `applicationdomain` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
use `applicationdomain`;

drop table if exists `users`;
drop table if exists `categories`;
drop table if exists `subcategories`;
drop table if exists `accounts`;

CREATE TABLE `users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT,
                         `username` varchar(45) NOT NULL,
                         `role` int(11) NOT NULL,
                         `password` varchar(45) NOT NULL,
                         `isActive` int(11) NOT NULL DEFAULT '1',
                         `fullName` varchar(45) NOT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categories` (
                              `id` int(11) NOT NULL AUTO_INCREMENT,
                              `name` varchar(45) NOT NULL,
                              PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subcategories` (
                                 `id` int(11) NOT NULL AUTO_INCREMENT,
                                 `name` varchar(45) NOT NULL,
                                 `categoryId` int(11) NOT NULL,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `accounts` (
                            `id` int(11) NOT NULL AUTO_INCREMENT,
                            `name` varchar(45) NOT NULL,
                            `normalSide` int(11) NOT NULL,
                            `beginningBalance` decimal(10,0) NOT NULL DEFAULT '0',
                            `categoryId` int(11) NOT NULL,
                            `order` int(11) NOT NULL,
                            `statementId` int(11) NOT NULL,
                            `active` int(11) NOT NULL DEFAULT '1',
                            `balance` decimal(10,0) NOT NULL,
                            `subcategoryId` int(11) NOT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

truncate table `users`;
truncate table `categories`;
truncate table `subcategories`;
truncate table `accounts`;

insert into users(username, role, password, fullName) values('administrator', 0, 'password', 'John Doe');
insert into users(username, role, password, fullName) values('manager', 1, 'password', 'Jane Doe');

insert into categories(name) values('Assets');
insert into categories(name) values('Liabilities');
insert into categories(name) values('Revenues');
insert into categories(name) values('Expenses');
insert into categories(name) values('Equity');

insert into subcategories(name, categoryId) values('Cash', 1);
insert into subcategories(name, categoryId) values('A/R', 1);
insert into subcategories(name, categoryId) values('A/P', 2);

insert into accounts(name, normalSide, beginningBalance, categoryId, `order`, statementId, active, balance, subcategoryId) values('Cash', 0, 0, 1, 1, 1, 1, 0, 1);
insert into accounts(name, normalSide, beginningBalance, categoryId, `order`, statementId, active, balance, subcategoryId) values('AP', 1, 0, 2, 1, 1, 1, 0, 2);
insert into accounts(name, normalSide, beginningBalance, categoryId, `order`, statementId, active, balance, subcategoryId) values('AR', 0, 0, 1, 2, 1, 1, 0, 3);
