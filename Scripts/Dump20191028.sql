-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: applicationdomain
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `accountId` int(11) NOT NULL,
  `subcategoryId` int(11) NOT NULL,
  `credit` decimal(10,0) NOT NULL,
  `debit` decimal(10,0) NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `dateAdded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateModified` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `contraAccount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Cash',0,0,1,0,0,1,8875,10100,1,0,8875,NULL,'2019-10-23 17:02:51','2019-10-24 09:45:22',0),(2,'Prepaid Insurance',0,0,1,0,0,1,1650,15300,11,0,1650,NULL,'2019-10-23 17:04:53','2019-10-24 09:48:24',0),(3,'Office Equipment',0,0,1,0,0,1,9300,17300,8,0,9300,NULL,'2019-10-23 17:05:29','2019-10-23 18:24:50',0),(4,'Accumulated Depriciation',1,0,1,0,0,1,500,18100,21,500,0,NULL,'2019-10-23 17:19:47','2019-10-24 10:48:26',1),(5,'Accounts Payable',1,0,2,0,0,1,1000,21000,3,1000,0,NULL,'2019-10-23 17:20:11','2019-10-23 18:28:17',0),(6,'Accounts Receivable',0,0,1,0,0,1,3450,12100,2,0,3450,NULL,'2019-10-23 17:20:32','2019-10-24 09:45:20',0),(7,'Supplies',0,0,1,0,0,1,1020,14100,7,0,1020,NULL,'2019-10-23 17:20:54','2019-10-24 09:48:27',0),(8,'Salaries Payable',1,0,2,0,0,1,20,22100,5,20,0,NULL,'2019-10-23 17:21:23','2019-10-24 09:48:31',0),(9,'Unearned Revenue',1,0,2,0,0,1,1000,31011,12,1000,0,NULL,'2019-10-23 17:22:00','2019-10-24 09:48:35',0),(10,'Prepaid Rent',0,0,1,0,0,1,3000,15301,11,0,3000,NULL,'2019-10-23 17:22:18','2019-10-24 09:48:33',0),(11,'Contributed Capital',1,0,5,0,0,1,20250,27100,9,20250,0,NULL,'2019-10-23 17:22:39','2019-10-23 17:30:59',0),(12,'Rent Expense',0,0,4,0,0,1,1500,59101,25,0,1500,NULL,'2019-10-23 17:22:54','2019-10-24 09:48:33',0),(13,'Supplies Expense',0,0,4,0,0,1,980,59200,26,0,980,NULL,'2019-10-23 17:23:09','2019-10-24 10:53:08',0),(14,'Retained Earnings',1,0,5,0,0,1,0,27500,23,0,0,NULL,'2019-10-23 17:23:30',NULL,0),(15,'Salaries Expense',0,0,4,0,0,1,5320,59100,16,0,5320,NULL,'2019-10-23 17:23:51','2019-10-24 09:48:31',0),(16,'Telephone Expense',0,0,4,0,0,1,130,59600,17,0,130,NULL,'2019-10-23 17:24:32','2019-10-24 09:45:13',0),(17,'Service Revenue',1,0,3,0,0,1,13425,31010,15,13425,0,NULL,'2019-10-23 17:24:55','2019-10-24 09:48:35',0),(18,'Insurance Expense',0,0,4,0,0,1,150,59103,26,0,150,NULL,'2019-10-23 17:25:10','2019-10-24 09:48:24',0),(19,'Depreciation Expense',0,0,4,0,0,1,500,59104,26,0,500,NULL,'2019-10-23 17:25:31','2019-10-24 10:48:26',0),(20,'Utilities Expense',0,0,4,0,0,1,200,59201,18,0,200,NULL,'2019-10-23 17:25:49','2019-10-24 09:45:15',0),(21,'Advertising Expense',0,0,4,0,0,1,120,59102,26,0,120,NULL,'2019-10-23 17:26:02','2019-10-23 18:28:15',0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `path` varchar(300) NOT NULL,
  `transactionId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (1,'170px-ReceiptSwiss.jpg','uploads/d34901fd-17fe-43f5-838a-60f377f94dad.jpg',2),(2,'170px-ReceiptSwiss.jpg','uploads/385afd71-6927-46b7-bed4-0fbe989acb09.jpg',6);
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Assets'),(2,'Liabilities'),(3,'Revenues'),(4,'Expenses'),(5,'Equity');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `description` text NOT NULL,
  `original` varchar(3000) DEFAULT NULL,
  `updated` varchar(3000) DEFAULT NULL,
  `eventType` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journalentries`
--

DROP TABLE IF EXISTS `journalentries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journalentries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `transactionId` int(11) NOT NULL,
  `side` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journalentries`
--

LOCK TABLES `journalentries` WRITE;
/*!40000 ALTER TABLE `journalentries` DISABLE KEYS */;
INSERT INTO `journalentries` VALUES (1,10000.00,1,0,1),(2,1500.00,1,0,6),(3,1250.00,1,0,7),(4,7500.00,1,0,3),(5,20250.00,1,1,11),(6,4500.00,2,0,10),(7,4500.00,2,1,1),(8,1800.00,3,0,2),(9,1800.00,3,1,1),(10,3000.00,4,0,1),(11,3000.00,4,1,9),(12,1800.00,5,0,3),(13,1800.00,5,1,5),(14,800.00,6,0,1),(15,800.00,6,1,6),(16,120.00,7,0,21),(17,120.00,7,1,1),(18,800.00,8,0,5),(19,800.00,8,1,1),(20,2250.00,9,0,6),(21,2250.00,9,1,17),(22,400.00,10,0,15),(23,400.00,10,1,1),(24,3175.00,11,0,1),(25,3175.00,11,1,17),(26,750.00,12,0,7),(27,750.00,12,1,1),(28,1100.00,13,0,6),(29,1100.00,13,1,17),(30,1850.00,14,0,1),(31,1850.00,14,1,17),(32,1600.00,15,0,1),(33,1600.00,15,1,6),(34,400.00,16,0,15),(35,400.00,16,1,1),(36,130.00,17,0,16),(37,130.00,17,1,1),(38,200.00,18,0,20),(39,200.00,18,1,1),(40,2050.00,19,0,1),(41,2050.00,19,1,17),(42,1000.00,20,0,6),(43,1000.00,20,1,17),(44,4500.00,21,0,15),(45,4500.00,21,1,1),(46,150.00,22,0,18),(47,150.00,22,1,2),(48,980.00,23,0,13),(49,980.00,23,1,7),(52,20.00,25,0,15),(53,20.00,25,1,8),(54,1500.00,26,0,12),(55,1500.00,26,1,10),(56,2000.00,27,0,9),(57,2000.00,27,1,17),(58,500.00,28,0,19),(59,500.00,28,1,4);
/*!40000 ALTER TABLE `journalentries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journalentrytypes`
--

DROP TABLE IF EXISTS `journalentrytypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journalentrytypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journalentrytypes`
--

LOCK TABLES `journalentrytypes` WRITE;
/*!40000 ALTER TABLE `journalentrytypes` DISABLE KEYS */;
INSERT INTO `journalentrytypes` VALUES (1,'Regular'),(2,'Adjusting');
/*!40000 ALTER TABLE `journalentrytypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journals`
--

DROP TABLE IF EXISTS `journals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journals`
--

LOCK TABLES `journals` WRITE;
/*!40000 ALTER TABLE `journals` DISABLE KEYS */;
INSERT INTO `journals` VALUES (1,'General Journal');
/*!40000 ALTER TABLE `journals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journaltransactions`
--

DROP TABLE IF EXISTS `journaltransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journaltransactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdBy` int(11) NOT NULL,
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(1000) DEFAULT NULL,
  `resolvedBy` int(11) DEFAULT NULL,
  `resolveDate` datetime DEFAULT NULL,
  `journalId` int(11) NOT NULL DEFAULT '1',
  `type` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journaltransactions`
