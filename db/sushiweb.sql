-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 22, 2015 at 12:08 AM
-- Server version: 5.0.96-community
-- PHP Version: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `delimall_prod`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` varchar(32) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` varchar(1023) NOT NULL,
  `image` varchar(256) NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `description`, `image`, `order`) VALUES
('1', 'Bienvenido New York Roll!!!', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.', '/img/slides/1.jpg', 0),
('2', 'Lorem ipsum sit amet!', 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing eli', '/img/slides/4.jpg', 3),
('3', 'Lorem ipsum sit amet!', 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing eli', '/img/slides/2.jpg', 1),
('4', 'Bienvenido New York Roll!', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.', '/img/slides/3.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) default NULL,
  `image` varchar(255) NOT NULL,
  `order` int(11) default '0',
  `active` tinyint(4) NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `order`, `active`) VALUES
(1, 'Entradas', '/img/icons/products/01.png', 0, 1),
(2, 'Sushi', '/img/icons/products/02.png', 1, 1),
(3, 'Wok', '/img/icons/products/03.png', 2, 1),
(4, 'Ensaladas', '/img/icons/products/04.png', 3, 1),
(5, 'Wraps', '/img/icons/products/05.png', 4, 1),
(6, 'Pies', '/img/icons/products/06.png', 5, 1),
(7, 'Postres y Bebidas', '/img/icons/products/07.png', 6, 1),
(8, 'Take Away', '/img/icons/products/08.png', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `combos`
--

CREATE TABLE IF NOT EXISTS `combos` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL default '/img/combos/00000.png',
  `amount1` int(3) NOT NULL default '1',
  `price1` float NOT NULL default '0',
  `amount2` int(3) default NULL,
  `price2` float default NULL,
  `amount3` int(3) default NULL,
  `price3` float default NULL,
  `amount4` int(3) default NULL,
  `price4` float default NULL,
  `active` tinyint(4) NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `combos`
--

INSERT INTO `combos` (`id`, `name`, `image`, `amount1`, `price1`, `amount2`, `price2`, `amount3`, `price3`, `amount4`, `price4`, `active`) VALUES
(1, 'AMAZONAS', '/img/combos/00001.png', 24, 151, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(2, 'MISSISIPI', '/img/combos/00002.png', 12, 150, 24, 300, 35, 450, 48, 600, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL auto_increment,
  `email` varchar(255) NOT NULL default '',
  `password` varchar(255) NOT NULL default '',
  `isAdmin` tinyint(1) NOT NULL default '0',
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`, `isAdmin`, `address`, `phone`, `comments`, `firstName`, `lastName`, `active`) VALUES
(1, 'a@a.aa', '123', 1, 'asdqwe', '0341', '', 'David', 'Curras', 1),
(2, 'felisa@delimall.com.ar', 'melero', 0, 'Otra calle 456', '011 1234567890', '', 'Felisa', 'Savio', 1),
(3, 'felisavio@gmail.com', 'melero', 1, 'jose ingenieros 8469', '4515924', '', 'felisa', 'savio', 1),
(4, 'pablo@delimall.com.ar', 'pabloadmin', 1, 'moreno 75 bis', '112222367', '', 'Pablo', 'Avalle', 1),
(5, 'info@felisasavio.com.ar', 'melero', 0, 'jose ingenieros', '156024668', '', 'Felisa', 'savio', 1);

-- --------------------------------------------------------

--
-- Table structure for table `general`
--

CREATE TABLE IF NOT EXISTS `general` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(256) NOT NULL,
  `value` varchar(256) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `general`
--

INSERT INTO `general` (`id`, `name`, `value`) VALUES
(1, 'funesAmTimeFrom', '11:30'),
(2, 'funesAmTimeTo', '14:00'),
(3, 'funesPmTimeFrom', '20:00'),
(4, 'funesPmTimeTo', '23:00'),
(5, 'rosarioAmTimeFrom', '10:30'),
(6, 'rosarioAmTimeTo', '14:00'),
(7, 'rosarioPmTimeFrom', '19:00'),
(8, 'rosarioPmTimeTo', '23:00'),
(9, 'funesOpen', '1'),
(10, 'rosarioOpen', '1'),
(11, 'deliveryPrice', '0.00'),
(12, 'minOrderPrice', '20.00'),
(13, 'showPromo', '0');

-- --------------------------------------------------------

--
-- Table structure for table `order-item`
--

CREATE TABLE IF NOT EXISTS `order-item` (
  `id` int(11) NOT NULL auto_increment,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `order-item`
--

INSERT INTO `order-item` (`id`, `orderId`, `productId`, `amount`) VALUES
(1, 1, 1, 2),
(2, 2, 1, 4),
(3, 2, 2, 2),
(4, 3, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL auto_increment,
  `userId` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `dateFrom` varchar(32) NOT NULL,
  `timeFrom` varchar(32) NOT NULL,
  `dateTo` varchar(32) NOT NULL,
  `timeTo` varchar(32) NOT NULL,
  `paid` tinyint(1) NOT NULL default '0',
  `deliver` tinyint(1) NOT NULL default '0',
  `src` varchar(256) NOT NULL,
  `active` tinyint(1) NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `name`, `phone`, `address`, `date`, `dateFrom`, `timeFrom`, `dateTo`, `timeTo`, `paid`, `deliver`, `src`, `active`) VALUES
(1, 1, 'David Curras', '0341', 'asdqwe', '2015-04-12 20:43:38', '2015-04-12', '20:00', '2015-04-12', '20:30', 0, 1, 'orders/2015-04-12-17-43-1428871418.txt', 1),
(2, 1, 'David Curras', '0341', 'asdqwe', '2015-04-12 20:49:56', '2015-04-12', '22:00', '2015-04-12', '22:30', 0, 1, 'orders/2015-04-12-17-49-1428871796.txt', 1),
(3, 5, 'Felisa savio', '156024668', 'jose ingenieros', '2015-04-20 13:44:10', '2015-04-20', '10:30', '2015-04-20', '11:00', 0, 1, 'orders/2015-04-20-10-44-1429537450.txt', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL auto_increment,
  `categoryId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `plu` smallint(6) NOT NULL,
  `image` varchar(255) NOT NULL default '/img/products/00001.png',
  `amount` int(3) NOT NULL default '1',
  `price` float NOT NULL default '0',
  `active` tinyint(4) NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categoryId`, `name`, `plu`, `image`, `amount`, `price`, `active`) VALUES
(1, 1, 'asd', 123, '/img/products/00001.png', 1, 40.5, 1),
(2, 2, 'qwe', 234, '/img/products/00002.png', 1, 30, 1),
(3, 2, 'CHEDDAR MINI ROLL', 0, '/img/products/00003.png', 1, 30, 1),
(4, 2, 'SALMON AHUMADO', 0, '/img/products/00004.png', 1, 40, 1),
(5, 2, 'NEW YORK ROLL', 0, '/img/products/00005.png', 1, 40, 1),
(6, 2, 'CALIFORNIA ROLL', 0, '/img/products/00006.png', 1, 40, 1),
(7, 2, 'CAPRESSE', 0, '/img/products/00007.png', 1, 60, 1),
(8, 1, 'ARROLLADITOS PRIMAVERA', 0, '/img/products/00008.png', 1, 40, 1),
(9, 1, 'BASTONCITOS MARINOS', 0, '/img/products/00009.png', 6, 200, 1),
(10, 1, 'LAGOSTINOS CROCANTES', 0, '/img/products/00010.png', 4, 200, 1),
(11, 1, 'SALMON BOOM', 0, '/img/products/00011.png', 10, 200, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
