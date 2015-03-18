-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2015 at 06:10 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sushiweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `description` text,
  `order` int(11) DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `description`, `order`, `active`) VALUES
(1, 'Entradas', '/img/icons/products/01.png', NULL, 0, 1),
(2, 'Sushi', '/img/icons/products/02.png', NULL, 1, 1),
(3, 'Wok', '/img/icons/products/03.png', NULL, 2, 1),
(4, 'Ensaladas', '/img/icons/products/04.png', NULL, 3, 1),
(5, 'Wraps', '/img/icons/products/05.png', NULL, 4, 1),
(6, 'Pies', '/img/icons/products/06.png', NULL, 5, 1),
(7, 'Postres y Bebidas', '/img/icons/products/07.png', NULL, 6, 1),
(8, 'Take Away', '/img/icons/products/08.png', NULL, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `combos`
--

CREATE TABLE IF NOT EXISTS `combos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1023) DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT '/img/combos/00001.png',
  `amount1` int(3) NOT NULL DEFAULT '1',
  `price1` float NOT NULL DEFAULT '0',
  `amount2` int(3) DEFAULT NULL,
  `price2` float DEFAULT NULL,
  `amount3` int(3) DEFAULT NULL,
  `price3` float DEFAULT NULL,
  `amount4` int(3) DEFAULT NULL,
  `price4` float DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `combos`
--

INSERT INTO `combos` (`id`, `name`, `description`, `image`, `amount1`, `price1`, `amount2`, `price2`, `amount3`, `price3`, `amount4`, `price4`, `active`) VALUES
(1, 'AMAZONAS', 'Shitake Roll, Golden, Shi Roll, California Roll, Tei Salmón, Azteka Roll.', '/img/combos/00001.png', 24, 151, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(2, 'TAMESIS', 'Humo Roll, Dragon Roll, Capresse, Sunny Roll, Chicken, Veggie, Sashimi de Tamago', '/img/combos/00001.png', 36, 225, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, 'HOME SPECCIALS', 'Tuna Roll, SH Roll, Philadelphia Roll, Humo Maki, Maki de Salmón, Futomaki vegetariano', '/img/combos/00001.png', 12, 45, 24, 89, 36, 130, NULL, NULL, 1),
(4, 'VOLGA', 'Philadelphia Roll, New York Roll, Maki Salmón, Maki Philadelphia, Niguiris de Salmón, Sashimi de Salmón', '/img/combos/00001.png', 12, 89, 24, 174, NULL, NULL, NULL, NULL, 1),
(5, 'Home Salmón', 'Philadelphia Roll New York Roll Maki Salmón Maki Philadelphia Niguiris de Salmón Sashimi de Salmón', '/img/combos/00001.png', 12, 84, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  FULLTEXT KEY `apellido_cli` (`lastName`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`, `isAdmin`, `address`, `phone`, `comments`, `firstName`, `lastName`, `active`) VALUES
(1, 'a@a.aa', '123', 1, 'asdqwe', '0341', '', 'David', 'Curras', 1),
(2, 'b@b.bb', '123', 0, 'qwedgh', '011', '', 'Ricardo', 'Lopez', 1);

-- --------------------------------------------------------

--
-- Table structure for table `general`
--

CREATE TABLE IF NOT EXISTS `general` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `value` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `general`
--

INSERT INTO `general` (`id`, `name`, `value`) VALUES
(1, 'funesAmTimeFrom', '10:30'),
(2, 'funesAmTimeTo', '14:00'),
(3, 'funesPmTimeFrom', '20:00'),
(4, 'funesPmTimeTo', '23:00'),
(5, 'rosarioAmTimeFrom', '10:30'),
(6, 'rosarioAmTimeTo', '14:00'),
(7, 'rosarioPmTimeFrom', '20:00'),
(8, 'rosarioPmTimeTo', '23:00'),
(9, 'open', '1'),
(10, 'minOrderPrice', '17.00'),
(11, 'deliveryPrice', '16.00'),
(12, 'promo', '0');

-- --------------------------------------------------------

--
-- Table structure for table `order-item`
--

CREATE TABLE IF NOT EXISTS `order-item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateFrom` varchar(32) NOT NULL,
  `timeFrom` varchar(32) NOT NULL,
  `dateTo` varchar(32) NOT NULL,
  `timeTo` varchar(32) NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `deliver` tinyint(1) NOT NULL DEFAULT '0',
  `src` varchar(256) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `plu` smallint(6) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT '/img/products/00001.png',
  `amount` int(3) NOT NULL DEFAULT '1',
  `price` float NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