--

LOCK TABLES `journaltransactions` WRITE;
/*!40000 ALTER TABLE `journaltransactions` DISABLE KEYS */;
INSERT INTO `journaltransactions` VALUES (1,2,'2019-10-23 17:30:11','',2,'2019-10-23 17:31:00',1,0,1),(2,2,'2019-10-23 17:30:54',NULL,2,'2019-10-23 17:31:18',1,0,1),(3,2,'2019-10-23 18:15:28','',2,'2019-10-23 18:16:04',1,0,1),(4,2,'2019-10-23 18:16:00',NULL,2,'2019-10-23 18:16:07',1,0,1),(5,2,'2019-10-23 18:18:18','',2,'2019-10-23 18:24:51',1,0,1),(6,2,'2019-10-23 18:18:45',NULL,2,'2019-10-23 18:24:53',1,0,1),(7,2,'2019-10-23 18:25:34','',2,'2019-10-23 18:28:15',1,0,1),(8,2,'2019-10-23 18:26:20',NULL,2,'2019-10-23 18:28:18',1,0,1),(9,2,'2019-10-23 18:26:58',NULL,2,'2019-10-23 18:28:21',1,0,1),(10,2,'2019-10-23 18:27:40',NULL,2,'2019-10-23 18:28:23',1,0,1),(11,2,'2019-10-23 18:28:12',NULL,2,'2019-10-23 18:28:26',1,0,1),(12,2,'2019-10-24 09:33:34','',2,'2019-10-24 09:38:02',1,0,1),(13,2,'2019-10-24 09:36:39','',2,'2019-10-24 09:38:04',1,0,1),(14,2,'2019-10-24 09:37:02',NULL,2,'2019-10-24 09:38:06',1,0,1),(15,2,'2019-10-24 09:37:24',NULL,2,'2019-10-24 09:38:08',1,0,1),(16,2,'2019-10-24 09:37:52',NULL,2,'2019-10-24 09:38:11',1,0,1),(17,2,'2019-10-24 09:42:08','',2,'2019-10-24 09:45:14',1,0,1),(18,2,'2019-10-24 09:42:59','',2,'2019-10-24 09:45:16',1,0,1),(19,2,'2019-10-24 09:44:24','',2,'2019-10-24 09:45:18',1,0,1),(20,2,'2019-10-24 09:44:43',NULL,2,'2019-10-24 09:45:20',1,0,1),(21,2,'2019-10-24 09:45:10',NULL,2,'2019-10-24 09:45:23',1,0,1),(22,2,'2019-10-24 09:46:40','',2,'2019-10-24 09:48:25',1,0,1),(23,2,'2019-10-24 09:47:00',NULL,2,'2019-10-24 09:48:27',1,0,1),(25,2,'2019-10-24 09:47:36',NULL,2,'2019-10-24 09:48:31',1,0,1),(26,2,'2019-10-24 09:47:56',NULL,2,'2019-10-24 09:48:33',1,0,1),(27,2,'2019-10-24 09:48:21',NULL,2,'2019-10-24 09:48:35',1,0,1),(28,2,'2019-10-24 10:48:23','',2,'2019-10-24 10:48:26',1,0,1);
/*!40000 ALTER TABLE `journaltransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `modalMessage` varchar(256) DEFAULT NULL,
  `messageType` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`messageType`),
  CONSTRAINT `id` FOREIGN KEY (`messageType`) REFERENCES `messagetype` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1000,'Feature Not Implemented','This feature has not been implemented yet. Try again later.',1),(1001,'Account cannot be deactivated','This account does not have a zero balance.',1),(1002,'Account Deactivation Successful','This account was successfully deactivated.',0),(1003,'Unauthorized','You are unauthorized to complete this action',1),(1004,'Chart Of Accounts Help','This page allows you to create, edit, and deactivate accounts.',2),(1005,'Duplicate Account Information','This action is not allowed. Either an ID or Name is already in the database',1),(1006,'Account Activation Successful','This account was successfully activated.',0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messagetype`
--

DROP TABLE IF EXISTS `messagetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messagetype` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messagetype`
--

LOCK TABLES `messagetype` WRITE;
/*!40000 ALTER TABLE `messagetype` DISABLE KEYS */;
INSERT INTO `messagetype` VALUES (0,'success'),(1,'error'),(2,'info');
/*!40000 ALTER TABLE `messagetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordhistory`
--

DROP TABLE IF EXISTS `passwordhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `password` varchar(256) NOT NULL,
  `added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordhistory`
--

LOCK TABLES `passwordhistory` WRITE;
/*!40000 ALTER TABLE `passwordhistory` DISABLE KEYS */;
INSERT INTO `passwordhistory` VALUES (1,6,'6fa4d7fe116cec75a814426d68b4ab89353a1dd82033572ad9feb381ff0c547d','0001-01-01 00:00:00'),(2,2,'a930be183849585b528b165addb55a11edb8d191e5771b5ea7b725667d04ee3a','0001-01-01 00:00:00'),(3,6,'65d434d416c5dd611f29b2baa579e34b00f574daff4588178eb31dcdab5ed736','0001-01-01 00:00:00'),(4,1,'cd0ab6ff3e8c16e5de87df0727467dda95722f80b026f0c5df4e8cf8bf3389b1','0001-01-01 00:00:00'),(5,8,'cd0ab6ff3e8c16e5de87df0727467dda95722f80b026f0c5df4e8cf8bf3389b1','0001-01-01 00:00:00'),(6,12,'cd0ab6ff3e8c16e5de87df0727467dda95722f80b026f0c5df4e8cf8bf3389b1','0001-01-01 00:00:00'),(7,8,'1b963ab53c0867e68251efa2e477e33adf7ee9222f4400fd95499495a8282894','0001-01-01 00:00:00'),(8,13,'a930be183849585b528b165addb55a11edb8d191e5771b5ea7b725667d04ee3a','0001-01-01 00:00:00'),(9,13,'1b963ab53c0867e68251efa2e477e33adf7ee9222f4400fd95499495a8282894','0001-01-01 00:00:00');
/*!40000 ALTER TABLE `passwordhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `securityquestions`
--

DROP TABLE IF EXISTS `securityquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `securityquestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `securityquestions`
--

LOCK TABLES `securityquestions` WRITE;
/*!40000 ALTER TABLE `securityquestions` DISABLE KEYS */;
INSERT INTO `securityquestions` VALUES (1,'Where did you go to high school?');
/*!40000 ALTER TABLE `securityquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Cash',1),(2,'Accounts Receivable',1),(3,'Accounts Payable',2),(4,'Owner\'s equity',5),(5,'Salaries Payable',2),(6,'Accounts Receivable',1),(7,'Supplies',1),(8,'Equipment',1),(9,'Contributed Capital',5),(11,'Prepaid Items',1),(12,'Unearned Revenue',2),(13,'Accounts Payable',2),(14,'Advertising Expense',4),(15,'Service Revenue',3),(16,'Salaries Expense',4),(17,'Telephone Expense',4),(18,'Utilities Expense',4),(19,'Insurance Expense',4),(20,'Depreciation Expense',4),(21,'Accumulated Depreciation',1),(22,'Sales Revenue',3),(23,'Retained Earnings',5),(24,'Dividends',5),(25,'Rent Expense',4),(26,'Other Expense',4);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `role` int(11) NOT NULL,
  `password` varchar(256) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '0',
  `fullName` varchar(45) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `suspendFrom` datetime DEFAULT NULL,
  `suspendTo` datetime DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `passwordTries` int(11) NOT NULL DEFAULT '0',
  `passwordExpiration` datetime NOT NULL,
  `address` varchar(300) NOT NULL,
  `securityQuestion` int(11) NOT NULL,
  `securityAnswer` varchar(45) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'administrator',0,'5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',1,'John Doe',0,NULL,NULL,'transparent.app.domain@gmail.com',0,'2020-01-17 13:43:46','',1,'secret','0001-01-01'),(2,'manager',1,'5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',1,'Jane Doe',0,NULL,NULL,'transparent.app.domain@gmail.com',0,'2020-01-17 13:43:46','123 main st',1,'secret','0001-01-01'),(6,'accountant',2,'5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',1,'Adam Simonicek',0,NULL,NULL,'transparent.app.domain@gmail.com',0,'2020-01-17 13:43:46','2120 Stone Hollow Ct',1,'nowhere','0001-01-01'),(8,'jsmith0919',0,'1b963ab53c0867e68251efa2e477e33adf7ee9222f4400fd95499495a8282894',1,'John Smith',0,NULL,NULL,'transparent.app.domain@gmail.com',0,'2020-01-17 13:43:46','987 some ave',1,'nowhere2','1994-08-01'),(9,'esmith0919',2,'cd0ab6ff3e8c16e5de87df0727467dda95722f80b026f0c5df4e8cf8bf3389b1',1,'Emma Smith',1,NULL,NULL,'transparent.app.domain@gmail.com',0,'2020-01-17 13:43:46','123 main st',1,'secret','1997-08-08'),(13,'mholmes0919',2,'1b963ab53c0867e68251efa2e477e33adf7ee9222f4400fd95499495a8282894',1,'Michael Holmes',0,NULL,NULL,'transparent.app.domain@gmail.com',0,'2020-01-17 13:43:46','2574 Bridge St',1,'secret','1997-08-08');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-28 13:15:14
