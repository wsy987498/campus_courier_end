/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50529
Source Host           : localhost:3306
Source Database       : campus_courier_sql

Target Server Type    : MYSQL
Target Server Version : 50529
File Encoding         : 65001

Date: 2021-04-06 00:19:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `express_list`
-- ----------------------------
DROP TABLE IF EXISTS `express_list`;
CREATE TABLE `express_list` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `express_name` char(11) NOT NULL,
  `express_money` int(11) NOT NULL,
  `delivery_address` char(200) NOT NULL,
  `forward_delivery_time` datetime NOT NULL,
  `express_type` char(11) NOT NULL,
  `pick_code` char(11) NOT NULL,
  `express_recipients` char(11) NOT NULL,
  `express_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` char(11) NOT NULL,
  `remarks` char(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `istakeit` char(5) NOT NULL,
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of express_list
-- ----------------------------

-- ----------------------------
-- Table structure for `havetotake_list`
-- ----------------------------
DROP TABLE IF EXISTS `havetotake_list`;
CREATE TABLE `havetotake_list` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `express_name` char(11) NOT NULL,
  `express_money` int(11) NOT NULL,
  `delivery_address` char(200) NOT NULL,
  `forward_delivery_time` datetime NOT NULL,
  `express_type` char(11) NOT NULL,
  `pick_code` char(11) NOT NULL,
  `express_recipients` char(11) NOT NULL,
  `express_id` int(11) NOT NULL,
  `phone` char(11) NOT NULL,
  `remarks` char(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `istakeit` char(5) NOT NULL,
  `qujianren` char(15) NOT NULL,
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of havetotake_list
-- ----------------------------

-- ----------------------------
-- Table structure for `isfinished_list`
-- ----------------------------
DROP TABLE IF EXISTS `isfinished_list`;
CREATE TABLE `isfinished_list` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `express_name` char(11) NOT NULL,
  `express_money` int(11) NOT NULL,
  `delivery_address` char(200) NOT NULL,
  `forward_delivery_time` datetime NOT NULL,
  `express_type` char(11) NOT NULL,
  `pick_code` char(11) NOT NULL,
  `express_recipients` char(11) NOT NULL,
  `express_id` int(11) NOT NULL,
  `phone` char(11) NOT NULL,
  `remarks` char(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `istakeit` char(5) NOT NULL,
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of isfinished_list
-- ----------------------------

-- ----------------------------
-- Table structure for `isreceiving_list`
-- ----------------------------
DROP TABLE IF EXISTS `isreceiving_list`;
CREATE TABLE `isreceiving_list` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `express_name` char(11) NOT NULL,
  `express_money` int(11) NOT NULL,
  `delivery_address` char(200) NOT NULL,
  `forward_delivery_time` datetime NOT NULL,
  `express_type` char(11) NOT NULL,
  `pick_code` char(11) NOT NULL,
  `express_recipients` char(11) NOT NULL,
  `express_id` int(11) NOT NULL,
  `phone` char(11) NOT NULL,
  `remarks` char(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `istakeit` char(5) NOT NULL,
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of isreceiving_list
-- ----------------------------

-- ----------------------------
-- Table structure for `out_of_delivery`
-- ----------------------------
DROP TABLE IF EXISTS `out_of_delivery`;
CREATE TABLE `out_of_delivery` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `express_name` char(11) NOT NULL,
  `express_money` int(11) NOT NULL,
  `delivery_address` char(200) NOT NULL,
  `forward_delivery_time` datetime NOT NULL,
  `express_type` char(11) NOT NULL,
  `pick_code` char(11) NOT NULL,
  `express_recipients` char(11) NOT NULL,
  `express_id` int(11) NOT NULL,
  `phone` char(11) NOT NULL,
  `remarks` char(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `istakeit` char(5) NOT NULL,
  `qujianren` char(15) NOT NULL,
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of out_of_delivery
-- ----------------------------

-- ----------------------------
-- Table structure for `users_list`
-- ----------------------------
DROP TABLE IF EXISTS `users_list`;
CREATE TABLE `users_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `avator` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_list
-- ----------------------------
INSERT INTO `users_list` VALUES ('1', '伍思宇', '123', '');
INSERT INTO `users_list` VALUES ('2', '李青达', '123', '');
INSERT INTO `users_list` VALUES ('18', 'wusiyu1', '1231', '');
