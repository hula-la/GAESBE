CREATE DATABASE  IF NOT EXISTS `gaese` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gaese`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: k7e104.p.ssafy.io    Database: gaese
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `ability`
--

DROP TABLE IF EXISTS `ability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ability` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `algorithm_exp` int NOT NULL,
  `algorithm_lv` int NOT NULL,
  `cs_exp` int NOT NULL,
  `cs_lv` int NOT NULL,
  `luck_exp` int NOT NULL,
  `luck_lv` int NOT NULL,
  `typing_exp` int NOT NULL,
  `typing_lv` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_algo` (`algorithm_lv`,`algorithm_exp`),
  KEY `idx_cs` (`cs_lv`,`cs_exp`),
  KEY `idx_typing` (`typing_lv`,`typing_exp`),
  KEY `idx_luck` (`luck_lv`,`luck_exp`),
  KEY `FKpg0ny3rkdxipwpk4kbf9sbj60` (`user_id`),
  CONSTRAINT `FKpg0ny3rkdxipwpk4kbf9sbj60` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ability`
--

LOCK TABLES `ability` WRITE;
/*!40000 ALTER TABLE `ability` DISABLE KEYS */;
INSERT INTO `ability` VALUES (6,0,0,0,0,0,0,6,2,4),(8,0,44,0,44,0,44,5,45,3),(10,0,1,0,1,2,1,3,4,46),(11,0,3,0,3,0,3,5,4,27),(19,1,1,0,1,0,1,5,3,81),(20,1,1,0,1,2,1,0,3,23),(21,0,1,0,1,0,1,2,2,51),(22,0,1,0,1,0,1,5,1,66),(23,0,1,0,1,0,1,6,3,10),(24,0,1,0,1,0,1,4,2,9),(25,0,1,0,1,0,1,3,3,7),(26,0,1,0,1,0,1,3,2,82),(27,0,1,0,1,0,1,0,1,38),(28,0,1,0,1,0,1,0,1,39),(29,0,1,0,1,0,1,0,1,83),(30,0,1,0,1,0,1,0,1,32),(31,0,1,0,1,0,1,0,1,84),(32,0,1,0,1,0,1,0,1,85),(33,0,1,0,1,0,1,0,1,42),(34,0,1,0,1,0,1,0,1,86);
/*!40000 ALTER TABLE `ability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `algo_record`
--

DROP TABLE IF EXISTS `algo_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `algo_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` text,
  `date` datetime(6) NOT NULL,
  `is_retry` bit(1) DEFAULT NULL,
  `is_solve` bit(1) NOT NULL,
  `lan_id` int NOT NULL,
  `problem_id` bigint NOT NULL,
  `ranking` int NOT NULL,
  `room_code` varchar(255) NOT NULL,
  `solve_time` varchar(50) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqbqowsnb2wgl0sp8pciofrqvc` (`user_id`),
  CONSTRAINT `FKqbqowsnb2wgl0sp8pciofrqvc` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `algo_record`
--

