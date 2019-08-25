CREATE DATABASE `applicationdomain` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
use `applicationdomain`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `role` int(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1',
  `fullName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


insert into users(username, role, password, fullName) values('administrator', 0, 'password', 'John Doe');
insert into users(username, role, password, fullName) values('manager', 1, 'password', 'Jane Doe')
