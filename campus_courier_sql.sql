/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50529
Source Host           : localhost:3306
Source Database       : campus_courier_sql

Target Server Type    : MYSQL
Target Server Version : 50529
File Encoding         : 65001

Date: 2021-05-06 20:46:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_users_list`
-- ----------------------------
DROP TABLE IF EXISTS `admin_users_list`;
CREATE TABLE `admin_users_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(15) NOT NULL COMMENT '用户名',
  `password` varchar(15) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_users_list
-- ----------------------------
INSERT INTO `admin_users_list` VALUES ('1', 'admin', '123');
INSERT INTO `admin_users_list` VALUES ('19', 'wsy', '123');

-- ----------------------------
-- Table structure for `express_list`
-- ----------------------------
DROP TABLE IF EXISTS `express_list`;
CREATE TABLE `express_list` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `express_name` char(11) NOT NULL COMMENT '快递公司类型',
  `express_money` int(11) NOT NULL COMMENT '赏金',
  `delivery_address` char(50) NOT NULL COMMENT '取件地址',
  `forward_delivery_time` datetime NOT NULL COMMENT '期望配送时间',
  `express_type` char(11) NOT NULL COMMENT '快递类型',
  `pick_code` char(11) NOT NULL COMMENT '取件码',
  `express_recipients` char(11) NOT NULL COMMENT '收件人',
  `express_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '快递id',
  `phone` char(11) NOT NULL COMMENT '电话号码',
  `remarks` char(50) DEFAULT NULL COMMENT '留言备注',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `istakeit` char(5) NOT NULL COMMENT '是否已取件',
  PRIMARY KEY (`express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of express_list
-- ----------------------------

-- ----------------------------
-- Table structure for `havetotake_list`
-- ----------------------------
DROP TABLE IF EXISTS `havetotake_list`;
CREATE TABLE `havetotake_list` (
  `istake_create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '快递派送时间',
  `istake_express_name` char(11) NOT NULL COMMENT '快递公司类型',
  `istake_express_money` int(11) NOT NULL COMMENT '赏金',
  `istake_delivery_address` char(50) NOT NULL COMMENT '取件地址',
  `istake_forward_delivery_time` datetime NOT NULL COMMENT '期望配送时间',
  `istake_express_type` char(11) NOT NULL COMMENT '快递类型',
  `istake_pick_code` char(11) NOT NULL COMMENT '取件码',
  `istake_express_recipients` char(11) NOT NULL COMMENT '收件人',
  `istake_express_id` int(11) NOT NULL COMMENT '快递id',
  `istake_phone` char(11) NOT NULL COMMENT '手机号码',
  `istake_remarks` char(50) DEFAULT NULL COMMENT '备注留言',
  `istake_user_id` int(11) NOT NULL COMMENT '用户id',
  `istake_istakeit` char(5) NOT NULL COMMENT '是否已取件',
  `istake_qujianren` char(15) NOT NULL COMMENT '取件人',
  PRIMARY KEY (`istake_express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of havetotake_list
-- ----------------------------

-- ----------------------------
-- Table structure for `isfinished_list`
-- ----------------------------
DROP TABLE IF EXISTS `isfinished_list`;
CREATE TABLE `isfinished_list` (
  `isfi_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '配送完成时间',
  `isfi_express_name` char(11) NOT NULL COMMENT '快递公司名称',
  `isfi_express_money` int(11) NOT NULL COMMENT '赏金',
  `isfi_delivery_address` char(50) NOT NULL COMMENT '取件地址',
  `isfi_forward_delivery_time` datetime NOT NULL COMMENT '期望配送时间',
  `isfi_express_type` char(11) NOT NULL COMMENT '快递包裹类型',
  `isfi_pick_code` char(11) NOT NULL COMMENT '取件码',
  `isfi_express_recipients` char(11) NOT NULL COMMENT '收件人',
  `isfi_express_id` int(11) NOT NULL COMMENT '快递id',
  `isfi_phone` char(11) NOT NULL COMMENT '手机号码',
  `isfi_remarks` char(50) DEFAULT NULL COMMENT '留言备注',
  `isfi_user_id` int(11) NOT NULL COMMENT '用户id',
  `isfi_istakeit` char(5) NOT NULL COMMENT '是否已取件',
  PRIMARY KEY (`isfi_express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of isfinished_list
-- ----------------------------

-- ----------------------------
-- Table structure for `isreceiving_list`
-- ----------------------------
DROP TABLE IF EXISTS `isreceiving_list`;
CREATE TABLE `isreceiving_list` (
  `isrec_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '取件时间',
  `isrec_express_name` char(11) NOT NULL COMMENT '快递公司名称',
  `isrec_express_money` int(11) NOT NULL COMMENT '赏金',
  `isrec_delivery_address` char(50) NOT NULL COMMENT '取件地址',
  `isrec_forward_delivery_time` datetime NOT NULL COMMENT '期望配送时间',
  `isrec_express_type` char(11) NOT NULL COMMENT '快递包裹类型',
  `isrec_pick_code` char(11) NOT NULL COMMENT '取件码',
  `isrec_express_recipients` char(11) NOT NULL COMMENT '收件人',
  `isrec_express_id` int(11) NOT NULL COMMENT '快递id',
  `isrec_phone` char(11) NOT NULL COMMENT '手机号码',
  `isrec_remarks` char(50) DEFAULT NULL COMMENT '留言备注',
  `isrec_user_id` int(11) NOT NULL COMMENT '用户id',
  `isrec_istakeit` char(5) NOT NULL COMMENT '是否已取件',
  PRIMARY KEY (`isrec_express_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of isreceiving_list
-- ----------------------------

-- ----------------------------
-- Table structure for `out_of_delivery`
-- ----------------------------
DROP TABLE IF EXISTS `out_of_delivery`;
CREATE TABLE `out_of_delivery` (
  `outof_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `outof_express_name` char(11) NOT NULL COMMENT '快递公司类型',
  `outof_express_money` int(11) NOT NULL COMMENT '赏金',
  `outof_delivery_address` char(50) NOT NULL COMMENT '取件地址',
  `outof_forward_delivery_time` datetime NOT NULL COMMENT '期望配送时间',
  `outof_express_type` char(11) NOT NULL COMMENT '快递包裹类型',
  `outof_pick_code` char(11) NOT NULL COMMENT '取件码',
  `outof_express_recipients` char(11) NOT NULL COMMENT '收件人',
  `outof_express_id` int(11) NOT NULL COMMENT '快递id',
  `outof_phone` char(11) NOT NULL COMMENT '手机号码',
  `outof_remarks` char(50) DEFAULT NULL COMMENT '备注留言',
  `outof_user_id` int(11) NOT NULL COMMENT '用户id',
  `outof_istakeit` char(5) NOT NULL COMMENT '是否已取件',
  `outof_qujianren` char(15) NOT NULL COMMENT '取件人',
  PRIMARY KEY (`outof_express_id`,`outof_create_time`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of out_of_delivery
-- ----------------------------

-- ----------------------------
-- Table structure for `users_list`
-- ----------------------------
DROP TABLE IF EXISTS `users_list`;
CREATE TABLE `users_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(15) NOT NULL COMMENT '用户名',
  `password` varchar(15) NOT NULL COMMENT '密码',
  `avator` varchar(50) NOT NULL COMMENT '头像',
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_list
-- ----------------------------
INSERT INTO `users_list` VALUES ('1', '伍思宇', '123', '');
INSERT INTO `users_list` VALUES ('2', '李青达', '123', '');
INSERT INTO `users_list` VALUES ('19', '谢军', '123456', '');