LOCK TABLES `algo_record` WRITE;
/*!40000 ALTER TABLE `algo_record` DISABLE KEYS */;
INSERT INTO `algo_record` VALUES (1,'','2022-11-15 06:28:26.127000',_binary '\0',_binary '\0',1001,2557,5,'HVWznFFj','-',7),(2,'','2022-11-15 06:29:49.677000',_binary '\0',_binary '\0',1001,1000,5,'CWILSOCT','-',7),(3,'','2022-11-15 06:33:58.794000',_binary '\0',_binary '\0',1001,5615,5,'NalK53U4','-',7),(4,'','2022-11-15 06:35:13.390000',_binary '\0',_binary '\0',1001,4344,5,'eOjNzPoQ','-',7),(5,'','2022-11-15 06:36:26.594000',_binary '\0',_binary '\0',1001,2751,5,'3paVI2dq','-',7),(6,'','2022-11-15 06:37:41.646000',_binary '\0',_binary '\0',1001,2439,5,'EMWiLvnA','-',7),(7,'','2022-11-15 07:02:37.268000',_binary '\0',_binary '\0',1001,2557,5,'VEqNa77T','-',7),(8,'import java.io.*','2022-11-15 07:18:05.979000',_binary '\0',_binary '\0',1001,1234,1,'5faOlkXx','-',7),(9,'import java.io.*','2022-11-15 07:27:32.846000',_binary '\0',_binary '\0',1001,1234,1,'5faOlkXx','-',7),(10,'','2022-11-15 07:32:22.725000',_binary '\0',_binary '\0',1003,1697,5,'dysf88xN','-',7),(11,'','2022-11-15 15:58:25.262000',_binary '\0',_binary '',1001,2557,1,'ttHh3roH','12',23),(12,'dfsdfsds','2022-11-15 15:59:07.554000',_binary '\0',_binary '',1001,2557,1,'y0DSk3A6','11',4),(14,'','2022-11-16 00:52:11.452000',_binary '\0',_binary '',1001,2557,1,'dRTce9FU','24',4),(15,'','2022-11-16 00:52:26.312000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(16,'','2022-11-16 00:52:34.004000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(17,'','2022-11-16 00:53:08.937000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(18,'','2022-11-16 00:53:36.929000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(19,'','2022-11-16 00:53:42.691000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(20,'','2022-11-16 00:53:44.010000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(21,'','2022-11-16 00:56:17.034000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(22,'','2022-11-16 00:56:34.745000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(23,'','2022-11-16 00:56:38.052000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(24,'','2022-11-16 00:57:27.439000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(25,'','2022-11-16 00:57:30.815000',_binary '\0',_binary '\0',1001,2557,1,'dRTce9FU','-',4),(26,'','2022-11-16 01:02:27.989000',_binary '\0',_binary '',1001,2557,1,'FAmg6qqy','0',4),(27,'','2022-11-16 01:02:56.377000',_binary '\0',_binary '\0',1001,2557,1,'FAmg6qqy','-',4),(28,'','2022-11-16 01:02:59.264000',_binary '\0',_binary '\0',1001,2557,1,'FAmg6qqy','-',4),(29,'','2022-11-16 01:03:15.719000',_binary '\0',_binary '\0',1001,2557,1,'FAmg6qqy','-',4),(30,'di !!!!!!!! ','2022-11-16 01:44:44.356000',_binary '\0',_binary '',1001,2557,1,'2Hk3Vb8Q','0',4),(31,'','2022-11-16 01:47:16.422000',_binary '\0',_binary '\0',1001,2557,1,'2Hk3Vb8Q','-',4),(32,'','2022-11-16 01:48:13.309000',_binary '\0',_binary '\0',1001,2557,1,'2Hk3Vb8Q','-',4),(33,'dfgergergergregergdfv','2022-11-16 01:48:55.924000',_binary '\0',_binary '',1002,1000,1,'InIBrU37','0',4),(34,'dfgergergergregergdfv','2022-11-16 01:51:53.417000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(35,'dfgergergergregergdfv','2022-11-16 01:52:38.314000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(36,'dfgergergergregergdfv','2022-11-16 01:52:47.284000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(37,'dfgergergergregergdfv','2022-11-16 01:53:13.297000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(38,'dfgergergergregergdfv','2022-11-16 01:56:03.344000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(39,'dfgergergergregergdfv','2022-11-16 01:56:16.291000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(40,'dfgergergergregergdfv','2022-11-16 01:56:19.297000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(41,'dfgergergergregergdfv','2022-11-16 01:56:32.113000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(42,'dfgergergergregergdfv','2022-11-16 01:56:42.052000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(43,'dfgergergergregergdfv','2022-11-16 01:56:57.543000',_binary '\0',_binary '\0',1002,1000,1,'InIBrU37','-',4),(44,'dfsfdsfsfdfsfsdf','2022-11-16 01:57:56.609000',_binary '\0',_binary '',1001,2557,1,'Rai5pdgM','0',4),(45,'dfsfdsfsfdfsfsdf','2022-11-16 01:58:13.771000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(46,'dfsfdsfsfdfsfsdf','2022-11-16 02:01:03.320000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(47,'dfsfdsfsfdfsfsdf','2022-11-16 02:01:18.291000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(48,'dfsfdsfsfdfsfsdf','2022-11-16 02:01:28.523000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(49,'dfsfdsfsfdfsfsdf','2022-11-16 02:01:33.285000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(50,'dfsfdsfsfdfsfsdf','2022-11-16 02:01:43.302000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(51,'dfsfdsfsfdfsfsdf','2022-11-16 02:02:02.286000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(52,'dfsfdsfsfdfsfsdf','2022-11-16 02:08:06.337000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(53,'dfsfdsfsfdfsfsdf','2022-11-16 02:08:24.301000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(54,'dfsfdsfsfdfsfsdf','2022-11-16 02:08:46.286000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(55,'dfsfdsfsfdfsfsdf','2022-11-16 02:27:13.215000',_binary '\0',_binary '\0',1001,2557,1,'Rai5pdgM','-',4),(56,'','2022-11-16 03:21:51.672000',_binary '\0',_binary '',1001,2557,1,'l8zvzEx2','12',4),(57,'','2022-11-16 04:38:26.704000',_binary '\0',_binary '',1001,2557,1,'BWmp8rRY','24',4),(58,'','2022-11-16 04:56:47.368000',_binary '\0',_binary '',1001,2557,1,'FgRZkhXG','0',4),(59,'','2022-11-16 05:06:16.222000',_binary '\0',_binary '',1001,2557,1,'IG0TYyMm','0',4),(60,'','2022-11-16 05:08:45.908000',_binary '\0',_binary '',1001,2557,1,'gIk0rsex','0',4),(61,'','2022-11-16 05:13:54.007000',_binary '\0',_binary '',1001,2557,1,'K60bho3f','2',4),(62,'','2022-11-16 05:17:48.937000',_binary '\0',_binary '',1001,2557,1,'dzi5Wm99','0',4),(63,'','2022-11-16 05:27:40.439000',_binary '\0',_binary '',1001,2557,1,'2XHUkpYy','0',4),(64,'','2022-11-16 05:49:41.072000',_binary '\0',_binary '',1001,2557,1,'NEi02Ysh','0',4),(65,'타임 아웃!','2022-11-16 06:15:37.766000',_binary '\0',_binary '\0',1003,1000,5,'POYehCq4','-',7),(66,'','2022-11-16 06:16:37.721000',_binary '\0',_binary '',1001,2557,1,'Q0u3YIY2','3',4),(67,'타임 아웃!','2022-11-16 06:24:54.111000',_binary '\0',_binary '\0',1001,2557,5,'UMs0CfDJ','-',4),(68,'타임 아웃!','2022-11-16 06:26:43.435000',_binary '\0',_binary '\0',1003,2557,5,'YFg9QMjl','-',7),(69,'타임 아웃!','2022-11-16 06:28:59.185000',_binary '\0',_binary '\0',1003,2557,5,'YFg9QMjl','-',7),(70,'','2022-11-16 06:30:03.455000',_binary '\0',_binary '',1003,2557,1,'IgUYkXUL','0',7),(71,'','2022-11-16 06:34:20.995000',_binary '\0',_binary '',1003,2557,1,'PjC12fJY','0',7),(72,'타임 아웃!','2022-11-16 06:35:40.328000',_binary '\0',_binary '\0',1003,2557,5,'sXvavvTA','-',7),(73,'타임 아웃!','2022-11-16 06:38:44.543000',_binary '\0',_binary '\0',1003,2557,5,'sXvavvTA','-',7),(74,'타임 아웃!','2022-11-16 06:39:08.530000',_binary '\0',_binary '\0',1003,2557,5,'sXvavvTA','-',7),(75,'타임 아웃!','2022-11-16 06:39:12.489000',_binary '\0',_binary '\0',1003,2557,5,'sXvavvTA','-',7),(76,'','2022-11-16 06:40:06.858000',_binary '\0',_binary '',1003,1000,1,'CRNW0sIK','0',7),(77,'','2022-11-16 06:45:14.714000',_binary '\0',_binary '',1003,1000,1,'21n4Eiqt','0',7),(78,'','2022-11-16 06:46:32.255000',_binary '\0',_binary '',1003,1000,1,'iYFvo1HS','0',7),(79,'','2022-11-16 06:48:05.770000',_binary '\0',_binary '',1003,2557,1,'40pLoqZ8','0',7),(80,'타임 아웃!','2022-11-16 06:53:11.181000',_binary '\0',_binary '\0',1003,2557,5,'iyYbabd3','-',7),(81,'타임 아웃!','2022-11-16 07:05:21.446000',_binary '\0',_binary '\0',1003,1000,5,'Tqe7Efe9','-',7),(82,'타임 아웃!','2022-11-16 07:08:05.760000',_binary '\0',_binary '\0',1003,1000,5,'5xPl6Vla','-',7),(83,'타임 아웃!','2022-11-16 07:15:26.053000',_binary '\0',_binary '\0',1003,1000,5,'6VI3P2f0','-',7),(84,'','2022-11-16 07:23:06.911000',_binary '\0',_binary '',1003,2557,1,'1nQJb2GK','0',7),(85,'','2022-11-16 08:08:27.646000',_binary '\0',_binary '',1001,2557,1,'7ZsUm3y7','0',4),(86,'print(\'Hello World!\')','2022-11-16 08:32:42.920000',_binary '\0',_binary '',1003,2557,1,'EXhcRoBC','0',27),(87,'print(\'Hello World!\')','2022-11-16 08:34:09.519000',_binary '\0',_binary '',1003,2557,1,'o4DcxAfJ','0',27),(88,'print(\'Hello World!\')','2022-11-16 08:34:31.390000',_binary '\0',_binary '',1003,2557,1,'BaRHy0ZS','0',27),(89,'print(\'Hello World!\')','2022-11-16 08:34:45.310000',_binary '\0',_binary '',1003,2557,1,'uThtMpyW','0',27),(90,'print(\'Hello World!\')','2022-11-16 08:34:59.373000',_binary '\0',_binary '',1003,2557,1,'zTgyQZQT','0',27),(91,'print(\'Hello World!\')','2022-11-16 08:35:13.651000',_binary '\0',_binary '',1003,2557,1,'42sRQRkM','0',27),(92,'print(\'Hello World!\')','2022-11-16 08:35:27.978000',_binary '\0',_binary '',1003,2557,1,'kfPXJ12d','0',27),(93,'print(\'Hello World!\')','2022-11-16 08:35:42.680000',_binary '\0',_binary '',1003,2557,1,'ICo2Gygq','0',27),(94,'print(\'Hello World!\')','2022-11-16 08:36:09.286000',_binary '\0',_binary '',1003,2557,1,'iOxEkIQQ','0',27),(95,'print(\'Hello World!\')','2022-11-16 08:36:22.818000',_binary '\0',_binary '',1003,2557,1,'FaVbUoQ9','0',27),(96,'print(\'Hello World!\')','2022-11-16 08:36:37.050000',_binary '\0',_binary '',1003,2557,1,'CUd6A6rc','0',27),(97,'print(\'Hello World!\')','2022-11-16 08:36:52.097000',_binary '\0',_binary '',1003,2557,1,'r1tDvjQi','0',27),(98,'print(\'Hello World!\')','2022-11-16 08:37:05.710000',_binary '\0',_binary '',1003,2557,1,'14xPmrIH','0',27),(99,'print(\'Hello World!\')','2022-11-16 08:37:20.845000',_binary '\0',_binary '',1003,2557,1,'Vr2teJlL','0',27),(100,'print(\'Hello World!\')','2022-11-16 08:37:46.621000',_binary '\0',_binary '',1003,2557,1,'241COixC','0',27),(101,'print(\'Hello World!\')','2022-11-16 08:38:00.278000',_binary '\0',_binary '',1003,2557,1,'BKOsGGsA','0',27),(102,'print(\'Hello World!\')','2022-11-16 08:38:14.025000',_binary '\0',_binary '',1003,2557,1,'wdn5glsJ','0',27),(103,'print(\'Hello World!\')','2022-11-16 08:38:26.771000',_binary '\0',_binary '',1003,2557,1,'xDC7bcwL','0',27),(104,'print(\'Hello World!\')','2022-11-16 08:38:39.539000',_binary '\0',_binary '',1003,2557,1,'1dopUQpw','0',27),(105,'print(\'Hello World!\')','2022-11-16 08:38:51.735000',_binary '\0',_binary '',1003,2557,1,'yJYO2TUG','0',27),(106,'','2022-11-16 13:29:54.320000',_binary '\0',_binary '',1001,2557,1,'4r22mYB4','0',4),(107,'타임 아웃!','2022-11-16 14:01:04.233000',_binary '\0',_binary '\0',1003,2557,5,'RuqeYfIe','-',4),(108,'타임 아웃!','2022-11-16 14:03:52.038000',_binary '\0',_binary '\0',1001,1000,5,'JSjlBUli','-',4),(109,'print(\'Hello World!\')','2022-11-16 23:53:10.123000',_binary '\0',_binary '',1003,2557,1,'zSJx8Iar','0',27),(110,'','2022-11-17 00:02:04.684000',_binary '\0',_binary '',1001,2557,1,'mHjNYz4a','0',23),(111,'','2022-11-17 00:34:13.816000',_binary '\0',_binary '',1003,2557,1,'cbj4mIMv','0',7),(113,'print(\'Hello World!\')','2022-11-17 00:43:56.187000',_binary '\0',_binary '',1003,2557,1,'6PT6jkkZ','0',27),(114,'타임 아웃!','2022-11-17 02:53:06.553000',_binary '\0',_binary '\0',1001,2557,5,'yuPgCxs2','-',23),(115,'','2022-11-17 09:59:00.671000',_binary '\0',_binary '',1001,2557,1,'6ft32gIo','0',4),(116,'print(\'Hello World!\')','2022-11-17 15:18:14.618000',_binary '\0',_binary '',1003,2557,1,'KjseUWK5','0',27),(117,'','2022-11-18 00:59:41.737000',_binary '\0',_binary '',1002,2557,1,'CiZRaevZ','0',29),(118,'','2022-11-18 08:22:44.594000',_binary '\0',_binary '',1001,2557,1,'NEy2fhff','0',4),(119,'','2022-11-18 09:43:41.578000',_binary '\0',_binary '',1003,2557,1,'k0ohilSy','0',3),(120,'','2022-11-18 09:44:56.619000',_binary '\0',_binary '',1003,2557,1,'n0GfMhOZ','0',3),(121,'ㅗㅎ옿ㄹ옿ㄹㅇ','2022-11-18 09:45:54.545000',_binary '\0',_binary '',1003,1000,1,'cgsgg630','0',3),(122,'','2022-11-18 09:46:42.815000',_binary '\0',_binary '',1003,2557,1,'d5liMOyz','0',3),(123,'print(\'Hello World!\')','2022-11-18 10:19:49.809000',_binary '\0',_binary '',1003,2557,1,'KjseUWK5','0',27),(124,'','2022-11-18 10:24:57.554000',_binary '\0',_binary '',1003,2557,1,'dZ8NlDII','0',7),(125,'','2022-11-18 10:25:35.229000',_binary '\0',_binary '',1003,2557,1,'q74y0Kwy','0',7),(126,'타임 아웃!','2022-11-19 08:04:43.239000',_binary '\0',_binary '\0',1003,2557,5,'Xk9FRdCT','-',27),(127,'타임 아웃!','2022-11-19 08:19:28.975000',_binary '\0',_binary '\0',1003,2557,5,'Yszg9vlm','-',27),(128,'타임 아웃!','2022-11-19 10:41:51.405000',_binary '\0',_binary '\0',1003,2557,5,'oZ9rgtms','-',27),(129,'타임 아웃!','2022-11-19 13:31:58.674000',_binary '\0',_binary '\0',1001,2557,5,'qoAqw0YH','-',4),(130,'','2022-11-19 13:32:31.620000',_binary '\0',_binary '',1001,2557,1,'ky9YL5Rs','0',4),(131,'','2022-11-19 13:49:16.242000',_binary '\0',_binary '',1003,2557,1,'QmnIkCUs','0',7),(132,'','2022-11-19 13:50:31.694000',_binary '\0',_binary '',1002,1000,1,'JE4ueaQg','0',4),(133,'타임 아웃!','2022-11-19 13:56:49.351000',_binary '\0',_binary '\0',1001,2557,5,'vbU6m8En','-',4),(134,'','2022-11-19 14:00:31.487000',_binary '\0',_binary '',1001,2557,1,'k7I6bhC4','0',4),(135,'타임 아웃!','2022-11-19 14:06:48.850000',_binary '\0',_binary '\0',1003,2439,5,'EFYGLjzy','-',7),(136,'','2022-11-19 14:23:50.187000',_binary '\0',_binary '',1001,2557,1,'JK5sDktm','0',4),(137,'타임 아웃!','2022-11-19 14:32:14.940000',_binary '\0',_binary '\0',1001,2557,5,'Cp4ZpUey','-',4),(138,'','2022-11-19 14:32:53.303000',_binary '\0',_binary '',1001,2557,1,'W294CZmj','0',4),(139,'','2022-11-19 14:33:36.596000',_binary '\0',_binary '',1001,2557,1,'CSjRvZU3','0',4),(140,'','2022-11-19 14:39:04.660000',_binary '\0',_binary '',1001,2557,1,'j7Xhp0sZ','0',4),(141,'타임 아웃!','2022-11-19 14:41:02.304000',_binary '\0',_binary '\0',1003,2557,5,'SWrxZbK2','-',4),(142,'','2022-11-19 14:45:53.364000',_binary '\0',_binary '',1001,2557,1,'z2BqCscg','0',4),(143,'타임 아웃!','2022-11-19 14:47:51.542000',_binary '\0',_binary '\0',1003,2557,5,'UrD3s5iU','-',4),(144,'','2022-11-19 14:48:32.203000',_binary '\0',_binary '',1001,2557,1,'0AIKTUEl','0',4),(145,'','2022-11-19 14:48:51.218000',_binary '\0',_binary '',1001,2557,1,'1ygaQUiQ','0',4),(146,'','2022-11-19 14:49:45.748000',_binary '\0',_binary '',1001,2557,1,'EK0UIbWK','0',4),(147,'','2022-11-19 14:52:51.573000',_binary '\0',_binary '',1001,2557,1,'nLjPyGp3','0',4),(148,'','2022-11-19 14:55:22.439000',_binary '\0',_binary '',1001,2557,1,'1Ypk1cGP','0',4),(149,'','2022-11-19 14:58:07.209000',_binary '\0',_binary '',1001,2557,1,'FTDqALG1','0',4),(150,'','2022-11-19 15:00:55.491000',_binary '\0',_binary '',1001,2557,1,'0vZtbY17','0',4),(151,'','2022-11-19 15:01:58.200000',_binary '\0',_binary '',1001,2557,1,'4J8GsX6P','0',4),(152,'','2022-11-19 15:02:46.390000',_binary '\0',_binary '',1001,2557,1,'1oJstBHc','0',4),(153,'','2022-11-19 15:03:17.556000',_binary '\0',_binary '',1001,2557,1,'0iLMDXP7','0',4),(154,'','2022-11-19 15:03:54.519000',_binary '\0',_binary '',1001,2557,1,'VCRicZPG','0',4),(155,'','2022-11-19 15:06:30.615000',_binary '\0',_binary '',1001,2557,1,'suBTAodi','0',4),(156,'','2022-11-19 15:08:17.800000',_binary '\0',_binary '',1001,2557,1,'thJhrju6','0',4),(157,'','2022-11-19 15:09:00.125000',_binary '\0',_binary '',1001,2557,1,'x1tjujjF','0',4),(158,'','2022-11-19 15:11:15.360000',_binary '\0',_binary '',1001,2557,1,'oE3OOinT','0',4),(159,'','2022-11-19 15:15:23.629000',_binary '\0',_binary '',1001,2557,1,'eDKI1FMg','0',4),(160,'','2022-11-19 15:15:51.820000',_binary '\0',_binary '',1001,2557,1,'rDLTNrFS','0',4),(161,'','2022-11-19 15:16:31.398000',_binary '\0',_binary '',1001,2557,1,'RVJQLf46','0',4),(162,'','2022-11-19 15:18:08.465000',_binary '\0',_binary '',1001,2557,1,'F59aSNei','0',4),(163,'타임 아웃!','2022-11-19 15:19:17.935000',_binary '\0',_binary '\0',1003,2557,5,'y60C4fz6','-',4),(164,'타임 아웃!','2022-11-19 15:29:09.375000',_binary '\0',_binary '\0',1003,1000,5,'m6yO61L6','-',4),(165,'','2022-11-19 15:38:34.844000',_binary '\0',_binary '',1001,2557,1,'I9oXoKpk','1',4),(166,'','2022-11-19 15:41:28.471000',_binary '\0',_binary '',1001,2557,1,'nlpdfz5i','0',4),(167,'','2022-11-19 15:42:12.080000',_binary '\0',_binary '',1003,2557,1,'p50cDIFB','0',7),(173,'aslkjdfnl\nslkdflnsdl fnsnf\nsklfmlflksnfoiwenfl\naklfslkfnoieang;regbnlfkvd\nvlkflweknvlanv;odvkln\nagkldfoiwfnlkgm\'dv\naklfneofdlkvm;anb\'b\nfsnlfnweiogn;slgkang\nkflnof','2022-11-19 16:05:57.473000',_binary '\0',_binary '',1001,2557,1,'XEq9POtV','0',4),(178,'제출제출제출제출제출제출\n제출제출제출제출제출제출\n제출제출제출제출제출제출\n제출제출제출제출제출제출\n제출제출제출제출제출제출\n개굴개굴개굴개굴개굴','2022-11-19 16:19:25.822000',_binary '\0',_binary '',1002,1000,1,'xvmLIwII','0',4),(180,'요고요고','2022-11-19 16:34:35.573000',_binary '\0',_binary '',1001,2557,1,'KjseUWK5','0',4),(181,'','2022-11-19 16:35:10.171000',_binary '\0',_binary '',1001,2557,1,'TJuyUaGo','0',4),(196,'print(\'Hello World!\')','2022-11-19 17:19:39.926000',_binary '\0',_binary '',1003,2557,1,'KjseUWK5','0',27),(203,'','2022-11-19 18:13:35.476000',_binary '\0',_binary '',1003,2557,1,'Z7ChADxE','0',66),(204,'','2022-11-19 18:16:01.162000',_binary '\0',_binary '',1003,2557,1,'kmvOfnoe','0',66),(205,'','2022-11-19 18:16:45.931000',_binary '\0',_binary '',1003,2557,1,'JnHlBjA2','0',66),(206,'','2022-11-19 18:17:16.737000',_binary '\0',_binary '',1003,2557,1,'fg5G8U3a','0',66),(207,'','2022-11-20 06:50:12.446000',_binary '\0',_binary '',1002,1000,1,'jdAQPOvj','0',23),(208,'','2022-11-20 09:02:28.277000',_binary '\0',_binary '',1002,1000,1,'vtbrKRC8','0',4),(209,'','2022-11-20 16:42:33.258000',_binary '\0',_binary '',1003,2557,1,'KauguMTh','0',81);
/*!40000 ALTER TABLE `algo_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK46cuxphi3uh5quom51s6i2q8x` (`user_id`),
  CONSTRAINT `FK46cuxphi3uh5quom51s6i2q8x` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2022.11.14',7),(2,'2022.11.15',7),(6,'2022.11.16',7),(7,'2022.11.16',27),(8,'2022.11.17',7),(9,'2022.11.17',27),(10,'2022.11.17',37),(11,'2022.11.18',27),(12,'2022.11.18',29),(13,'2022.11.18',4),(14,'2022.11.18',39),(15,'2022.11.18',7),(16,'2022.11.18',3),(18,'2022.11.18',41),(21,'2022.11.14',10),(22,'2022.11.15',10),(23,'2022.11.16',10),(24,'2022.11.17',10),(25,'2022.11.18',10),(26,'2022.11.19',4),(27,'2022.11.19',10),(29,'2022.11.19',42),(30,'2022.11.19',7),(31,'2022.11.20',7),(32,'2022.11.20',48),(34,'2022.11.20',10),(35,'2022.11.20',66),(36,'2022.11.20',51),(37,'2022.11.20',4),(38,'2022.11.20',23),(39,'2022.11.20',27),(40,'2022.11.21',86),(41,'2022.11.21',3);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `need` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (0,'1일 출석'),(1,'2일 출석'),(2,'3일 출석'),(4,'4일 출석'),(6,'6일 출석'),(7,'7일 출석'),(8,'타이핑 게임 1회'),(9,'타이핑 게임 1회 우승'),(10,'타이핑 게임 3회 우승'),(11,'타이핑 게임 7회 우승'),(12,'cs 게임 1회'),(13,'cs 1등 1회'),(14,'cs 1등 3회'),(15,'cs 1등 7회'),(16,'cs 3등 이내 1회'),(17,'cs 3등 이내 5회'),(18,'cs 3등 이네 10회'),(19,'알고리즘 1회'),(20,'알고리즘 3회'),(21,'알고리즘 1등 1회'),(22,'싸피 게임 2연승'),(23,'싸피 게임 4연승'),(24,'싸피 게임 7연승');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `checked` bit(1) NOT NULL,
  `date` datetime(6) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `from_user_id` bigint DEFAULT NULL,
  `to_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiefb0n9dfqybjpmddu4bikwrj` (`from_user_id`),
  KEY `FK2i8k68c49efr1cgoy6kr7xpwl` (`to_user_id`),
  CONSTRAINT `FK2i8k68c49efr1cgoy6kr7xpwl` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKiefb0n9dfqybjpmddu4bikwrj` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (318,_binary '','2022-11-20 01:36:30.000000','뭐가 문제일까요 ㅜ ',4,7),(323,_binary '','2022-11-20 20:51:40.000000','안녕하세요',81,27),(324,_binary '','2022-11-20 20:51:46.000000','뭐하시는중이에요',81,27),(325,_binary '','2022-11-20 21:05:50.000000','누구신가요',27,81),(326,_binary '','2022-11-20 21:06:25.000000','대답',27,81),(327,_binary '','2022-11-20 21:06:25.000000','3',27,81),(328,_binary '','2022-11-20 21:06:26.000000','2',27,81),(329,_binary '','2022-11-20 21:06:26.000000','1',27,81),(330,_binary '','2022-11-20 21:06:53.000000','뒤질래',81,27),(331,_binary '','2022-11-21 00:10:10.000000','패딩',3,7),(332,_binary '','2022-11-21 00:11:06.000000','채팅에서생긴건가?',7,3),(333,_binary '','2022-11-21 00:11:58.000000','채딩',3,7),(334,_binary '\0','2022-11-21 00:12:32.000000','ㅁㄴㅇㄹ',7,31),(335,_binary '','2022-11-21 00:36:51.000000','sdf',3,81),(336,_binary '','2022-11-21 00:36:53.000000','asdf',3,81),(337,_binary '','2022-11-21 00:36:56.000000','asdffa',3,27),(338,_binary '','2022-11-21 00:37:00.000000','asdfasdf',3,4),(339,_binary '','2022-11-21 00:38:29.000000','dgvd',81,3),(340,_binary '','2022-11-21 00:38:30.000000','vzxcvsa',81,3),(341,_binary '','2022-11-21 00:38:33.000000','rey',81,3),(342,_binary '','2022-11-21 00:38:36.000000','bdf ',81,3),(343,_binary '','2022-11-21 01:09:46.000000','duddydydyd 오ㅛ요요요요',4,3),(344,_binary '','2022-11-21 01:14:18.000000','ddddddddddddddddddddddddddddddddddddddddd',3,81),(345,_binary '','2022-11-21 01:15:30.000000','qwe',81,46),(346,_binary '','2022-11-21 01:15:35.000000','asd',46,81);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs_problem`
--

DROP TABLE IF EXISTS `cs_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs_problem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `example` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `question` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs_problem`
--

LOCK TABLES `cs_problem` WRITE;
/*!40000 ALTER TABLE `cs_problem` DISABLE KEYS */;
INSERT INTO `cs_problem` VALUES (1,'3','OS','Windows|Linux|Oracle|DOS',NULL,'운영체제가 아닌 것은?','MULTICHOICE'),(2,'3','OS','페이지가 메모리에 있을 때|데드락이 일어날 때|페이지가 메모리에 없을 때|버퍼링이 일어났을 때',NULL,'Page fault는 언제 일어나는가?','MULTICHOICE'),(3,'1','OS','데드락을 막기 위해|데드락을 회복하기 위해 (To deadlock recovery)|데드락을 풀기 위해 (To solve the deadlock)|답 없음',NULL,'은행원의 알고리즘은 무엇을 위해서 사용되는가?','MULTICHOICE'),(4,'2','OS','처리능력 향상|턴어라운드 타임의 증가|사용가능도의 증대|신뢰도의 향상',NULL,'운영체제의 목적이 아닌 것은?','MULTICHOICE'),(5,'2','OS','FIFO|LRU|LFU|OPT',NULL,'페이지 대체 알고리즘에서 계수기를 두어 가장 오랫동안 참조되지 않은 페이지를 교체할 페이지로 선택하는 방법은?','MULTICHOICE'),(6,'1','OS','급여 처리 시스템|온라인 예금 시스템|산업 제어 시스템|좌석 예약 시스템',NULL,'실시간 처리 시스템과 거리가 먼 것은?','MULTICHOICE'),(7,'2','OS','타이머 종료 (Timer Runout)|디스패치 (Dispatch)|사건대기 (Event Wait)|깨어남 (Wake Up)',NULL,'준비상태(Ready)에 있는 프로세스들 중에서 우선순위가 가장 높은 플세스를 선택하여 CPU를 할당(Running 상태)하는 것을 무엇이라 하는가?','MULTICHOICE'),(8,'1','OS','턴 어라운드 시간|프로세스 시간|서치 시간|액세스 시간',NULL,'컴퓨터 시스템에 작업을 지시하고 나서부터 결과를 받을 때까지의 경과 시간은?','MULTICHOICE'),(9,'2','OS','B|D|F|어떤 영역에도 할당될 수 없다.',NULL,'주기억장치 배치 전략 기법으로 최적 적합 방법을 사용한다고 할 때, 다음과 같은 기억장소 리스트에서 10K 크기의 작업은 어느 기억공간에 할당되는가? (단, K=kilo이고, 탐색은 위에서부터 아래로 한다고 가정한다)\n```\n영역 공간\nA 사용중\nB 5K\nC 사용 중\nD 15K\nE 사용 중\nF 25K\n```','MULTICHOICE'),(10,'3','OS','6|12|15|20',NULL,'다음의 페이지 참조 열(Page reference string)에 대해 페이지 교체 기법으로 FIFO를 사용할 경우 페이지 부재(Page Fault) 횟수는? (단, 할당된 페이지 프레임 수는 3이고 처음에는 모든 프레임이 비어 있음)\n```\n7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1\n```','MULTICHOICE'),(11,'3','OS','{3, 5}|{2, 6, 7}|{2, 3, 5, 6, 7}|{2, 7}',NULL,'Working set W(t,w)는 t-w 시간부터 t 까지 참조된 page들의 집합을 말한다. 그 시간에 참조된 페이지가 {2, 3, 5, 5, 6, 3, 7}이라면 working set은?','MULTICHOICE'),(12,'3','OS','모든 프로세스들에 대한 요구를 공정히 처리한다.|응답 시간의 예측이 용이하다.|많은 오버헤드(Overhead)를 초래할 수 있다.|CPU의 사용 시간이 짧은 프로세스들이 사용 시간이 긴 프로세스들로 인하여 오래 기다리는 경우가 발생할 수 있다.',NULL,'선점 기법과 대비하여 비선점 스케줄링 기법에 대한 설명으로 옳지 않은 것은?','MULTICHOICE'),(13,'3','OS','모든 프로세스들에 대한 요구를 공정히 처리한다.|응답 시간의 예측이 용이하다.|많은 오버헤드(Overhead)를 초래할 수 있다.|CPU의 사용 시간이 짧은 프로세스들이 사용 시간이 긴 프로세스들로 인하여 오래 기다리는 경우가 발생할 수 있다.',NULL,'UNIX의 특징이 아닌 것은?','MULTICHOICE'),(17,'4','OS','1, 2, 0|2, 4, 3|1, 4, 2| 4, 1, 3',NULL,'3 개의 페이지 프레임을 갖는 시스템에서 페이지 참조 순서가 1, 2, 1, 0, 4, 1, 3 일 경우 FIFO 알고리즘에 의한 페이지 대치의 최종 결과는?','MULTICHOICE'),(18,'4','OS','4|5|6|7',NULL,'\"3개의 페이지를 수용할 수 있는 주기억장치가 있으며, 초기에는 모두 비어 있다고 가정한다. 다음의 순서로 페이지 참조가 발생할 때, FIFO 페이지 교체 알고리즘을 사용할 경우 몇 번의 페이지 결함이 발생하는가?\n```\n1, 2, 3, 1, 2, 4, 1, 2, 5\n```\"','MULTICHOICE'),(19,'4','OS','점유 및 대기 방지|비선점 방지|환형 대기 방지|은행원 알고리즘 사용',NULL,'교착상태의 해결 방법 중 회피(Avoidance) 기법과 가장 밀접한 관계가 있는 것은?','MULTICHOICE'),(20,'2','OS','LRU|NUR|FIFO|LFU',NULL,'페이지 교체기법 알고리즘 중 각 페이지마다 \"Reference Bit\"와 \"Modified Bit\"가 사용되는 것은?','MULTICHOICE'),(21,'1','OS','버퍼링과 스풀링은 페이지 교체 기법의 종류이다.|스풀링의 SPOOL은 “Simultaneous Peripheral Operation On-Line”의 약어이다.|버퍼링은 주기억장치의 일부를 사용한다.|스풀링은 디스크의 일부를 사용한다.',NULL,'버퍼링과 스풀링에 대한 설명으로 가장 옳지 않은 것은?','MULTICHOICE'),(22,'4','OS','하나의 스레드는 상태를 줄인 경량 프로세스라고도 한다.|프로세스 내부에 포함되는 스레드는 공통적으로 접근 가능한 기억장치를 통해 효율적으로 통신한다.|스레드를 사용하면 하드웨어, 운영체제의 성능과 응용 프로그램의 처리율을 향상시킬 수 있다.|하나의 프로세스에는 하나의 스레드만 존재하여 독립성을 보장한다.',NULL,'스레드(Thread)에 대한 설명으로 가장 거리가 먼 것은?','MULTICHOICE'),(23,'2','OS','5K|6K|7K|8K',NULL,'기억공간이 15K, 23K, 22K, 21K 순으로 빈 공 간이 있을 때 기억장치 배치 전략으로 \"First Fit\"을 사용하여 17K의 프로그램을 적재할 경우 내부단편화의 크기는 얼마인가?','MULTICHOICE'),(24,'4','OS','Circular Wait|Hold and Wait|Mutual Exclusion|Preemption',NULL,'Dead Lock 발생의 필요충분조건이 아닌 것은?','MULTICHOICE'),(25,'4','ALGORITHM','O(n)|O(n logn)|O(n^2)|O(2^n)',NULL,'\"아래 코드의 시간 복잡도를 구하시오\n\n```\nint f(int n) {\n int sum = 0;\n for (int i = 0; i < n; i++) {\n  for (int j = 0; j < n / 2; j++) {\n   sum *= j;\n  }\n }\n return sum;\n}\n\n```\"','MULTICHOICE'),(26,'1','ALGORITHM','Ο(n)|Ο(n logn)|Ο(n^2) |Ο(2^n)',NULL,'\"아래 코드의 시간 복잡도를 구하시오\n\n```\nint f(int n) {\n int sum = 0;\n for (int i = 0; i < n; i++) {\n  for (int j = 0; j < n / 2; j++) {\n   sum *= j;\n  }\n }\n return sum;\n}\n```\"','MULTICHOICE'),(27,'1','ALGORITHM','길이가 짧은 A |길이가 긴 B |상관 없음|C',NULL,'중복된 원소가 없는 서로 길이가 다른 숫자 리스트 A, B 가 있다. 두 리스트 내에 공통으로 포함된 원소를 출력하고자 한다. 두 리스트 중 한 개를 정렬하고, 다른 리스트를 순회하면서 이진 검색 Binary Search 으로 포함 여부를 체크한다고 할때 어떤 리스트를 정렬하는게 더 빠를지 고르시오. 단, len(A) < len(B) 이며 정렬은 병합 정렬 Merge Sort 을 사용하여 Ο(? log ?)의 시간 복잡도로 진행한다. ','MULTICHOICE'),(28,'1','ALGORITHM','Stack|Queue|Tree|Graph',NULL,'웹 브라우저의 이전페이지로 돌아가기와 에디터의 되돌리기 Undo 기능을 구현하기에 적합한 자료구조는?','MULTICHOICE'),(29,'3','ALGORITHM','Stack|Queue |Tree|Graph',NULL,'DB 의 인덱스 Index 는 원하는 레코드 Record 에 빠르게 접근 할 수 있게 해준다. 문자열과 숫자 컬럼에 대한 인덱스를 구현할 때 사용할 수 있는 자료구조를 고르시오.','MULTICHOICE'),(30,'1','ALGORITHM','Hash|Stack|Queue |Graph',NULL,'DB 의 인덱스 Index 는 원하는 레코드 Record 에 빠르게 접근 할 수 있게 해준다. 문자열과 숫자 컬럼에 대한 인덱스를 구현할 때 사용할 수 있는 자료구조를 고르시오.','MULTICHOICE'),(31,'3','DB','데이터 정의 언어|데이터 조작 언어 |데이터 제어 언어|데이터 종속 언어',NULL,'데이터베이스 언어 중 데이터의 보안, 무결성, 데이터 복구와 관계되는 것은?','MULTICHOICE'),(32,'1','DB','뷰|시스템 카탈로그|스키마|데이터 디렉토리',NULL,'하나 또는 둘 이상의 기본 테이블로부터 유도되어 만들어지는 가상 테이블은?','MULTICHOICE'),(33,'3','DB','산출물로 개체 관계도(ER-D)가 만들어진다.|DBMS에 독립적인 개념 스키마를 설계한다.|트랜잭션 인터페이스를 설계한다.|논리적 설계 단계의 전 단계에서 수행된다.',NULL,'데이터베이스 설계 과정 중 개념적 설계 단계에 대한 설명으로 옳지 않은 것은?','MULTICHOICE'),(34,'4','DB','CREATE|DROP|ALTER|INSERT',NULL,'SQL의 데이터 정의문(DDL)에 속하지 않는 것은?','MULTICHOICE'),(35,'4','DB','삭제 이상|삽입 이상|갱신 이상|조회 이상',NULL,'정규화를 거치지 않으면 릴레이션 조작 시 데이터 중복에 따른 예기치 못한 곤란한 현상이 발생할 수 있다. 이러한 이상 현상의 종류에 해당하지 않는 것은?','MULTICHOICE'),(36,'3','DB','개념 스키마|외부 스키마|내부 스키마|관계 스키마',NULL,'스키마의 3계층에서 실제 데이터베이스가 기억장치 내에 저장되어 있으므로 저장 스키마라고도 하는 것은?','MULTICHOICE'),(37,'4','DB','참조 무결성|릴레이션 무결성|외래키 무결성|개체 무결성',NULL,'한 릴레이션의 기본키를 구성하는 어떠한 속성 값도 널이나 중복 값을 가질 수 없음을 의미하는 관계 데이터 모델의 제약 조건은?','MULTICHOICE'),(38,'1','DB','1NF → 2NF|2NF → 3NF|3NF → BCNF|BCNF → 4NF',NULL,'부분 함수 종속 제거가 이루어지는 정규화 단계는?','MULTICHOICE'),(39,'1','DB','삽입, 삭제, 갱신 연산의 용이|데이터의 논리적 독립성 유지|데이터의 접근 제어에 의한 보안 제공|사용자의 데이터 관리 용이',NULL,'뷰에 대한 설명으로 옳지 않은 것은?','MULTICHOICE'),(40,'1','DB','속성의 수를 Cardinality라고 한다.|데이터베이스를 구성하는 가장 작은 논리적 단위이다.|파일 구조상의 데이터 항목 또는 데이터 필드에 해당된다.|속성은 개체의 특성을 기술한다.',NULL,'관계형 데이터베이스의 릴레이션에서 속성에 대한 설명으로 옳지 않은 것은?','MULTICHOICE'),(41,'3','DB','트랜잭션 인터페이스 설계|설계된 스키마의 평가|저장 레코드 양식 설계|논리적 데이터모델로 변환',NULL,'데이터베이스의 물리적 설계 단계에 해당되는 것은?','MULTICHOICE'),(42,'2','DB','DELETE VIEW 뷰이름|DROP VIEW 뷰이름|REMOVE VIEW 뷰이름|OUT VIEW 뷰이름',NULL,'뷰 삭제문의 형식으로 옳은 것은?','MULTICHOICE'),(43,'4','DB','이행적 함수 종속성 제거|다치 종속 제거|모든 결정자가 후보 키가 되도록 분해|부분 함수 종속성 제거',NULL,'제1정규형에서 제2정규형 수행 시 작업으로 옳은 것은?','MULTICHOICE'),(44,'4','DB','후보키 : 개체들을 고유하게 식별할 수 있는 속성|슈퍼키 : 릴레이션을 구성하는 속성들 중에서 각 튜플을 유일하게 식별하기 위해 사용되는 하나 이상의 속성들의 집합|외래키 : 참조하는 릴레이션에서 기본키로 사용되는 속성|보조키 : 후보키 중에서 대표로 선정된 키',NULL,'관계형 데이터베이스에서 사용되는 키에 대한 설명으로 틀린 것은?','MULTICHOICE'),(45,'1','DB','cardinality|degree|domain|attribute',NULL,'릴레이션에 존재하는 튜플의 개수를 의미하는 것은?','MULTICHOICE'),(46,'4','DB','DHA는 보안 측면에서 뷰를 활용할 수 있다.|데이터의 논리적 독립성을 제공한다.|뷰를 이용한 또 다른 뷰를 생성할 수 있다.|삽입, 삭제, 갱신 연산에 아무런 제한이 없으므로 사용자가 뷰를 다루기가 용이하다.',NULL,'뷰에 대한 설명으로 틀린 것은?','MULTICHOICE'),(47,'2','DB','데이터베이스 정의 기능|데이터베이스 종속 기능|데이터베이스 조작 기능|데이터베이스 제어 기능',NULL,'데이터베이스 관리시스템(DBMS)의 필수 기능이 아닌것은?','MULTICHOICE'),(48,'2','DB','개체형 데이터 모델|관계형 데이터 모델|계층형 데이터 모델|네트워크형 데이터 모델',NULL,'개념 세계에서 표현된 각 개체와 개체 간의 관계들을 서로 독립된 2차원 테이블 즉 릴레이션으로 표현하며, 가장 널리 사용되는 데이터 모델은?','MULTICHOICE'),(49,'1','DB','NULL|TUPLE|DOMAIN|ENTITY',NULL,'개체 무결성 제약 조건은 한 릴레이션의 기본 키를 구성하는 어떠한 속성 값도 ()값이나 중복 값을 가질 수 없다.','MULTICHOICE'),(50,'2','DB','master 인덱스|prime 인덱스|cylinder 인덱스|track 인덱스',NULL,'색인 순차 파일의 인덱스 구역에 해당하지 않는 것은?','MULTICHOICE'),(51,'4','DB','셋 이상의 기본 테이블에서 유도된 실제 테이블이다.|시스템 내부의 물리적 표현으로 구현된다.|뷰 위에 또 다른 뷰를 정의할 수 없다.|데이터의 논리적 독립성을 제공한다.',NULL,'뷰에 대한 설명으로 옳은 것은?','MULTICHOICE'),(52,'3','DB','부재(missing) 정보를 의미한다.|알려지지 않은 값을 의미한다.|영(zero)의 값을 의미한다.|널(NULL)값은 혼란을 야기할 수 있다.',NULL,'널 값에 대한 설명으로 부적합한 것은?','MULTICHOICE'),(53,'2','DB','개념화|집단화|영역화|캡슐화',NULL,'확장 ER모델에서 요소 객체들을 가지고 상위 레벨의 복합 개체를 구축하는 추상화 개념은?','MULTICHOICE'),(54,'2','DB','DBMS|Schema|Key|Data Ware House',NULL,'\"다음 설명에 해당하는 것은?\n\n- It is a collection of meta data describing the structure and constraint of a database. It defines data entities, attribute, relations, and constraint on data manipulation.\"','MULTICHOICE'),(63,'3','DATA','스택|큐|트리|힙',NULL,'정점과 간선을 이용해 사이클을 이루지 않도록 구성한 그래프의 특수한 형태로, 계층이 있는 데이터를 표현하기에 적합한 자료구조는 ?','MULTICHOICE'),(64,'1','DATA','스택|큐|트리|힙',NULL,'FILO ( First-In Last-Out) 구조를 가진 자료구조는 ?','MULTICHOICE'),(65,'1','DATA','O|X',NULL,'큐는 First-In First-Out 구조이다.','OX'),(66,'4','DATA','해쉬|큐|트리|힙',NULL,'최댓값 또는 최솟값을 찾아내는 연산을 쉽게하기 위해 고안된 구조로, 각 노드의 키값이 자식의 키값보다 작지 않거나 그 자식의 키값보다 크지 않은 구조를 가지는 자료구조는','MULTICHOICE'),(67,'1','DATA','O|X',NULL,'힙은 완전이진트리이다.','OX'),(68,'1','DATA','O|X',NULL,'자료구조 중, 배열(Array)의 원소에 접근하기 위한 시간복잡도는 O(1) 이다.','OX'),(69,'2','DATA','O|X',NULL,'자료구조 중, 배열(Array)의 삽입/삭제하기 위한 최악의 시간복잡도는 O(1)이다.','OX'),(70,'2','DATA','O|X',NULL,'자료구조 중, 연결리스트의 삭제/삽입 연산은 배열보다 느리다.','OX'),(71,'3','DATA','그래프|큐|해쉬|힙',NULL,'키, 값으로 데이터를 저장하는 자료구조 중 하나로 빠르게 데이터를 검색할 수 있는 자료구조는 ?','MULTICHOICE'),(72,'2','DATA','O|X',NULL,'힙(Heap)은 내부적으로 연결 리스트를 사용한다.','OX'),(73,'1','DATA','DFS|이진탐색|BFS|순차탐색',NULL,'그래프 상에 존재하는 임의의 한 정점으로부터 연결되어 있는 한 정점으로만 나아가는 그래프 탐색 방법은 ?','MULTICHOICE'),(74,'3','DATA','이진탐색|DFS|BFS|순차탐색',NULL,'그래프 상에 존재하는 임의의 한 정점으로부터 연결되어 있는 모든 정점으로 나아가는 그래프 탐색 방법은 ?','MULTICHOICE'),(75,'4','DATA','스택|큐|트리해쉬|덱',NULL,'자료구조 중, 앞과 뒤 양쪽에서 삽입과 삭제가 가능한 구조를 갖는 것은 ?','MULTICHOICE'),(76,'1','DATA','O|X',NULL,'이진탐색트리란, 이진탐색과 연결리스트를 결합한 자료구조의 일종이다.','OX'),(77,'3','DATA','배열,연결리스트|스택,트리|이진트리,그래프|덱,그래프',NULL,'다음 중, 비선형 구조의 자료구조로만 이루어진 것은 ?','MULTICHOICE'),(78,'2','DESIGN','어댑터패턴|싱글톤패턴|옵저버패턴|프록시패턴',NULL,'다음 중, 어플리케이션이 시작될 때, 어떤 클래스가 최초 한번만 메모리를 할당하고 해당 메모리에 인스턴스를 만들어 사용하는 패턴은 ?','MULTICHOICE'),(79,'1','DESIGN','O|X',NULL,'소프트웨어에서 디자인패턴은 특정 구현방식이 아닌 문제를 해결하는데에 쓰이는 템플릿 혹은 아이디어이다.','OX'),(80,'1','DESIGN','O|X',NULL,'팩토리 메서드 디자인 패턴은 객체 생성 처리를 서브 클래스로 분리해 처리하도록 캡슐화하는 패턴이다.','OX'),(81,'1','DESIGN','어댑터패턴|프록시패턴|컴포지트패턴|싱글톤패턴',NULL,'다음 중, 호환 불가능한 인터페이스 때문에 협력할 수 없는 클래스들을 협력할 수 있게 하기 위한 디자인 패턴은 ?','MULTICHOICE'),(82,'3','DESIGN','옵저버패턴|싱글톤패턴|프록시패턴|컴포지트패턴',NULL,'다음 중, 어떤 객체를 사용하고자 할 때, 객체를 직접 참조하는 것이 아닌 해당 객체를 대신하는 객체를 통해 대상 객체에 접근하는 방식의 디자인 패턴은 ?','MULTICHOICE'),(83,'1','NETWORK','TCP는 양방향 연결이다.|TCP는 실시간 스트리밍을 하기에 적절한 방식이다.|UDP는 TCP에 비해 높은 신뢰도의 데이터를 전송한다.|UDP는 전송 순서를 보장한다.',NULL,'TCP와 UDP에 대한 설명입니다. 옳은 것을 고르세요.','MULTICHOICE'),(84,'3','NETWORK','UDP는 TCP에 비해 빠르다.|UDP의 사용 예시로는 실시간 스트리밍, 게임, DNS 등이 있다.|UDP는 흐름제어를 위한 피드백을 제공한다.|TCP는 양방향 연결이다.|',NULL,'TCP와 UDP에 대한 설명입니다. 옳지 않은 것을 고르세요.','MULTICHOICE'),(85,'2','NETWORK','http://example.com::num=1&name=\"test\"|http://example.com?num=1&name=test|http://example.com/num=1&name=\"test\"|http://example.com?int num =1&String name=test',NULL,'\"int num = 1;\nString name = \"\"test\"\";\n이 데이터를 get방식으로 보내려고 합니다.\n옳은 URL을 고르세요.\"','MULTICHOICE'),(86,'1','NETWORK','URL, body|body, URL|URL, URL|body, body',NULL,'http 프로토콜 메소드 중 get 메소드와 post 메소드가 있다.','MULTICHOICE');
/*!40000 ALTER TABLE `cs_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs_record`
--

DROP TABLE IF EXISTS `cs_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `ranks` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoam73yjktiamahsql6w8fqq93` (`user_id`),
  CONSTRAINT `FKoam73yjktiamahsql6w8fqq93` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs_record`
--

LOCK TABLES `cs_record` WRITE;
/*!40000 ALTER TABLE `cs_record` DISABLE KEYS */;
INSERT INTO `cs_record` VALUES (20,'2022.11.15',1,10),(26,'2022.11.15',2,4),(27,'2022.11.15',1,3),(29,'2022.11.15',2,4),(30,'2022.11.15',1,23),(64,'2022.11.16',1,4),(65,'2022.11.16',1,23),(66,'2022.11.16',1,4),(71,'2022.11.16',2,7),(72,'2022.11.16',1,4),(73,'2022.11.16',1,28),(78,'2022.11.16',1,7),(79,'2022.11.16',2,27),(80,'2022.11.16',1,29),(81,'2022.11.16',1,3),(82,'2022.11.16',1,3),(83,'2022.11.16',1,3),(84,'2022.11.16',1,3),(85,'2022.11.16',1,3),(86,'2022.11.16',1,3),(87,'2022.11.16',1,3),(88,'2022.11.16',1,3),(90,'2022.11.17',1,23),(91,'2022.11.17',1,23),(93,'2022.11.17',1,23),(96,'2022.11.17',1,23),(97,'2022.11.17',1,23),(99,'2022.11.17',1,27),(100,'2022.11.17',1,23),(101,'2022.11.17',1,23),(103,'2022.11.17',1,7),(104,'2022.11.17',1,7),(106,'2022.11.17',1,7),(107,'2022.11.17',1,23),(119,'2022.11.18',4,27),(123,'2022.11.18',4,7),(125,'2022.11.18',1,4),(126,'2022.11.18',4,7),(127,'2022.11.18',2,3),(128,'2022.11.18',4,7),(129,'2022.11.18',3,4),(131,'2022.11.18',1,3),(132,'2022.11.18',1,41),(154,'2022.11.20',3,3),(156,'2022.11.20',1,10),(157,'2022.11.20',1,3),(158,'2022.11.20',1,81),(159,'2022.11.20',1,81),(160,'2022.11.20',1,81),(161,'2022.11.20',1,81),(162,'2022.11.20',1,81),(163,'2022.11.20',1,81),(164,'2022.11.20',1,81),(165,'2022.11.20',1,81),(166,'2022.11.20',1,81),(167,'2022.11.20',1,81),(168,'2022.11.20',1,81),(169,'2022.11.20',1,81),(170,'2022.11.20',1,81),(171,'2022.11.20',1,81),(172,'2022.11.20',2,46),(173,'2022.11.20',2,46),(174,'2022.11.20',1,81),(175,'2022.11.20',1,39),(176,'2022.11.20',2,51),(177,'2022.11.20',1,27),(178,'2022.11.20',2,3),(179,'2022.11.20',3,46),(180,'2022.11.20',1,81),(181,'2022.11.20',2,81),(182,'2022.11.20',1,46),(183,'2022.11.20',2,46),(184,'2022.11.20',1,81),(185,'2022.11.20',1,81),(186,'2022.11.20',1,46),(187,'2022.11.21',2,7),(188,'2022.11.21',1,3),(189,'2022.11.21',1,81),(190,'2022.11.21',1,4),(191,'2022.11.21',1,81),(192,'2022.11.21',1,81),(193,'2022.11.21',2,3),(194,'2022.11.21',1,4),(195,'2022.11.21',1,4),(196,'2022.11.21',1,81),(197,'2022.11.21',1,81);
/*!40000 ALTER TABLE `cs_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs_record_problem`
--

DROP TABLE IF EXISTS `cs_record_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs_record_problem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_correct` bit(1) NOT NULL,
  `cs_problem_id` bigint DEFAULT NULL,
  `cs_record_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlhb58dtoy6tah0umh8xx50g5t` (`cs_problem_id`),
  KEY `FK3d8yrqrab6v6h3w7iburilt32` (`cs_record_id`),
  CONSTRAINT `FK3d8yrqrab6v6h3w7iburilt32` FOREIGN KEY (`cs_record_id`) REFERENCES `cs_record` (`id`),
  CONSTRAINT `FKlhb58dtoy6tah0umh8xx50g5t` FOREIGN KEY (`cs_problem_id`) REFERENCES `cs_problem` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=541 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs_record_problem`
--

LOCK TABLES `cs_record_problem` WRITE;
/*!40000 ALTER TABLE `cs_record_problem` DISABLE KEYS */;
INSERT INTO `cs_record_problem` VALUES (223,_binary '\0',9,82),(224,_binary '\0',13,82),(225,_binary '\0',4,82),(226,_binary '\0',3,83),(227,_binary '\0',7,83),(228,_binary '\0',12,83),(229,_binary '\0',5,84),(230,_binary '\0',6,84),(231,_binary '\0',12,84),(232,_binary '',1,85),(233,_binary '\0',11,85),(234,_binary '\0',4,85),(235,_binary '',1,86),(236,_binary '\0',12,86),(237,_binary '\0',3,86),(238,_binary '\0',3,87),(239,_binary '\0',7,87),(240,_binary '\0',1,87),(241,_binary '\0',6,88),(242,_binary '\0',10,88),(243,_binary '\0',9,88),(247,_binary '\0',4,90),(248,_binary '\0',13,90),(249,_binary '\0',7,90),(250,_binary '\0',3,91),(251,_binary '',9,91),(252,_binary '',5,91),(256,_binary '',1,93),(257,_binary '',7,93),(258,_binary '',4,93),(265,_binary '\0',8,96),(266,_binary '\0',7,96),(267,_binary '\0',9,96),(268,_binary '',3,97),(269,_binary '',6,97),(270,_binary '',10,97),(274,_binary '\0',29,99),(275,_binary '',20,99),(276,_binary '\0',13,99),(277,_binary '\0',9,100),(278,_binary '\0',10,100),(279,_binary '\0',27,100),(280,_binary '\0',27,101),(281,_binary '\0',26,101),(282,_binary '\0',13,101),(286,_binary '\0',28,103),(287,_binary '\0',53,103),(288,_binary '\0',2,103),(289,_binary '',19,104),(290,_binary '\0',37,104),(291,_binary '\0',1,104),(295,_binary '',41,106),(296,_binary '\0',45,106),(297,_binary '\0',34,106),(298,_binary '\0',39,107),(299,_binary '\0',22,107),(300,_binary '\0',29,107),(343,_binary '\0',19,123),(344,_binary '\0',53,123),(345,_binary '\0',39,123),(349,_binary '\0',25,125),(350,_binary '',5,125),(351,_binary '\0',3,125),(352,_binary '\0',25,126),(353,_binary '\0',5,126),(354,_binary '\0',3,126),(355,_binary '\0',2,128),(356,_binary '\0',47,128),(357,_binary '\0',26,128),(358,_binary '\0',2,129),(359,_binary '\0',47,129),(360,_binary '\0',26,129),(364,_binary '\0',25,131),(365,_binary '\0',42,131),(366,_binary '\0',44,131),(367,_binary '',32,132),(368,_binary '\0',23,132),(369,_binary '\0',33,132),(430,_binary '\0',12,154),(431,_binary '',71,154),(432,_binary '\0',24,154),(433,_binary '\0',1,156),(434,_binary '\0',12,156),(435,_binary '\0',63,156),(436,_binary '\0',39,157),(437,_binary '\0',51,157),(438,_binary '\0',7,157),(439,_binary '\0',9,158),(440,_binary '\0',27,158),(441,_binary '\0',5,158),(442,_binary '\0',84,159),(443,_binary '\0',24,159),(444,_binary '\0',71,159),(445,_binary '',31,160),(446,_binary '\0',66,160),(447,_binary '\0',68,160),(448,_binary '\0',31,161),(449,_binary '\0',39,161),(450,_binary '\0',78,161),(451,_binary '',33,162),(452,_binary '\0',67,162),(453,_binary '\0',27,162),(454,_binary '\0',81,163),(455,_binary '\0',51,163),(456,_binary '\0',73,163),(457,_binary '',26,164),(458,_binary '\0',41,164),(459,_binary '\0',9,164),(460,_binary '',7,165),(461,_binary '',76,165),(462,_binary '\0',33,165),(463,_binary '\0',10,166),(464,_binary '\0',24,166),(465,_binary '\0',32,166),(466,_binary '\0',46,167),(467,_binary '\0',1,167),(468,_binary '\0',63,167),(469,_binary '',12,168),(470,_binary '\0',18,168),(471,_binary '\0',8,168),(472,_binary '\0',19,169),(473,_binary '\0',75,169),(474,_binary '\0',74,169),(475,_binary '\0',86,170),(476,_binary '\0',45,170),(477,_binary '\0',10,170),(478,_binary '\0',65,171),(479,_binary '\0',64,171),(480,_binary '\0',45,171),(481,_binary '\0',65,172),(482,_binary '\0',64,172),(483,_binary '\0',45,172),(484,_binary '\0',38,173),(485,_binary '\0',2,173),(486,_binary '\0',64,173),(487,_binary '\0',76,174),(488,_binary '\0',34,174),(489,_binary '\0',81,174),(490,_binary '\0',72,176),(491,_binary '\0',77,176),(492,_binary '',11,176),(493,_binary '\0',27,178),(494,_binary '\0',17,178),(495,_binary '\0',23,178),(496,_binary '\0',66,180),(497,_binary '\0',72,180),(498,_binary '\0',85,180),(499,_binary '\0',82,181),(500,_binary '\0',44,181),(501,_binary '\0',27,181),(502,_binary '\0',24,183),(503,_binary '\0',72,183),(504,_binary '\0',45,183),(505,_binary '\0',19,185),(506,_binary '\0',79,185),(507,_binary '\0',44,185),(508,_binary '\0',54,186),(509,_binary '',47,186),(510,_binary '\0',31,186),(511,_binary '\0',77,187),(512,_binary '\0',74,187),(513,_binary '',6,187),(514,_binary '\0',79,189),(515,_binary '\0',75,189),(516,_binary '\0',10,189),(517,_binary '\0',24,190),(518,_binary '',65,190),(519,_binary '\0',7,190),(520,_binary '\0',63,191),(521,_binary '\0',34,191),(522,_binary '\0',45,191),(523,_binary '\0',23,192),(524,_binary '\0',6,192),(525,_binary '\0',28,192),(526,_binary '\0',35,193),(527,_binary '\0',46,193),(528,_binary '\0',51,193),(529,_binary '\0',84,194),(530,_binary '\0',12,194),(531,_binary '',70,194),(532,_binary '',10,195),(533,_binary '\0',64,195),(534,_binary '\0',39,195),(535,_binary '',31,196),(536,_binary '\0',3,196),(537,_binary '',77,196),(538,_binary '\0',24,197),(539,_binary '',48,197),(540,_binary '\0',82,197);
/*!40000 ALTER TABLE `cs_record_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_request` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `request_user_id` bigint DEFAULT NULL,
  `target_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjlny04h75vb5qsaj69nx7ygjk` (`request_user_id`),
  KEY `FKth5w22da4b2mw98iiuxsjffvg` (`target_user_id`),
  CONSTRAINT `FKjlny04h75vb5qsaj69nx7ygjk` FOREIGN KEY (`request_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKth5w22da4b2mw98iiuxsjffvg` FOREIGN KEY (`target_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_request`
--

LOCK TABLES `friend_request` WRITE;
/*!40000 ALTER TABLE `friend_request` DISABLE KEYS */;
INSERT INTO `friend_request` VALUES (91,'2022-11-20 11:46:26.624000',81,84);
/*!40000 ALTER TABLE `friend_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `first_user_id` bigint DEFAULT NULL,
  `second_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK178wv5xf5j435ijvbxj59r3fc` (`first_user_id`),
  KEY `FK60mp89cdr1s9gwmrfrqbt6nog` (`second_user_id`),
  CONSTRAINT `FK178wv5xf5j435ijvbxj59r3fc` FOREIGN KEY (`first_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK60mp89cdr1s9gwmrfrqbt6nog` FOREIGN KEY (`second_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (5,'2022-11-16 00:10:46.689000',24,4),(7,'2022-11-16 00:10:51.643000',7,4),(15,'2022-11-16 13:40:29.740000',31,7),(16,'2022-11-16 15:18:19.956000',27,7),(18,'2022-11-18 01:48:03.812000',23,4),(21,'2022-11-18 10:15:03.885000',27,3),(40,'2022-11-19 15:08:27.113000',31,3),(43,'2022-11-19 15:11:33.641000',48,31),(45,'2022-11-19 15:19:36.874000',48,7),(50,'2022-11-19 15:34:15.712000',48,3),(55,'2022-11-19 15:53:17.873000',10,9),(60,'2022-11-19 16:08:06.102000',51,27),(79,'2022-11-20 07:33:59.640000',38,23),(80,'2022-11-20 07:34:00.533000',38,4),(85,'2022-11-20 11:38:06.595000',84,3),(86,'2022-11-20 11:51:24.885000',81,27),(87,'2022-11-20 12:15:19.619000',81,3),(88,'2022-11-20 12:17:35.227000',46,3),(89,'2022-11-20 15:09:58.322000',7,3),(90,'2022-11-20 15:10:12.877000',81,7),(91,'2022-11-20 15:20:35.232000',4,3),(92,'2022-11-20 16:15:25.508000',81,46);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `min_lv` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,1,'화장실'),(2,3,'원룸'),(3,7,'스타트업'),(4,13,'중소기업'),(5,21,'중견기업'),(6,31,'대기업'),(7,43,'삼성');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ssafy_record`
--

DROP TABLE IF EXISTS `ssafy_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ssafy_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `is_correct` bit(1) NOT NULL,
  `winning_streak` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK86k86qfmm57hb1c6shync255q` (`user_id`),
  CONSTRAINT `FK86k86qfmm57hb1c6shync255q` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=868 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ssafy_record`
--

LOCK TABLES `ssafy_record` WRITE;
/*!40000 ALTER TABLE `ssafy_record` DISABLE KEYS */;
INSERT INTO `ssafy_record` VALUES (1,'2022.11.17',_binary '',1,27),(2,'2022.11.17',_binary '\0',0,27),(3,'2022.11.17',_binary '\0',0,27),(7,'2022.11.17',_binary '\0',0,4),(8,'2022.11.17',_binary '\0',0,4),(9,'2022.11.17',_binary '\0',0,9),(10,'2022.11.17',_binary '',1,9),(11,'2022.11.17',_binary '\0',0,9),(12,'2022.11.17',_binary '\0',0,37),(13,'2022.11.18',_binary '\0',0,27),(14,'2022.11.18',_binary '\0',0,27),(15,'2022.11.18',_binary '\0',0,27),(16,'2022.11.18',_binary '\0',0,27),(17,'2022.11.18',_binary '\0',0,4),(18,'2022.11.18',_binary '\0',0,4),(19,'2022.11.18',_binary '\0',0,4),(20,'2022.11.18',_binary '\0',0,4),(21,'2022.11.18',_binary '\0',0,4),(22,'2022.11.18',_binary '\0',0,4),(23,'2022.11.18',_binary '\0',0,4),(24,'2022.11.18',_binary '\0',0,29),(25,'2022.11.18',_binary '',1,29),(26,'2022.11.18',_binary '\0',0,29),(27,'2022.11.18',_binary '\0',0,29),(28,'2022.11.18',_binary '\0',0,29),(29,'2022.11.18',_binary '\0',0,29),(30,'2022.11.18',_binary '\0',0,29),(31,'2022.11.18',_binary '',1,29),(32,'2022.11.18',_binary '\0',0,29),(33,'2022.11.18',_binary '',1,29),(34,'2022.11.18',_binary '\0',0,29),(35,'2022.11.18',_binary '\0',0,29),(36,'2022.11.18',_binary '\0',0,29),(37,'2022.11.18',_binary '\0',0,29),(38,'2022.11.18',_binary '',1,29),(39,'2022.11.18',_binary '\0',0,29),(40,'2022.11.18',_binary '',1,29),(41,'2022.11.18',_binary '',2,29),(42,'2022.11.18',_binary '\0',0,29),(43,'2022.11.18',_binary '',1,9),(44,'2022.11.18',_binary '\0',0,9),(45,'2022.11.18',_binary '',1,9),(46,'2022.11.18',_binary '',2,9),(47,'2022.11.18',_binary '\0',0,9),(48,'2022.11.18',_binary '',1,9),(49,'2022.11.18',_binary '',2,9),(50,'2022.11.18',_binary '\0',0,9),(51,'2022.11.18',_binary '\0',0,9),(52,'2022.11.18',_binary '',1,9),(53,'2022.11.18',_binary '\0',0,9),(54,'2022.11.18',_binary '',1,9),(55,'2022.11.18',_binary '',2,9),(56,'2022.11.18',_binary '\0',0,9),(57,'2022.11.18',_binary '',1,9),(58,'2022.11.18',_binary '\0',0,9),(59,'2022.11.18',_binary '\0',0,9),(60,'2022.11.18',_binary '',1,9),(61,'2022.11.18',_binary '',2,9),(62,'2022.11.18',_binary '',3,9),(63,'2022.11.18',_binary '',4,9),(64,'2022.11.18',_binary '',5,9),(65,'2022.11.18',_binary '\0',0,9),(66,'2022.11.18',_binary '',1,9),(78,'2022.11.18',_binary '',2,27),(79,'2022.11.18',_binary '\0',0,27),(80,'2022.11.18',_binary '',1,27),(81,'2022.11.18',_binary '',2,27),(82,'2022.11.18',_binary '',3,27),(83,'2022.11.18',_binary '',4,27),(84,'2022.11.18',_binary '',5,27),(85,'2022.11.18',_binary '',6,27),(86,'2022.11.18',_binary '',7,27),(87,'2022.11.18',_binary '',8,27),(88,'2022.11.18',_binary '',9,27),(89,'2022.11.18',_binary '',10,27),(90,'2022.11.18',_binary '\0',0,4),(91,'2022.11.18',_binary '\0',0,4),(92,'2022.11.18',_binary '\0',0,4),(93,'2022.11.18',_binary '',1,4),(94,'2022.11.18',_binary '\0',0,4),(95,'2022.11.18',_binary '',1,4),(96,'2022.11.18',_binary '',2,4),(97,'2022.11.18',_binary '',3,4),(98,'2022.11.18',_binary '',4,4),(99,'2022.11.18',_binary '\0',0,4),(100,'2022.11.18',_binary '',11,27),(101,'2022.11.18',_binary '',12,27),(102,'2022.11.18',_binary '\0',0,27),(103,'2022.11.18',_binary '\0',0,27),(104,'2022.11.18',_binary '\0',0,27),(105,'2022.11.18',_binary '\0',0,27),(106,'2022.11.18',_binary '\0',0,27),(107,'2022.11.18',_binary '\0',0,27),(108,'2022.11.18',_binary '',1,27),(109,'2022.11.18',_binary '\0',0,27),(110,'2022.11.18',_binary '',1,27),(111,'2022.11.18',_binary '',2,27),(112,'2022.11.18',_binary '\0',0,39),(113,'2022.11.18',_binary '\0',0,39),(114,'2022.11.18',_binary '\0',0,39),(115,'2022.11.18',_binary '\0',0,39),(116,'2022.11.18',_binary '\0',0,39),(117,'2022.11.18',_binary '\0',0,39),(118,'2022.11.18',_binary '\0',0,27),(119,'2022.11.18',_binary '\0',0,27),(120,'2022.11.18',_binary '\0',0,27),(121,'2022.11.18',_binary '\0',0,27),(122,'2022.11.18',_binary '\0',0,27),(123,'2022.11.18',_binary '\0',0,27),(124,'2022.11.18',_binary '\0',0,27),(125,'2022.11.18',_binary '\0',0,27),(126,'2022.11.18',_binary '',1,27),(127,'2022.11.18',_binary '\0',0,27),(128,'2022.11.18',_binary '\0',0,27),(129,'2022.11.18',_binary '',1,27),(130,'2022.11.18',_binary '\0',0,27),(131,'2022.11.18',_binary '\0',0,27),(132,'2022.11.18',_binary '',1,27),(133,'2022.11.18',_binary '\0',0,27),(134,'2022.11.18',_binary '\0',0,27),(135,'2022.11.18',_binary '',1,27),(136,'2022.11.18',_binary '\0',0,27),(137,'2022.11.18',_binary '\0',0,27),(138,'2022.11.18',_binary '\0',0,27),(139,'2022.11.18',_binary '',1,27),(140,'2022.11.18',_binary '',2,27),(141,'2022.11.18',_binary '',3,27),(142,'2022.11.18',_binary '\0',0,27),(143,'2022.11.18',_binary '',1,27),(144,'2022.11.18',_binary '\0',0,27),(145,'2022.11.18',_binary '',1,4),(146,'2022.11.18',_binary '',2,4),(147,'2022.11.18',_binary '\0',0,4),(148,'2022.11.18',_binary '\0',0,4),(149,'2022.11.18',_binary '\0',0,4),(150,'2022.11.18',_binary '\0',0,4),(151,'2022.11.18',_binary '',1,4),(152,'2022.11.18',_binary '\0',0,4),(153,'2022.11.18',_binary '\0',0,4),(154,'2022.11.18',_binary '\0',0,4),(155,'2022.11.18',_binary '\0',0,4),(156,'2022.11.18',_binary '',1,4),(157,'2022.11.18',_binary '',2,4),(158,'2022.11.18',_binary '',3,4),(159,'2022.11.18',_binary '\0',0,4),(160,'2022.11.18',_binary '\0',0,4),(161,'2022.11.18',_binary '',1,4),(162,'2022.11.18',_binary '\0',0,4),(163,'2022.11.18',_binary '\0',0,4),(164,'2022.11.18',_binary '',1,4),(165,'2022.11.18',_binary '\0',0,4),(166,'2022.11.18',_binary '\0',0,4),(167,'2022.11.18',_binary '',1,4),(168,'2022.11.18',_binary '',2,4),(169,'2022.11.18',_binary '',3,4),(170,'2022.11.18',_binary '',4,4),(171,'2022.11.18',_binary '',5,4),(172,'2022.11.18',_binary '',6,4),(173,'2022.11.18',_binary '',7,4),(174,'2022.11.18',_binary '\0',0,4),(175,'2022.11.18',_binary '\0',0,4),(176,'2022.11.18',_binary '\0',0,4),(177,'2022.11.18',_binary '',2,7),(178,'2022.11.18',_binary '\0',0,7),(179,'2022.11.18',_binary '',1,7),(180,'2022.11.18',_binary '\0',0,3),(181,'2022.11.18',_binary '\0',0,3),(182,'2022.11.18',_binary '\0',0,3),(183,'2022.11.18',_binary '',1,3),(184,'2022.11.18',_binary '',2,3),(185,'2022.11.18',_binary '\0',0,3),(186,'2022.11.18',_binary '',2,7),(187,'2022.11.18',_binary '',1,4),(188,'2022.11.18',_binary '',2,4),(189,'2022.11.18',_binary '',3,4),(190,'2022.11.18',_binary '\0',0,4),(191,'2022.11.18',_binary '\0',0,4),(192,'2022.11.18',_binary '',1,4),(193,'2022.11.18',_binary '\0',0,4),(194,'2022.11.18',_binary '\0',0,4),(195,'2022.11.18',_binary '',1,4),(196,'2022.11.18',_binary '\0',0,4),(197,'2022.11.18',_binary '',1,4),(198,'2022.11.18',_binary '\0',0,4),(199,'2022.11.18',_binary '\0',0,4),(200,'2022.11.18',_binary '\0',0,4),(201,'2022.11.18',_binary '',1,4),(202,'2022.11.18',_binary '\0',0,4),(203,'2022.11.18',_binary '\0',0,4),(204,'2022.11.18',_binary '\0',0,4),(205,'2022.11.18',_binary '',1,4),(206,'2022.11.18',_binary '',2,4),(207,'2022.11.18',_binary '',3,4),(208,'2022.11.18',_binary '',4,4),(209,'2022.11.18',_binary '\0',0,4),(210,'2022.11.18',_binary '\0',0,4),(211,'2022.11.18',_binary '\0',0,4),(212,'2022.11.18',_binary '\0',0,4),(213,'2022.11.18',_binary '',1,4),(214,'2022.11.18',_binary '\0',0,4),(215,'2022.11.18',_binary '\0',0,4),(216,'2022.11.18',_binary '',1,4),(217,'2022.11.18',_binary '\0',0,4),(218,'2022.11.18',_binary '\0',0,4),(219,'2022.11.18',_binary '\0',0,4),(220,'2022.11.18',_binary '',1,4),(221,'2022.11.18',_binary '\0',0,4),(222,'2022.11.18',_binary '\0',0,4),(223,'2022.11.18',_binary '\0',0,4),(224,'2022.11.18',_binary '\0',0,4),(225,'2022.11.18',_binary '',1,4),(226,'2022.11.18',_binary '',2,4),(227,'2022.11.18',_binary '\0',0,4),(228,'2022.11.18',_binary '\0',0,4),(229,'2022.11.18',_binary '\0',0,4),(230,'2022.11.18',_binary '\0',0,4),(231,'2022.11.18',_binary '',1,4),(232,'2022.11.18',_binary '\0',0,7),(233,'2022.11.18',_binary '\0',0,4),(234,'2022.11.18',_binary '',1,7),(235,'2022.11.18',_binary '\0',0,4),(236,'2022.11.18',_binary '',2,7),(237,'2022.11.18',_binary '\0',0,4),(238,'2022.11.18',_binary '',3,7),(239,'2022.11.18',_binary '',4,7),(240,'2022.11.18',_binary '',1,4),(241,'2022.11.18',_binary '\0',0,7),(242,'2022.11.18',_binary '',2,4),(243,'2022.11.18',_binary '',1,7),(244,'2022.11.18',_binary '\0',0,7),(245,'2022.11.18',_binary '',3,4),(246,'2022.11.18',_binary '',1,7),(247,'2022.11.18',_binary '\0',0,7),(248,'2022.11.18',_binary '\0',0,4),(249,'2022.11.18',_binary '\0',0,4),(250,'2022.11.18',_binary '',1,7),(251,'2022.11.18',_binary '',1,4),(252,'2022.11.18',_binary '',2,7),(253,'2022.11.18',_binary '\0',0,7),(254,'2022.11.18',_binary '',2,4),(255,'2022.11.18',_binary '\0',0,7),(256,'2022.11.18',_binary '\0',0,4),(257,'2022.11.18',_binary '\0',0,4),(258,'2022.11.18',_binary '',1,4),(259,'2022.11.18',_binary '',1,7),(260,'2022.11.18',_binary '\0',0,4),(261,'2022.11.18',_binary '',2,7),(262,'2022.11.18',_binary '',3,7),(263,'2022.11.18',_binary '\0',0,7),(264,'2022.11.18',_binary '',1,4),(265,'2022.11.18',_binary '',1,7),(266,'2022.11.18',_binary '\0',0,7),(267,'2022.11.18',_binary '',2,4),(268,'2022.11.18',_binary '',1,7),(269,'2022.11.18',_binary '\0',0,7),(270,'2022.11.18',_binary '\0',0,7),(271,'2022.11.18',_binary '',1,7),(272,'2022.11.18',_binary '\0',0,7),(273,'2022.11.18',_binary '\0',0,7),(274,'2022.11.18',_binary '',1,7),(275,'2022.11.18',_binary '\0',0,4),(276,'2022.11.18',_binary '',2,7),(277,'2022.11.18',_binary '\0',0,4),(278,'2022.11.18',_binary '',3,7),(279,'2022.11.18',_binary '',4,7),(280,'2022.11.18',_binary '\0',0,7),(281,'2022.11.18',_binary '',1,7),(282,'2022.11.18',_binary '\0',0,7),(283,'2022.11.18',_binary '\0',0,27),(284,'2022.11.18',_binary '\0',0,27),(285,'2022.11.18',_binary '\0',0,27),(286,'2022.11.18',_binary '\0',0,27),(287,'2022.11.18',_binary '\0',0,27),(288,'2022.11.18',_binary '\0',0,27),(289,'2022.11.18',_binary '',1,4),(290,'2022.11.18',_binary '',2,4),(291,'2022.11.18',_binary '',3,4),(294,'2022.11.18',_binary '',1,7),(296,'2022.11.18',_binary '',2,7),(298,'2022.11.18',_binary '\0',0,7),(299,'2022.11.18',_binary '\0',0,7),(300,'2022.11.18',_binary '',1,7),(302,'2022.11.18',_binary '\0',0,7),(304,'2022.11.18',_binary '\0',0,7),(314,'2022.11.18',_binary '',4,4),(316,'2022.11.18',_binary '',5,4),(317,'2022.11.18',_binary '\0',0,4),(322,'2022.11.18',_binary '',1,4),(325,'2022.11.18',_binary '',2,4),(326,'2022.11.18',_binary '\0',0,4),(328,'2022.11.18',_binary '\0',0,4),(329,'2022.11.18',_binary '',1,3),(331,'2022.11.18',_binary '\0',0,3),(333,'2022.11.18',_binary '\0',0,3),(334,'2022.11.18',_binary '',1,3),(335,'2022.11.18',_binary '\0',0,3),(336,'2022.11.18',_binary '\0',0,3),(337,'2022.11.18',_binary '',1,3),(338,'2022.11.18',_binary '\0',0,27),(339,'2022.11.18',_binary '\0',0,3),(340,'2022.11.18',_binary '',1,3),(341,'2022.11.18',_binary '\0',0,27),(342,'2022.11.18',_binary '\0',0,27),(343,'2022.11.18',_binary '\0',0,3),(344,'2022.11.18',_binary '',2,27),(345,'2022.11.18',_binary '\0',0,3),(346,'2022.11.18',_binary '',3,27),(347,'2022.11.18',_binary '',1,3),(348,'2022.11.18',_binary '',4,27),(349,'2022.11.18',_binary '',5,27),(350,'2022.11.18',_binary '\0',0,3),(351,'2022.11.18',_binary '\0',0,27),(352,'2022.11.18',_binary '',1,3),(353,'2022.11.18',_binary '\0',0,27),(354,'2022.11.18',_binary '\0',0,3),(355,'2022.11.18',_binary '',1,27),(356,'2022.11.18',_binary '',1,3),(357,'2022.11.18',_binary '',2,27),(358,'2022.11.18',_binary '\0',0,3),(359,'2022.11.18',_binary '',3,27),(360,'2022.11.18',_binary '\0',0,3),(361,'2022.11.18',_binary '',4,27),(362,'2022.11.18',_binary '\0',0,3),(363,'2022.11.18',_binary '\0',0,3),(364,'2022.11.18',_binary '',5,27),(365,'2022.11.18',_binary '',6,27),(366,'2022.11.18',_binary '\0',0,3),(367,'2022.11.18',_binary '',7,27),(368,'2022.11.18',_binary '\0',0,3),(369,'2022.11.18',_binary '\0',0,27),(370,'2022.11.18',_binary '\0',0,3),(371,'2022.11.18',_binary '',1,3),(372,'2022.11.18',_binary '',2,3),(373,'2022.11.18',_binary '',3,3),(374,'2022.11.18',_binary '',4,3),(375,'2022.11.18',_binary '\0',0,3),(376,'2022.11.18',_binary '',1,3),(377,'2022.11.18',_binary '\0',0,3),(378,'2022.11.18',_binary '\0',0,3),(379,'2022.11.18',_binary '',1,3),(380,'2022.11.18',_binary '\0',0,3),(381,'2022.11.18',_binary '',1,3),(382,'2022.11.18',_binary '\0',0,3),(383,'2022.11.18',_binary '\0',0,27),(384,'2022.11.18',_binary '',1,27),(385,'2022.11.18',_binary '\0',0,27),(386,'2022.11.18',_binary '',1,27),(387,'2022.11.18',_binary '',2,27),(388,'2022.11.18',_binary '\0',0,27),(389,'2022.11.18',_binary '',1,27),(390,'2022.11.18',_binary '',2,27),(391,'2022.11.18',_binary '\0',0,27),(392,'2022.11.18',_binary '',1,27),(393,'2022.11.18',_binary '\0',0,27),(394,'2022.11.18',_binary '',1,27),(395,'2022.11.18',_binary '\0',0,27),(396,'2022.11.18',_binary '',1,27),(397,'2022.11.18',_binary '\0',0,27),(398,'2022.11.18',_binary '\0',0,27),(399,'2022.11.18',_binary '',1,27),(400,'2022.11.18',_binary '',2,27),(401,'2022.11.18',_binary '\0',0,27),(402,'2022.11.18',_binary '\0',0,27),(403,'2022.11.18',_binary '\0',0,27),(404,'2022.11.18',_binary '\0',0,27),(405,'2022.11.18',_binary '',1,27),(406,'2022.11.18',_binary '\0',0,7),(407,'2022.11.18',_binary '',1,7),(408,'2022.11.18',_binary '\0',0,7),(409,'2022.11.18',_binary '\0',0,27),(410,'2022.11.18',_binary '\0',0,7),(411,'2022.11.18',_binary '\0',0,7),(412,'2022.11.18',_binary '',1,7),(413,'2022.11.18',_binary '',1,3),(414,'2022.11.18',_binary '\0',0,7),(415,'2022.11.18',_binary '',1,7),(416,'2022.11.18',_binary '\0',0,7),(417,'2022.11.18',_binary '',1,7),(418,'2022.11.18',_binary '\0',0,7),(419,'2022.11.18',_binary '\0',0,7),(420,'2022.11.18',_binary '',1,7),(421,'2022.11.18',_binary '\0',0,27),(422,'2022.11.18',_binary '',1,27),(423,'2022.11.18',_binary '\0',0,27),(424,'2022.11.18',_binary '',1,27),(425,'2022.11.18',_binary '\0',0,27),(426,'2022.11.18',_binary '\0',0,27),(427,'2022.11.18',_binary '',1,27),(428,'2022.11.18',_binary '',2,27),(429,'2022.11.18',_binary '\0',0,27),(430,'2022.11.18',_binary '\0',0,27),(431,'2022.11.18',_binary '\0',0,27),(432,'2022.11.18',_binary '',1,27),(433,'2022.11.18',_binary '\0',0,27),(434,'2022.11.18',_binary '\0',0,27),(435,'2022.11.18',_binary '\0',0,27),(436,'2022.11.18',_binary '',1,27),(437,'2022.11.18',_binary '',2,27),(438,'2022.11.18',_binary '',3,27),(439,'2022.11.18',_binary '',4,27),(440,'2022.11.18',_binary '\0',0,27),(441,'2022.11.18',_binary '',1,27),(442,'2022.11.18',_binary '',2,27),(443,'2022.11.18',_binary '\0',0,27),(444,'2022.11.18',_binary '',1,27),(445,'2022.11.18',_binary '\0',0,27),(446,'2022.11.18',_binary '',1,27),(447,'2022.11.18',_binary '\0',0,27),(448,'2022.11.18',_binary '',1,27),(449,'2022.11.18',_binary '\0',0,27),(450,'2022.11.18',_binary '\0',0,27),(451,'2022.11.18',_binary '\0',0,27),(452,'2022.11.18',_binary '\0',0,27),(453,'2022.11.18',_binary '',1,27),(454,'2022.11.18',_binary '',2,27),(455,'2022.11.18',_binary '\0',0,27),(456,'2022.11.18',_binary '',1,27),(457,'2022.11.18',_binary '\0',0,27),(458,'2022.11.18',_binary '\0',0,27),(459,'2022.11.18',_binary '',1,27),(460,'2022.11.18',_binary '\0',0,27),(461,'2022.11.18',_binary '\0',0,27),(462,'2022.11.18',_binary '',1,27),(463,'2022.11.18',_binary '\0',0,27),(464,'2022.11.18',_binary '\0',0,27),(465,'2022.11.18',_binary '\0',0,27),(466,'2022.11.18',_binary '',1,27),(467,'2022.11.18',_binary '',2,27),(468,'2022.11.18',_binary '',3,27),(469,'2022.11.18',_binary '',4,27),(470,'2022.11.18',_binary '\0',0,27),(471,'2022.11.18',_binary '',1,27),(472,'2022.11.18',_binary '\0',0,27),(473,'2022.11.18',_binary '',1,27),(474,'2022.11.18',_binary '\0',0,27),(475,'2022.11.18',_binary '',1,27),(476,'2022.11.18',_binary '',2,27),(477,'2022.11.18',_binary '\0',0,27),(478,'2022.11.18',_binary '',1,27),(479,'2022.11.18',_binary '',2,27),(480,'2022.11.18',_binary '\0',0,27),(481,'2022.11.18',_binary '',1,27),(482,'2022.11.18',_binary '',2,27),(483,'2022.11.18',_binary '',3,27),(484,'2022.11.18',_binary '\0',0,27),(485,'2022.11.18',_binary '\0',0,27),(486,'2022.11.18',_binary '',1,27),(487,'2022.11.18',_binary '\0',0,27),(488,'2022.11.18',_binary '',1,27),(489,'2022.11.18',_binary '',2,27),(490,'2022.11.18',_binary '',3,27),(491,'2022.11.18',_binary '\0',0,27),(492,'2022.11.18',_binary '',1,27),(493,'2022.11.18',_binary '',2,27),(494,'2022.11.18',_binary '',3,27),(495,'2022.11.18',_binary '\0',0,27),(496,'2022.11.18',_binary '\0',0,27),(497,'2022.11.18',_binary '',1,27),(498,'2022.11.18',_binary '\0',0,27),(499,'2022.11.18',_binary '',1,27),(500,'2022.11.18',_binary '\0',0,27),(501,'2022.11.18',_binary '\0',0,27),(502,'2022.11.18',_binary '',1,27),(503,'2022.11.18',_binary '\0',0,27),(504,'2022.11.18',_binary '\0',0,27),(505,'2022.11.18',_binary '\0',0,27),(506,'2022.11.18',_binary '\0',0,27),(507,'2022.11.18',_binary '\0',0,27),(508,'2022.11.18',_binary '\0',0,27),(509,'2022.11.18',_binary '',1,27),(510,'2022.11.18',_binary '\0',0,27),(511,'2022.11.18',_binary '\0',0,27),(512,'2022.11.18',_binary '',1,27),(513,'2022.11.18',_binary '\0',0,27),(514,'2022.11.18',_binary '',1,27),(515,'2022.11.18',_binary '',2,27),(516,'2022.11.18',_binary '',3,27),(517,'2022.11.18',_binary '',4,27),(518,'2022.11.18',_binary '',5,27),(519,'2022.11.18',_binary '',6,27),(520,'2022.11.18',_binary '',7,27),(521,'2022.11.18',_binary '\0',0,27),(522,'2022.11.18',_binary '\0',0,27),(523,'2022.11.18',_binary '',1,27),(524,'2022.11.18',_binary '',2,27),(525,'2022.11.18',_binary '',3,27),(526,'2022.11.18',_binary '\0',0,27),(527,'2022.11.18',_binary '\0',0,27),(528,'2022.11.18',_binary '\0',0,7),(529,'2022.11.18',_binary '\0',0,7),(530,'2022.11.18',_binary '',1,7),(531,'2022.11.18',_binary '',2,7),(532,'2022.11.18',_binary '',3,7),(533,'2022.11.18',_binary '',4,7),(534,'2022.11.18',_binary '',5,7),(535,'2022.11.18',_binary '',6,7),(536,'2022.11.18',_binary '',7,7),(537,'2022.11.18',_binary '',8,7),(538,'2022.11.18',_binary '\0',0,7),(539,'2022.11.18',_binary '\0',0,3),(540,'2022.11.18',_binary '\0',0,3),(541,'2022.11.18',_binary '',1,27),(542,'2022.11.18',_binary '\0',0,3),(543,'2022.11.18',_binary '\0',0,27),(544,'2022.11.18',_binary '\0',0,3),(545,'2022.11.18',_binary '\0',0,3),(546,'2022.11.18',_binary '\0',0,27),(547,'2022.11.18',_binary '\0',0,3),(548,'2022.11.18',_binary '\0',0,27),(549,'2022.11.18',_binary '',1,3),(550,'2022.11.18',_binary '',1,27),(551,'2022.11.18',_binary '',2,3),(552,'2022.11.18',_binary '\0',0,27),(553,'2022.11.18',_binary '\0',0,27),(554,'2022.11.18',_binary '',3,3),(555,'2022.11.18',_binary '',1,27),(556,'2022.11.18',_binary '',2,27),(557,'2022.11.18',_binary '\0',0,3),(558,'2022.11.18',_binary '\0',0,27),(559,'2022.11.18',_binary '\0',0,3),(560,'2022.11.18',_binary '',1,27),(561,'2022.11.18',_binary '\0',0,3),(562,'2022.11.18',_binary '\0',0,27),(563,'2022.11.18',_binary '\0',0,3),(564,'2022.11.18',_binary '',1,27),(565,'2022.11.18',_binary '\0',0,3),(566,'2022.11.18',_binary '\0',0,27),(567,'2022.11.18',_binary '\0',0,27),(568,'2022.11.18',_binary '',1,27),(569,'2022.11.18',_binary '\0',0,27),(570,'2022.11.18',_binary '\0',0,3),(571,'2022.11.18',_binary '',1,3),(572,'2022.11.18',_binary '\0',0,3),(583,'2022.11.18',_binary '\0',0,3),(584,'2022.11.18',_binary '',1,3),(585,'2022.11.18',_binary '',2,3),(586,'2022.11.18',_binary '',3,3),(587,'2022.11.18',_binary '',4,3),(588,'2022.11.18',_binary '\0',0,3),(589,'2022.11.18',_binary '\0',0,3),(590,'2022.11.18',_binary '\0',0,3),(591,'2022.11.18',_binary '',1,3),(592,'2022.11.18',_binary '\0',0,3),(593,'2022.11.18',_binary '',1,3),(594,'2022.11.18',_binary '',2,3),(595,'2022.11.18',_binary '',3,3),(596,'2022.11.18',_binary '\0',0,3),(597,'2022.11.18',_binary '',1,3),(598,'2022.11.18',_binary '',2,3),(599,'2022.11.18',_binary '\0',0,3),(600,'2022.11.18',_binary '\0',0,3),(601,'2022.11.18',_binary '\0',0,3),(602,'2022.11.18',_binary '\0',0,3),(603,'2022.11.18',_binary '\0',0,3),(604,'2022.11.18',_binary '\0',0,3),(605,'2022.11.18',_binary '',1,3),(606,'2022.11.18',_binary '\0',0,3),(607,'2022.11.18',_binary '\0',0,41),(608,'2022.11.18',_binary '\0',0,41),(609,'2022.11.18',_binary '\0',0,41),(610,'2022.11.18',_binary '\0',0,41),(611,'2022.11.18',_binary '',2,10),(612,'2022.11.18',_binary '\0',0,10),(613,'2022.11.19',_binary '',1,4),(614,'2022.11.19',_binary '',2,4),(615,'2022.11.19',_binary '\0',0,4),(616,'2022.11.19',_binary '',1,4),(617,'2022.11.19',_binary '\0',0,4),(618,'2022.11.19',_binary '\0',0,4),(619,'2022.11.19',_binary '',1,4),(620,'2022.11.19',_binary '',2,4),(621,'2022.11.19',_binary '',3,4),(622,'2022.11.19',_binary '\0',0,4),(623,'2022.11.19',_binary '\0',0,4),(624,'2022.11.19',_binary '\0',0,4),(625,'2022.11.19',_binary '',1,4),(626,'2022.11.19',_binary '',2,4),(627,'2022.11.19',_binary '\0',0,4),(628,'2022.11.19',_binary '\0',0,3),(629,'2022.11.19',_binary '\0',0,10),(630,'2022.11.19',_binary '',1,27),(631,'2022.11.19',_binary '',2,27),(632,'2022.11.19',_binary '\0',0,27),(633,'2022.11.19',_binary '',1,27),(634,'2022.11.19',_binary '\0',0,27),(635,'2022.11.19',_binary '',1,27),(636,'2022.11.19',_binary '\0',0,27),(637,'2022.11.19',_binary '',1,27),(638,'2022.11.19',_binary '',2,27),(639,'2022.11.19',_binary '\0',0,27),(640,'2022.11.19',_binary '',1,27),(651,'2022.11.19',_binary '',2,27),(652,'2022.11.19',_binary '',3,27),(653,'2022.11.19',_binary '',4,27),(654,'2022.11.19',_binary '',5,27),(655,'2022.11.19',_binary '',6,27),(656,'2022.11.19',_binary '\0',0,27),(657,'2022.11.19',_binary '',1,10),(658,'2022.11.19',_binary '\0',0,10),(659,'2022.11.19',_binary '',1,10),(660,'2022.11.19',_binary '',2,10),(661,'2022.11.19',_binary '\0',0,10),(662,'2022.11.19',_binary '\0',0,10),(663,'2022.11.19',_binary '\0',0,42),(664,'2022.11.19',_binary '\0',0,42),(665,'2022.11.19',_binary '\0',0,42),(666,'2022.11.19',_binary '',1,27),(667,'2022.11.19',_binary '',2,27),(668,'2022.11.19',_binary '',3,27),(669,'2022.11.19',_binary '',4,27),(670,'2022.11.19',_binary '',5,27),(671,'2022.11.19',_binary '\0',0,27),(672,'2022.11.19',_binary '',1,27),(673,'2022.11.19',_binary '',2,27),(674,'2022.11.19',_binary '',3,27),(675,'2022.11.19',_binary '',4,27),(676,'2022.11.19',_binary '',5,27),(677,'2022.11.19',_binary '\0',0,27),(678,'2022.11.19',_binary '\0',0,27),(679,'2022.11.19',_binary '\0',0,27),(680,'2022.11.19',_binary '',1,27),(681,'2022.11.19',_binary '\0',0,27),(682,'2022.11.19',_binary '',1,27),(683,'2022.11.19',_binary '',2,27),(684,'2022.11.19',_binary '\0',0,46),(685,'2022.11.19',_binary '\0',0,46),(686,'2022.11.19',_binary '\0',0,46),(687,'2022.11.19',_binary '',1,46),(688,'2022.11.19',_binary '\0',0,46),(689,'2022.11.19',_binary '',1,39),(690,'2022.11.19',_binary '',2,39),(691,'2022.11.19',_binary '',3,39),(692,'2022.11.19',_binary '\0',0,39),(693,'2022.11.19',_binary '',1,39),(694,'2022.11.19',_binary '\0',0,39),(695,'2022.11.19',_binary '',1,39),(696,'2022.11.19',_binary '',2,39),(697,'2022.11.19',_binary '',3,39),(698,'2022.11.19',_binary '\0',0,39),(699,'2022.11.19',_binary '',1,39),(700,'2022.11.19',_binary '',2,39),(701,'2022.11.19',_binary '\0',0,39),(702,'2022.11.19',_binary '',1,42),(703,'2022.11.19',_binary '\0',0,42),(704,'2022.11.19',_binary '\0',0,42),(705,'2022.11.19',_binary '',1,42),(706,'2022.11.19',_binary '',2,42),(707,'2022.11.19',_binary '',3,42),(708,'2022.11.19',_binary '',4,42),(709,'2022.11.19',_binary '\0',0,42),(710,'2022.11.20',_binary '\0',0,7),(711,'2022.11.20',_binary '',1,7),(712,'2022.11.20',_binary '',2,7),(713,'2022.11.20',_binary '',3,7),(714,'2022.11.20',_binary '',4,7),(715,'2022.11.20',_binary '',5,7),(716,'2022.11.20',_binary '\0',0,7),(717,'2022.11.20',_binary '',1,7),(718,'2022.11.20',_binary '',2,7),(719,'2022.11.20',_binary '',3,7),(720,'2022.11.20',_binary '',4,7),(721,'2022.11.20',_binary '\0',0,7),(722,'2022.11.20',_binary '\0',0,7),(723,'2022.11.20',_binary '',1,7),(724,'2022.11.20',_binary '',1,48),(725,'2022.11.20',_binary '',1,3),(726,'2022.11.20',_binary '',2,7),(727,'2022.11.20',_binary '',3,7),(728,'2022.11.20',_binary '',2,3),(729,'2022.11.20',_binary '',2,48),(730,'2022.11.20',_binary '',3,3),(731,'2022.11.20',_binary '\0',0,3),(732,'2022.11.20',_binary '',4,7),(733,'2022.11.20',_binary '\0',0,7),(734,'2022.11.20',_binary '',3,48),(735,'2022.11.20',_binary '',4,48),(736,'2022.11.20',_binary '\0',0,48),(737,'2022.11.20',_binary '',3,27),(738,'2022.11.20',_binary '',4,27),(739,'2022.11.20',_binary '',5,27),(740,'2022.11.20',_binary '\0',0,27),(741,'2022.11.20',_binary '',1,27),(742,'2022.11.20',_binary '\0',0,27),(743,'2022.11.20',_binary '\0',0,27),(744,'2022.11.20',_binary '\0',0,27),(745,'2022.11.20',_binary '\0',0,27),(746,'2022.11.20',_binary '',1,27),(747,'2022.11.20',_binary '',2,27),(748,'2022.11.20',_binary '',3,27),(749,'2022.11.20',_binary '',4,27),(750,'2022.11.20',_binary '',5,27),(751,'2022.11.20',_binary '\0',0,27),(752,'2022.11.20',_binary '\0',0,27),(753,'2022.11.20',_binary '\0',0,27),(754,'2022.11.20',_binary '\0',0,27),(755,'2022.11.20',_binary '\0',0,27),(756,'2022.11.20',_binary '\0',0,27),(757,'2022.11.20',_binary '',1,27),(758,'2022.11.20',_binary '',2,27),(759,'2022.11.20',_binary '\0',0,27),(760,'2022.11.20',_binary '',1,27),(761,'2022.11.20',_binary '\0',0,27),(762,'2022.11.20',_binary '',1,27),(763,'2022.11.20',_binary '\0',0,27),(764,'2022.11.20',_binary '',1,27),(765,'2022.11.20',_binary '',2,27),(766,'2022.11.20',_binary '\0',0,27),(767,'2022.11.20',_binary '\0',0,27),(768,'2022.11.20',_binary '\0',0,27),(769,'2022.11.20',_binary '\0',0,27),(770,'2022.11.20',_binary '',1,27),(771,'2022.11.20',_binary '',2,27),(772,'2022.11.20',_binary '\0',0,27),(773,'2022.11.20',_binary '\0',0,27),(774,'2022.11.20',_binary '\0',0,27),(775,'2022.11.20',_binary '',1,27),(776,'2022.11.20',_binary '',2,27),(777,'2022.11.20',_binary '\0',0,27),(778,'2022.11.20',_binary '',1,27),(779,'2022.11.20',_binary '',2,27),(780,'2022.11.20',_binary '',3,27),(781,'2022.11.20',_binary '',4,27),(782,'2022.11.20',_binary '',5,27),(783,'2022.11.20',_binary '',6,27),(784,'2022.11.20',_binary '\0',0,27),(785,'2022.11.20',_binary '\0',0,27),(786,'2022.11.20',_binary '\0',0,4),(787,'2022.11.20',_binary '\0',0,4),(788,'2022.11.20',_binary '',1,4),(789,'2022.11.20',_binary '\0',0,4),(790,'2022.11.20',_binary '',1,4),(791,'2022.11.20',_binary '\0',0,4),(792,'2022.11.20',_binary '\0',0,4),(793,'2022.11.20',_binary '',1,4),(794,'2022.11.20',_binary '',2,4),(795,'2022.11.20',_binary '\0',0,4),(796,'2022.11.20',_binary '',1,4),(797,'2022.11.20',_binary '',2,4),(798,'2022.11.20',_binary '\0',0,4),(799,'2022.11.20',_binary '\0',0,4),(800,'2022.11.20',_binary '\0',0,4),(801,'2022.11.20',_binary '',1,4),(802,'2022.11.20',_binary '',2,4),(803,'2022.11.20',_binary '\0',0,4),(804,'2022.11.20',_binary '\0',0,4),(805,'2022.11.20',_binary '\0',0,4),(806,'2022.11.20',_binary '',1,3),(807,'2022.11.20',_binary '',2,3),(808,'2022.11.20',_binary '\0',0,46),(809,'2022.11.20',_binary '\0',0,46),(810,'2022.11.20',_binary '',1,46),(811,'2022.11.20',_binary '\0',0,46),(812,'2022.11.20',_binary '',1,46),(813,'2022.11.20',_binary '\0',0,46),(814,'2022.11.20',_binary '\0',0,46),(815,'2022.11.20',_binary '\0',0,46),(816,'2022.11.20',_binary '',1,46),(817,'2022.11.20',_binary '\0',0,3),(818,'2022.11.20',_binary '\0',0,46),(819,'2022.11.20',_binary '',1,3),(820,'2022.11.20',_binary '',1,46),(821,'2022.11.20',_binary '',2,46),(822,'2022.11.20',_binary '',3,46),(823,'2022.11.20',_binary '',4,46),(824,'2022.11.20',_binary '\0',0,46),(825,'2022.11.20',_binary '\0',0,46),(826,'2022.11.20',_binary '',1,46),(827,'2022.11.20',_binary '\0',0,46),(828,'2022.11.20',_binary '\0',0,46),(829,'2022.11.20',_binary '\0',0,46),(830,'2022.11.20',_binary '',1,23),(831,'2022.11.20',_binary '',2,23),(832,'2022.11.20',_binary '\0',0,23),(833,'2022.11.20',_binary '\0',0,23),(834,'2022.11.20',_binary '\0',0,23),(835,'2022.11.20',_binary '',1,23),(836,'2022.11.20',_binary '',2,23),(837,'2022.11.20',_binary '\0',0,23),(838,'2022.11.20',_binary '',1,23),(839,'2022.11.20',_binary '',2,23),(840,'2022.11.20',_binary '',3,23),(841,'2022.11.20',_binary '',4,23),(842,'2022.11.20',_binary '\0',0,23),(843,'2022.11.20',_binary '\0',0,23),(844,'2022.11.20',_binary '\0',0,3),(845,'2022.11.20',_binary '\0',0,3),(846,'2022.11.20',_binary '\0',0,3),(847,'2022.11.20',_binary '\0',0,39),(848,'2022.11.20',_binary '\0',0,39),(849,'2022.11.20',_binary '\0',0,83),(850,'2022.11.20',_binary '',1,83),(851,'2022.11.20',_binary '',2,83),(852,'2022.11.20',_binary '\0',0,83),(853,'2022.11.20',_binary '',1,83),(854,'2022.11.20',_binary '\0',0,83),(855,'2022.11.20',_binary '\0',0,83),(856,'2022.11.20',_binary '\0',0,4),(857,'2022.11.20',_binary '',1,4),(858,'2022.11.20',_binary '',1,27),(859,'2022.11.20',_binary '',2,27),(860,'2022.11.20',_binary '\0',0,27),(861,'2022.11.20',_binary '\0',0,27),(862,'2022.11.20',_binary '',1,27),(863,'2022.11.20',_binary '\0',0,27),(864,'2022.11.21',_binary '\0',0,3),(865,'2022.11.21',_binary '\0',0,3),(866,'2022.11.21',_binary '\0',0,3),(867,'2022.11.21',_binary '\0',0,3);
/*!40000 ALTER TABLE `ssafy_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typing_paragraph`
--

DROP TABLE IF EXISTS `typing_paragraph`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typing_paragraph` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `lang_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typing_paragraph`
--

LOCK TABLES `typing_paragraph` WRITE;
/*!40000 ALTER TABLE `typing_paragraph` DISABLE KEYS */;
INSERT INTO `typing_paragraph` VALUES (3,'forˇiˇinˇrange(1,ˇ10): ˇˇˇˇprint(i)','PYTHON'),(4,'classˇDefault(dict): ˇˇˇˇdefˇ__missing__(self,ˇkey): ˇˇˇˇˇˇˇˇreturnˇkey','PYTHON'),(5,'defˇbit_length(self): ˇˇˇˇsˇ=ˇbin(self) ˇˇˇˇsˇ=ˇs.lstrip(\'-0b\') ˇˇˇˇreturnˇlen(s)','PYTHON'),(6,'Vˇvˇ=ˇmap.get(key); ˇifˇ(vˇ==ˇnull) ˇˇˇˇˇvˇ=ˇmap.put(key,ˇvalue); ˇreturnˇv;','JAVA'),(7,'forˇ(Map.Entry<K,ˇV>ˇentryˇ:ˇmap.entrySet()) ˇˇˇˇˇaction.accept(entry.getKey(),ˇentry.getValue());','JAVA'),(8,'BufferedReaderˇbrˇ=ˇnewˇBufferedReader(newˇInputStreamReader(System.in)); ˇStringBuilderˇsbˇ=ˇnewˇStringBuilder();','JAVA'),(9,'testP testP','1'),(10,'testJ etesJ','2'),(11,'intˇsumˇ=ˇwidgets.stream(). filter(bˇ->ˇb.getColor()ˇ==ˇRED). mapToInt(bˇ->ˇb.getWeight()). sum();','JAVA'),(12,'intˇsumOfWeightsˇ=ˇwidgets. parallelStream(). filter(bˇ->ˇb.getColor()ˇ==ˇRED). mapToInt(bˇ->ˇb.getWeight()) .sum();','JAVA'),(13,'intˇsumˇ=ˇ0; forˇ(intˇxˇ:ˇnumbers) {ˇsumˇ+=ˇx;ˇ}','JAVA'),(14,'Map<Buyer,ˇList<Transaction>>ˇsalesByBuyerˇ=ˇtxns.parallelStream(). unordered(). collect(groupingByConcurrent(Transaction::getBuyer));','JAVA'),(15,'LocalDateTimeˇnowˇ=ˇLocalDateTime.now(); StringˇformatedNowˇ=ˇnow.format(DateTimeFormatter. ofPattern(\"yyyy.MM.dd.hh.mm.ss\"));','JAVA'),(16,'try: ˇˇˇˇraiseˇTypeError except: ˇˇˇˇprint(sys.exc_info()) ˇˇˇˇtry: ˇˇˇˇˇˇˇˇˇraiseˇValueError ˇˇˇˇexcept: ˇˇˇˇˇˇˇˇprint(sys.exc_info()) ˇˇˇˇprint(sys.exc_info())','PYTHON'),(17,'defˇwhats_on_the_telly(penguin=None): ˇˇˇˇifˇpenguinˇisˇNone: ˇˇˇˇˇˇˇˇpenguinˇ=ˇ[] ˇˇˇˇpenguin.append(\"propertyˇofˇtheˇzoo\") ˇˇˇˇreturnˇpenguin','PYTHON'),(20,'classˇFoo: ˇˇˇˇpass classˇFoo(object): ˇˇˇˇpass','PYTHON'),(21,'interactive_inputˇ::=ˇˇ[stmt_list]ˇNEWLINEˇ|ˇcompound_stmtˇNEWLINE','PYTHON'),(22,'managerˇ=ˇ(EXPRESSION) asyncˇwithˇEXPRESSIONˇasˇTARGET: ˇˇˇˇSUITE','PYTHON'),(23,'#aˇone-lineˇannotation \'\'\' aˇmulti-lineˇannotation aˇmulti-lineˇannotation aˇmulti-lineˇannotation \'\'\'','PYTHON');
/*!40000 ALTER TABLE `typing_paragraph` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typing_record`
--

DROP TABLE IF EXISTS `typing_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typing_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `lang_type` int DEFAULT NULL,
  `ranks` int NOT NULL,
  `type_speed` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqm0amchwk8m2kni40qryilkp0` (`user_id`),
  CONSTRAINT `FKqm0amchwk8m2kni40qryilkp0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typing_record`
--

LOCK TABLES `typing_record` WRITE;
/*!40000 ALTER TABLE `typing_record` DISABLE KEYS */;
INSERT INTO `typing_record` VALUES (58,'2022.11.17',0,1,125,10),(59,'2022.11.17',1,1,127,9),(60,'2022.11.17',1,1,100,9),(61,'2022.11.17',0,1,103,9),(62,'2022.11.17',0,1,92,9),(63,'2022.11.17',0,1,127,10),(64,'2022.11.17',0,2,0,9),(65,'2022.11.17',0,1,204,27),(67,'2022.11.18',0,1,42,9),(68,'2022.11.18',0,1,85,9),(69,'2022.11.18',0,2,0,10),(70,'2022.11.18',0,1,85,9),(71,'2022.11.18',0,1,75,9),(72,'2022.11.18',0,1,75,9),(73,'2022.11.18',0,1,85,9),(74,'2022.11.18',0,1,60,9),(75,'2022.11.18',0,1,85,9),(76,'2022.11.18',0,1,85,9),(77,'2022.11.18',0,1,85,9),(78,'2022.11.18',0,2,0,10),(79,'2022.11.18',0,1,100,9),(80,'2022.11.18',0,2,0,10),(81,'2022.11.18',0,1,75,9),(82,'2022.11.18',0,2,0,10),(83,'2022.11.18',0,1,207,27),(84,'2022.11.18',0,2,186,3),(86,'2022.11.18',0,4,117,7),(88,'2022.11.18',0,2,131,3),(89,'2022.11.18',0,3,131,27),(90,'2022.11.18',0,4,131,7),(91,'2022.11.18',0,1,126,7),(92,'2022.11.18',0,2,124,27),(93,'2022.11.18',0,3,124,3),(95,'2022.11.18',0,1,170,27),(97,'2022.11.20',0,1,127,51),(98,'2022.11.20',0,2,120,7),(99,'2022.11.20',0,3,108,23),(100,'2022.11.20',0,4,0,4),(101,'2022.11.20',0,1,156,27),(102,'2022.11.20',0,2,143,46),(103,'2022.11.20',0,3,32,82),(104,'2022.11.20',0,4,0,81),(105,'2022.11.20',0,1,147,27),(106,'2022.11.20',0,2,105,4),(107,'2022.11.20',0,3,85,46),(108,'2022.11.20',0,4,0,81),(109,'2022.11.20',0,1,10,46),(110,'2022.11.20',0,2,9,27),(111,'2022.11.20',0,3,0,66),(112,'2022.11.20',0,4,0,81),(114,'2022.11.20',0,2,4,9),(115,'2022.11.20',0,3,1,7),(116,'2022.11.20',0,4,0,66),(117,'2022.11.20',0,1,16,7),(118,'2022.11.20',0,2,0,4),(119,'2022.11.20',0,3,0,66),(120,'2022.11.20',0,4,0,23),(121,'2022.11.20',0,1,11,3),(122,'2022.11.20',0,2,11,10),(123,'2022.11.20',0,3,7,51),(124,'2022.11.20',0,4,1,23),(125,'2022.11.20',0,1,25,46),(126,'2022.11.20',0,2,22,3),(127,'2022.11.20',0,3,14,81),(128,'2022.11.20',0,4,9,27),(130,'2022.11.20',0,2,24,7),(131,'2022.11.20',0,3,21,23),(132,'2022.11.20',0,4,0,10),(133,'2022.11.20',0,1,156,46),(134,'2022.11.20',0,2,46,23),(135,'2022.11.20',0,3,18,27),(136,'2022.11.20',0,4,0,81),(137,'2022.11.20',0,1,7,82),(138,'2022.11.20',0,2,0,10),(139,'2022.11.20',0,3,0,9),(140,'2022.11.20',0,4,0,4),(141,'2022.11.20',0,1,207,81),(142,'2022.11.20',0,2,147,23),(143,'2022.11.20',0,3,15,3),(145,'2022.11.20',0,1,185,3),(146,'2022.11.20',0,2,174,46),(147,'2022.11.20',0,3,141,23),(148,'2022.11.20',0,4,0,81),(149,'2022.11.20',0,1,37,4),(150,'2022.11.20',0,2,0,82),(151,'2022.11.20',0,3,0,10),(152,'2022.11.20',0,4,0,9),(153,'2022.11.20',0,1,42,46),(155,'2022.11.20',0,3,0,81),(156,'2022.11.20',0,4,0,3),(157,'2022.11.20',0,1,180,27),(158,'2022.11.20',0,2,169,4),(159,'2022.11.20',0,3,117,10),(160,'2022.11.20',0,4,0,3),(161,'2022.11.20',0,1,217,3),(162,'2022.11.20',0,2,142,27),(163,'2022.11.20',0,3,110,10),(164,'2022.11.20',0,4,0,51),(165,'2022.11.20',0,1,161,3),(166,'2022.11.20',0,2,122,27),(167,'2022.11.20',0,3,0,51),(168,'2022.11.20',0,4,0,4),(169,'2022.11.21',0,1,222,3),(170,'2022.11.21',0,2,160,81),(171,'2022.11.21',0,3,142,7),(172,'2022.11.21',0,4,142,27),(173,'2022.11.21',0,1,188,4),(174,'2022.11.21',0,2,133,7),(175,'2022.11.21',0,3,98,3),(176,'2022.11.21',0,4,30,10),(177,'2022.11.21',1,1,78,10),(178,'2022.11.21',1,2,66,81),(179,'2022.11.21',1,3,50,9),(180,'2022.11.21',1,4,0,82),(181,'2022.11.21',0,1,156,3),(182,'2022.11.21',0,2,46,9),(183,'2022.11.21',0,3,0,10),(184,'2022.11.21',0,4,0,27);
/*!40000 ALTER TABLE `typing_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `auth_provider` varchar(255) DEFAULT NULL,
  `bj_id` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `max_win_streak` int NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `office_lv` int NOT NULL,
  `point` bigint DEFAULT NULL,
  `profile_char` int NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `user_role` int NOT NULL,
  `winning_streak` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`),
  KEY `idx_maxWinStreak` (`max_win_streak`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'KAKAO','ksgf988','http://k.kakaocdn.net/dn/cmPZdR/btrLBekhv7B/Pqbpj1ByASMfI1wEWRGqek/img_640x640.jpg',6,'수진짱',7,0,22,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NjI5OCwiZXhwIjoxNjY5NTYxMDk4fQ.5AC0jeR0pPO1eCNSPiiRhqvKdDNSGq25DlEWtoOBNDAgMPap1i0etD9Zi3xHBmpm8TNYNdsxR9oFhzEqWgkHiA','2503842263',1,0),(4,'KAKAO','dusdml1502','http://k.kakaocdn.net/dn/QqZOZ/btrQGR60piT/w31Puh0PAzbAmKoOg7M8s0/img_640x640.jpg',8,'2연2',1,0,21,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NzIxMywiZXhwIjoxNjY5NTYyMDEzfQ.KDSJ7cLUacdsuUVGvI8zP0Di2JEw5475bXH_FNInhwd6ML3dhruEU2AfBNlzaXUJwZvoCg6wS010lFOZFMnkWQ','2506746729',1,1),(6,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu2QkLdWLrrMRpG2wm__boGrJHE-ScV8OGW7x7bA=s96-c',0,'모래반지빵야빵야',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODQ3NjI0NywiZXhwIjoxNjY5MDgxMDQ3fQ.ppue9rTJCKoPLzDWx6qzJOlVpUDOAXsQN2kDvAaHuaR_qBJ5qNg1UZwtJyPukE6Psi9knmQ6fiVltniq1SKhHg','110105907109065472105',1,0),(7,'KAKAO','dksktpq852','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',8,'카카오민형',7,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1Njk5MywiZXhwIjoxNjY5NTYxNzkzfQ.PMfSBo-rny-a4_xZPuOENWopA1YmNF6PeIuJuER38GnXmtcjTFEL2RKYtvJOEVX4lSAnynnMAyp3wjkyILZQ7w','2508704704',1,0),(9,'GITHUB',NULL,'https://avatars.githubusercontent.com/u/65272534?v=4',9,'test',1,0,10,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NjY0MSwiZXhwIjoxNjY5NTYxNDQxfQ.4hlEa2jw8OvbuCif_4yPG1OFMWaFKNs0ZV7Eks0sPlLQtrZGZJGNlqdSwNVtuKIv-_Dnjw5Zo-0jV3LaatmL8A','65272534',1,1),(10,'KAKAO','alsdyd320','http://k.kakaocdn.net/dn/8k8at/btrKgs5fMjD/XVw6lBamqvppAFlDAdbsbK/img_640x640.jpg',6,'alsdyd',1,0,22,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk0ODgyOCwiZXhwIjoxNjY5NTUzNjI4fQ.Ef9oS98jAXzaVPCgz732gWLeBOziBW929HVDc5uJvC0KXTrRSBQR9hukY9EUDrBSvxfmkxZn-7o-ABQEdECG8Q','2506920863',1,0),(23,'GOOGLE','dusdml1502','https://lh3.googleusercontent.com/a/ALm5wu2EcmeE1VH09K8NnTQSuFyfd6FqS9LEkeTrzpOW=s96-c',4,'연이',1,0,19,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkyNzU5MywiZXhwIjoxNjY5NTMyMzkzfQ.PKLurDa21owu_0NzMhTfvxnUrwgKuACKNQcpD6CJozEqM3vi9fv7ifNkoIpTmRDo8rV1NOsLsXVUP8QwiPLgHA','108619229627895693189',1,0),(24,'NAVER',NULL,NULL,0,'naverking',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODU1NjIzOCwiZXhwIjoxNjY5MTYxMDM4fQ.QFlbLQWcQctAUuRY7SYa5ngNSBjHMMKVryruJhYW9DThhLlyj4qOvsaMY6mR7NWrNetlFkJ95iUG2Oz75DCrjQ','IjgCuHbC1A7jDFEqsPDhzSF2wqyoLP_a8WBvluoPMeA',1,0),(25,'KAKAO',NULL,'http://k.kakaocdn.net/dn/CcisK/btrn1ynNCq9/pwnLOVkSxjXAsvDuxCy4R1/img_640x640.jpg',0,'해말근방콕',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODU1NTk5MywiZXhwIjoxNjY5MTYwNzkzfQ.zeXBezcxG5FmEwxvlF-iATEWFBpdzX_jdQIEfZEjKk2JRXn8RaBOxlCGh-ioQDtrUckEKtx7f_g475_64g5D5Q','2510013305',1,0),(27,'KAKAO','wnstlr0394','http://k.kakaocdn.net/dn/OwnoC/btrQr2nmQzm/s0Jm5o9Jjy4vJnnOK9kmJ1/img_640x640.jpg',12,'주호민',2,0,20,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NDQ2OCwiZXhwIjoxNjY5NTU5MjY4fQ.qtxLHdQc8EDw9MPBPMZNqC9vBwmbgM3Qc3J9QV9sz7uHr3PvwO3lS3osyKyx8X5LPtnqFdKny8ysvPnyLLblyw','2506927136',1,0),(28,'KAKAO',NULL,'http://k.kakaocdn.net/dn/KWCh8/btrQ2fFBt67/kTAkJN5MlioYvkrxI4IOYk/img_640x640.jpg',1,'마늘곰이다',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODU2NjQ4OSwiZXhwIjoxNjY5MTcxMjg5fQ.uCScqWlBujvVs1UJclbEV_aPg_PltKyHAgO0x_KP9xTiCO3M8h4gkCq5F7ArBteaL3-3noRr6UI-q86UpIIn_Q','2527514139',1,1),(29,'KAKAO','kublaihkan','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',2,'하이',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODczMjg1NCwiZXhwIjoxNjY5MzM3NjU0fQ.xcCnplggLkenwBDPqCF9V7jOOfRfcrt69kJGH0TfuU6VFRlKp5dnvhufUWw34BBzllERHgmFzvCrS4diZ61aCA','2530739930',1,0),(30,'KAKAO',NULL,'http://k.kakaocdn.net/dn/baliho/btqNIr309LO/9vOreKq0yul5Egxu2dQKA0/img_640x640.jpg',0,'응애',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODU4NTYyMywiZXhwIjoxNjY5MTkwNDIzfQ.EYHC8u1NcgQTfK5kNuBM2AAVlD8FsdVM7mvz1GXwJLiRG4bOH0_9Uz2VLiHlLJF6MxtZM8SurN1zYJ7syaSE6w','2531701921',1,0),(31,'KAKAO',NULL,'http://k.kakaocdn.net/dn/bBtQ7Q/btrQYGEeVt8/2HeTpKHh9rqrzpiHdeODwK/img_640x640.jpg',0,'하민',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODg3MDQ5NSwiZXhwIjoxNjY5NDc1Mjk1fQ.vf84eD0ABItctuJFBCG6Q61JaVmYVY9W6x0JzVx8p2bYnB2XYhl-pcrzsLJJfR32aKJVoQfbvVGNyv8ZtnujYg','2537133932',1,0),(32,'KAKAO',NULL,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',0,'제학',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkzMzAzOSwiZXhwIjoxNjY5NTM3ODM5fQ.eLhEPculJABqmqhN73_vogsYwwDgwT6cV5T1x8DZowvAq6F-9NHfK-YSLpt7oO-mVuv3mtkAl3Bsqap1_VEqsA','2537973589',1,0),(37,'KAKAO',NULL,'http://k.kakaocdn.net/dn/b4ruTX/btrPQNX19kR/MzOhlSYd1DTWIIziGneiY0/img_640x640.jpg',0,'fdfd',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODY4MzQwOCwiZXhwIjoxNjY5Mjg4MjA4fQ.XNOd93hMUZu9eAQ-eY3zWO3bBDGdpqVxCQ6ifeNr7istm6U2q2wFbJNbFhFoHrJY-G9GtBW0BCoWqr1h5Xx5XA','2538534096',1,0),(38,'NAVER',NULL,NULL,0,'연의',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkyOTYwMywiZXhwIjoxNjY5NTM0NDAzfQ.Rk1Sf54HbOtrcagHBpbFGMkN3l6mFuIvwGNjBghmb6RUvilXiEuvxOzRw3L-b3xb6kA3tGwRdAPIjqWnFAD9pQ','5EEGVahjdKhJVY4gUQy52uffL91DPcBMZPe2xcRxaiQ',1,0),(39,'KAKAO',NULL,'http://k.kakaocdn.net/dn/pYec5/btrPfPbCS1v/oVDciDYAPhDkFfMRaovPG0/img_640x640.jpg',3,'솔솔',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NzA4OSwiZXhwIjoxNjY5NTYxODg5fQ.qIA18ykiiPl4wuUFxcUOhP9e0wqci27GnHCkmXjWo958Cj4MAic-mmzJz_N4IzSx2ZM3VVFbtqxh0POaVOaElw','2539388062',1,0),(41,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu0Jnsa9DZME7cAKZBFeQ1naCJ9JBDyT7T3CSUwO=s96-c',0,'',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODc3Mjc0OSwiZXhwIjoxNjY5Mzc3NTQ5fQ.EU-kBMyKvd-EiDSLrkIrr6nzSGer7xqEBSOe0gjGJGDeAFWVaWGV5K_UfYxayqzQcQqZAgoXyWNzC79kEmd5NA','101197295732108570679',1,0),(42,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu0U0sf_ykkk4OM_G3QhVpiEvnD9EzY71g7vdf8W=s96-c',4,'gana',1,0,23,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1MDk5OCwiZXhwIjoxNjY5NTU1Nzk4fQ.BjFgqkimLZhPhjeUg611Wj9gc2kti8AG1M-_SED17xcT4Y9qw7AxQaQkkm1O5tzW5dGOc1aazpajQybDwv3mBQ','109072991197404395997',1,0),(46,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu3r8vyl0K083G8Jb9cRu8we3yoS7Srg1Lvlw4Gs=s96-c',4,'ant',1,0,10,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NDA3MywiZXhwIjoxNjY5NTU4ODczfQ.yp6wu59_O63x718KjPW9muRqGnZLJhHhgX2e8ySWVrWgE8TXXTj3DYkLXMPaXfdE1aA32hnmuMZ2C2l4T29mUg','113709537965887678888',1,0),(48,'KAKAO',NULL,'http://k.kakaocdn.net/dn/1JXjb/btrIPVU9moL/ocFOGGNBg77qBl0K3XzsW0/img_640x640.jpg',4,'해군하민',1,0,23,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODg3MDU0OSwiZXhwIjoxNjY5NDc1MzQ5fQ.Pc082KZRvyqKXYi7oOB37njS-exnANAFO_otOLdWNQiGdaVQu9MB5l4-i1vyNUBPdsdlT0G_SrfrWrrya9_7Zw','2541526526',1,0),(51,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu3mS4gdAFkLQehe8gDreEQ6KPQVZWfFaaGjvyci=s96-c',0,'zzzz',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk0NzcyNCwiZXhwIjoxNjY5NTUyNTI0fQ.TqCHjVDIe1VjBUVN7lgsum1h_h5ZpEIDsU1Do1PRAipzujG-oHlY8RirTCbNbSkAuIm5GY7w3xEwBYZLTcdjag','112111560382523399401',1,0),(61,'NAVER',NULL,NULL,0,'aa',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODg3Njk3MiwiZXhwIjoxNjY5NDgxNzcyfQ.r2X2wIDQPXp8HOWFpVSy0hYgqsquwBkMLYvCUoLsQS7g74-uuR-9jkbyCufzuN0wJHnZqkFZUjmee_YSIoaBPg','-YsvD0H0lWBKlPHgKJ6FJLFlyrSs-SV1N7x0sgeDfHI',1,0),(66,'GOOGLE','dksktpq852','https://lh3.googleusercontent.com/a/ALm5wu0b5sg8_14-UTlOcZTz9BxrhU70m5OnCuA-glJO=s96-c',0,'구글민형',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkyNTgzOCwiZXhwIjoxNjY5NTMwNjM4fQ.5qvP2OeJHR5BCgKO6Ba3RjKLUWeWpfWfP3qnIEonBOW8hho5dDUfpz6gCiaOV0l5DReknn0gt5w75_p_R5giBQ','111877324246181885233',1,0),(81,'KAKAO','peapel','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',0,'제이팍',1,0,12,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NDA0NiwiZXhwIjoxNjY5NTU4ODQ2fQ.NfAgLEDTKT_nEPx7xw1iPG8aPyp1GqADMwqEvwW83MjB5FeEAMlDuE8th3IRmT9ulTtw4pzl3q0zXrIEfpEW6Q','2505437517',1,0),(82,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu3E_ceDILZner8SIEE8Ah3DStpTnykqfiscO1MgQg=s96-c',0,'구글민용',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkyNTg0NiwiZXhwIjoxNjY5NTMwNjQ2fQ.WyWsePFHWzUrwN6Pm37FDzIrCYwNlu0_xZrBasTkbKC98wnVaZ_pKbDyHLN2rH2wNr6O55v7pJwYIrwHoRYMXw','105306113042544210481',1,0),(83,'KAKAO',NULL,'http://k.kakaocdn.net/dn/5MjUs/btrLLzJ653F/n9AFM53hay1IceSute8AIK/img_640x640.jpg',2,'서봄',1,0,22,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NzgyMCwiZXhwIjoxNjY5NTYyNjIwfQ.R5YPkO0VpB2_hR9qPcZviNkXKvKObd_hb6eEz52dBcsRXxZX0-hqKvgVfAnUUesnVkLXv7UjHf6FND6DdR7L9Q','2542336866',1,0),(84,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu1VeYPOdQtUPGJlcSFMT1uB_5pVHkLsvvc4tofJ=s96-c',0,'asdfasdf',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkzMzU5NSwiZXhwIjoxNjY5NTM4Mzk1fQ.KkchvYzBi7RVdcolM-QrYBRGxqztXq4xH9D3O6WMiyAMx6Tof05SEHD2Kfphhp-0l_0dNf6JTTFq6fUnnwmVlQ','104125537983443959238',1,0),(85,'GITHUB',NULL,'https://avatars.githubusercontent.com/u/88833439?v=4',0,'수진짱vV',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODkzNDMzNCwiZXhwIjoxNjY5NTM5MTM0fQ.Jb003TR620VbyE6twshqyDUldzXFlkHrZmHsG_zgFcOA1VdjVwVkx6I8zc-tzDYYuUFlfvzC-uPZYGWYi_UTFQ','88833439',1,0),(86,'GOOGLE',NULL,'https://lh3.googleusercontent.com/a/ALm5wu0Pnfsf_6OSY3q1MEFALaLU-ph44IHDJTfnAHvK=s96-c',0,'손님1',1,0,0,'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZWJyYWlucyIsImlhdCI6MTY2ODk1NzgzNiwiZXhwIjoxNjY5NTYyNjM2fQ.sikV4pbsxCrE_qrWRwDmUistnCAHHJl_hPqwfMTWzoua2lNeKcRDHcbBWDxPWlMgw2LZcD0rS-AXWPt_TpzGNA','109069609844517521000',1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_character`
--

DROP TABLE IF EXISTS `user_character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_character` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `character_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqif86qwg97ofk8fmqjqeriuux` (`character_id`),
  KEY `FKj1uovjddfp7t5yy5i0uk6pn7s` (`user_id`),
  CONSTRAINT `FKj1uovjddfp7t5yy5i0uk6pn7s` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKqif86qwg97ofk8fmqjqeriuux` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=392 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_character`
--

LOCK TABLES `user_character` WRITE;
/*!40000 ALTER TABLE `user_character` DISABLE KEYS */;
INSERT INTO `user_character` VALUES (173,24,27),(174,23,27),(175,22,27),(176,23,3),(177,22,3),(178,21,3),(179,19,3),(180,20,3),(181,18,3),(182,17,3),(183,16,3),(184,15,3),(185,14,3),(186,13,3),(187,12,3),(188,24,7),(189,23,7),(190,22,7),(191,9,27),(192,8,27),(193,8,3),(195,8,7),(197,9,7),(198,21,27),(199,20,27),(200,19,27),(207,0,41),(208,16,41),(209,13,41),(210,12,41),(218,23,10),(219,22,10),(220,0,10),(221,1,10),(222,2,10),(223,4,10),(225,10,27),(227,24,4),(228,23,4),(229,22,4),(230,0,4),(231,1,4),(232,6,10),(237,0,42),(241,0,46),(242,21,4),(243,20,4),(244,19,4),(245,0,7),(246,1,7),(247,2,7),(248,4,7),(250,6,7),(251,21,7),(252,20,7),(253,19,7),(255,22,39),(256,22,42),(257,23,42),(258,0,48),(259,7,7),(260,22,48),(261,23,48),(286,0,61),(293,16,10),(294,13,10),(295,12,10),(296,7,10),(303,0,66),(304,0,51),(319,0,81),(320,22,46),(321,23,46),(322,16,81),(323,13,81),(324,12,81),(325,14,81),(326,17,81),(327,15,81),(328,18,81),(329,0,82),(330,9,51),(331,8,51),(332,8,23),(333,8,4),(334,8,46),(335,8,82),(336,8,81),(337,9,46),(338,8,66),(341,11,9),(342,10,9),(343,9,9),(344,8,9),(345,9,3),(346,9,10),(347,8,10),(348,10,46),(349,9,82),(350,9,81),(351,9,4),(352,2,4),(353,0,23),(354,21,23),(355,20,23),(356,19,23),(357,16,46),(358,12,46),(359,22,23),(360,23,23),(361,0,83),(362,22,83),(363,0,84),(364,0,85),(365,16,51),(366,12,51),(367,10,3),(368,0,27),(369,1,27),(370,2,27),(371,4,27),(372,17,46),(373,13,46),(374,10,10),(375,0,86),(376,17,7),(377,16,7),(378,14,7),(379,13,7),(380,12,7),(381,0,3),(382,1,3),(383,17,4),(384,16,4),(385,14,4),(386,13,4),(387,12,4),(388,18,4),(389,15,4),(390,21,81),(391,19,81);
/*!40000 ALTER TABLE `user_character` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_office`
--

DROP TABLE IF EXISTS `user_office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_office` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `office_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2e4ps4o160rkmqr6q68o49xuq` (`office_id`),
  KEY `FKtbxxp2wykk573xmilb1yu7k2y` (`user_id`),
  CONSTRAINT `FK2e4ps4o160rkmqr6q68o49xuq` FOREIGN KEY (`office_id`) REFERENCES `office` (`id`),
  CONSTRAINT `FKtbxxp2wykk573xmilb1yu7k2y` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_office`
--

LOCK TABLES `user_office` WRITE;
/*!40000 ALTER TABLE `user_office` DISABLE KEYS */;
INSERT INTO `user_office` VALUES (3,1,3),(4,1,4),(6,1,6),(7,1,7),(9,1,9),(10,1,10),(23,1,23),(24,1,24),(25,1,25),(27,1,27),(28,1,28),(29,1,29),(30,1,30),(31,1,31),(52,2,7),(53,3,7),(54,3,7),(55,4,7),(56,4,7),(57,5,7),(58,5,7),(59,6,7),(60,7,7),(61,1,32),(66,1,37),(73,1,38),(74,1,39),(76,2,27),(78,1,41),(82,1,42),(103,1,46),(107,1,48),(114,1,51),(133,1,61),(134,1,61),(141,1,66),(157,1,81),(158,1,82),(159,1,83),(160,1,84),(161,1,85),(162,3,3),(163,2,3),(164,4,3),(165,5,3),(166,6,3),(167,7,3),(168,1,86);
/*!40000 ALTER TABLE `user_office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gaese'
--

--
-- Dumping routines for database 'gaese'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  2:14:35
