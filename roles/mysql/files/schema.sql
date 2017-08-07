# noinspection SqlNoDataSourceInspectionForFile

USE `iacdb`;

DROP TABLE IF EXISTS `tbl_iacdb`;

CREATE TABLE `tbl_iacdb` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(128) NOT NULL COMMENT 'Host index',
  `visited` int(10) unsigned NOT NULL COMMENT 'Number of times host has been visited',
  `message` varchar(128) NOT NULL COMMENT 'Host message',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;