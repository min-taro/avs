-- MariaDB dump 10.19-11.4.2-MariaDB, for osx10.19 (arm64)
--
-- Host: localhost    Database: user_db
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` tinyint(1) DEFAULT NULL,
  `content` tinyint(1) DEFAULT NULL,
  `date` tinyint(1) DEFAULT NULL,
  `updateDate` tinyint(1) DEFAULT NULL,
  `llm` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES
(1,1,1,1,1,'Phi-3');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_infos`
--

DROP TABLE IF EXISTS `volunteer_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volunteer_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `updateDate` varchar(255) DEFAULT NULL,
  `provider` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `sdgs` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_infos`
--

LOCK TABLES `volunteer_infos` WRITE;
/*!40000 ALTER TABLE `volunteer_infos` DISABLE KEYS */;
INSERT INTO `volunteer_infos` VALUES
(2,'uid1234abcd5678','【毎週日曜日】太陽観察会のボランティア','2024-03-31',NULL,'浜松市天文台','「あの星が〇〇だよ」とやってみたくありませんか？（星座や天体の案内、双眼鏡や望遠鏡の操作）','sdgs/sdg_icon_1.png,sdgs/sdg_icon_2.png','https://placehold.jp/3d4070/ffffff/150x150.png?text=%E3%81%93%E3%81%93%E3%81%AB%E6%A1%88%E4%BB%B6%E7%94%BB%E5%83%8F%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99'),
(3,'uid2345bcde6789','高齢者施設でのお手伝いボランティア','2024-04-01',NULL,'ボランティアセンター','介護老人保健施設で、入所者の方々との話し相手、入浴後のドライヤーかけやお茶出しのお手伝い。','sdgs/sdg_icon_3.png','https://placehold.jp/3d4070/ffffff/150x150.png?text=%E3%81%93%E3%81%93%E3%81%AB%E6%A1%88%E4%BB%B6%E7%94%BB%E5%83%8F%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99'),
(4,'uid3456cdef7890','【６／９（日）】第２回はままつレインボープライド ボランティアスタッフ大募集','2024-04-10',NULL,'はまこら（浜松市市民協働センター）','一緒にはままつレインボープライドを盛り上げてくれるボランティアを募集しています','sdgs/sdg_icon_4.png,sdgs/sdg_icon_5.png,sdgs/sdg_icon_6.png,sdgs/sdg_icon_9.png','https://placehold.jp/3d4070/ffffff/150x150.png?text=%E3%81%93%E3%81%93%E3%81%AB%E6%A1%88%E4%BB%B6%E7%94%BB%E5%83%8F%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99'),
(5,'uid4567defg8901','検索結果に反映されるイベント','2024-04-20',NULL,'AVS運営','概要の文中にある「やさしい」というキーワードで検索結果に表示されることを期待しています。','sdgs/sdg_icon_11.png,sdgs/sdg_icon_12.png','https://placehold.jp/3d4070/ffffff/150x150.png?text=%E3%81%93%E3%81%93%E3%81%AB%E6%A1%88%E4%BB%B6%E7%94%BB%E5%83%8F%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99');
/*!40000 ALTER TABLE `volunteer_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_infos`
--

DROP TABLE IF EXISTS `news_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `updateDate` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_infos`
--

LOCK TABLES `news_infos` WRITE;
/*!40000 ALTER TABLE `news_infos` DISABLE KEYS */;
INSERT INTO `news_infos` VALUES
(1,'メンテナンスのお知らせ','2024/2/2 06:00:00','','システムメンテナンスのため、下記の時間はAVSを使用できません。2024/3/2 00:00 - 2024/3/2 04:00 ご不明な点はお問い合わせまでご連絡ください。'),
(2,'AVS リニューアル','2024/2/2 06:00:00','','AVSが新しく生まれ変わりました。人にやさしいシステムとして、チャットベースで利用可能となりました。');
/*!40000 ALTER TABLE `news_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'admin','2b$12$t27icsx0jmD3oATKQcXh9.3Ye/4eWzu4.rOA.eF6','admin@example.com','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-06-30  6:45:38
