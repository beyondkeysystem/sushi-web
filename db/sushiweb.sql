-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2015 at 03:38 AM
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
  `description` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

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
(10, 'minOrderPrice', '20.00'),
(11, 'deliveryPrice', '6.00');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=155 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categoryId`, `name`, `plu`, `description`, `image`, `amount`, `price`, `active`) VALUES
(2, 3, 'Green Box', 0, 'Vegetales salteados con arroz y salsa teriyaki.', '/img/products/00001.png', 1, 55, 1),
(3, 7, 'Roll de coco y dulce de leche', 0, '', '/img/products/00001.png', 1, 14, 1),
(4, 4, 'Huerta SH', 0, 'Hojas verdes frescas, zanahoria, huevo, cubos de queso, cubos de tomate.', '/img/products/00003.png', 1, 34, 1),
(5, 4, 'Tuna Salad', 0, 'Arroz blanco, atún al natural, pimientos, choclo y arvejas.', '/img/products/00002.png', 1, 32, 1),
(6, 4, 'Fresh', 0, 'Rucula, repollo colorado, hongos frecos, granos de choclo y cubos de tomate.', '/img/products/00001.png', 1, 0.53, 1),
(7, 4, 'Home Caesar', 0, 'Hojas frescas, laminas de pollo, parmesano, crutones y aderezo Caesar.', '/img/products/00001.png', 1, 57, 1),
(8, 4, 'Fancy Salad', 0, 'Zanahoria, brotes de soja, palta, manzana verde, nueces, aderezo cremoso.', '/img/products/00002.png', 1, 30.36, 1),
(9, 4, 'California Salad', 0, 'Hojas verdes frescas, palmitos, chauchas, MINI ROLLS CALIFORNIA, sesamo rubio.', '/img/products/00001.png', 1, 57, 1),
(11, 3, 'Red China Box', 0, 'Fideos de trigo, cebolla colorada, tomate, carne y salsa clasica.', '/img/products/00001.png', 1, 62, 1),
(15, 7, 'Coca Cola 1 litro', 0, 'Gaseosa Coca Cola, envase no retornable.', '/img/products/00001.png', 1, 10, 1),
(16, 7, 'Cerveza Quilmes 355cc.', 0, '', '/img/products/00001.png', 1, 21, 1),
(17, 7, 'Cerveza Quilmes Stout 355cc.', 0, '', '/img/products/00001.png', 1, 15, 1),
(18, 7, 'Cerveza Quilmes Bock 355cc..', 0, 'Cerveza negra.', '/img/products/00001.png', 1, 21, 1),
(19, 7, 'Browni ', 0, 'Delicioso bizcochuelo de chocolate con nueces.', '/img/products/00001.png', 1, 18, 1),
(21, 7, 'Sprite 1 litro.', 0, '', '/img/products/00001.png', 1, 10, 1),
(22, 7, 'Browni chocolate', 0, 'Delicioso bizcochuelo de chocolate con nueces.', '/img/products/00001.png', 1, 18, 1),
(23, 8, 'Salsa de soja.', 0, 'El aderezo especial para todo sushi.', '/img/products/00001.png', 1, 8, 1),
(25, 2, 'Sashimi de Salmon', 0, '', '/img/products/00001.png', 1, 53, 1),
(26, 2, 'Niguiris de Salmón', 0, '', '/img/products/00001.png', 1, 49, 1),
(28, 5, 'California Roll', 0, 'Surimi, palta, pepino, sésamo.', '/img/products/00001.png', 1, 45, 1),
(29, 1, 'Salmín boom ', 0, 'Croquetas fritas de salmín, bechamel y muzzarella', '/img/products/00001.png', 1, 48, 1),
(30, 1, 'Langostinos Crocantes', 0, 'Langostinos Crocantes con salsa BBQ.', '/img/products/00002.png', 1, 49, 1),
(31, 1, 'Empanaditas Primavera', 0, 'De carne y cebolla.', '/img/products/00001.png', 3, 35, 1),
(32, 3, 'Yellow Box', 0, 'Arroz koshikari, vegetales salteados, pollo y salsa crema de curry.', '/img/products/00001.png', 1, 61, 1),
(33, 5, 'New York Roll', 0, 'Salmon fresco, palta, pepino, sésamo', '/img/products/00001.png', 1, 50, 1),
(34, 5, 'Philadelphia Roll', 0, 'Salmón fresco, palta, queso philadelphia, sésamo', '/img/products/00001.png', 1, 58, 1),
(35, 5, 'Sunny California', 0, 'Surimi, hojas verdes, queso philadelphia, sésamo', '/img/products/00001.png', 1, 28, 1),
(36, 5, 'Tuna Roll', 0, 'Atún al natural, tomate, queso philadelphia, cibulete, sésamo', '/img/products/00001.png', 1, 35, 1),
(37, 5, 'Tei Salmon Roll', 0, 'Delicada mousse de salmón cocido, queso y cibulete', '/img/products/00001.png', 1, 51, 1),
(38, 5, 'Hot Home Roll', 0, 'Langostinos crocantes, honey moustard, cobulete, sésamo', '/img/products/00001.png', 8, 67, 1),
(39, 5, 'SH Roll', 0, 'Langostinos, salmón, queso phila, palta, sésamo', '/img/products/00001.png', 1, 59, 1),
(40, 5, 'Maki Philadelphia', 0, 'Salmón fresco, palta, queso phila ', '/img/products/00001.png', 1, 59, 1),
(41, 5, 'Sunny Maki', 0, 'Surimi, hojas verdes, queso phila, sésamo', '/img/products/00001.png', 1, 28, 1),
(42, 5, 'Humo Maki', 0, 'Salmón ahumado, pepino, queso phila', '/img/products/00001.png', 1, 37, 1),
(43, 5, 'Veggie', 0, 'Tomate, zanahoria blanqueda, palmito y palta', '/img/products/00001.png', 1, 50, 1),
(44, 5, 'SH Maki', 0, 'Langostinos, rúcula, queso phila', '/img/products/00001.png', 1, 36, 1),
(45, 2, 'Niguiris de Langostinos', 0, '', '/img/products/00001.png', 1, 64, 1),
(46, 2, 'Niguiris de Tamago', 0, '', '/img/products/00001.png', 1, 36, 1),
(47, 2, 'Sashimi de Langostinos', 0, '', '/img/products/00001.png', 1, 62, 1),
(57, 8, 'Wasabi y Genjibre.', 0, '', '/img/products/00001.png', 1, 13, 1),
(58, 8, 'Salsa Teriyaki', 0, '', '/img/products/00001.png', 1, 8, 1),
(59, 8, 'Sweet Spicy', 0, 'Soja, miel y ajo picante', '/img/products/00001.png', 1, 4, 1),
(60, 8, 'Honey Mustard', 0, 'Soja, mostaza y miel', '/img/products/00001.png', 1, 8, 1),
(61, 8, 'Smoked', 0, 'Soja ahumada y verdeo', '/img/products/00001.png', 1, 8, 1),
(65, 7, 'Cheese Cake', 0, '', '/img/products/00001.png', 1, 16, 1),
(66, 7, 'Cheesecake de Maracuya.', 0, 'Cheesecake de maracuya.', '/img/products/00001.png', 1, 25, 1),
(67, 7, 'Chocotorta ', 0, '', '/img/products/00001.png', 1, 25, 1),
(68, 7, 'Roll de Nutella y nuez', 0, '', '/img/products/00001.png', 1, 14, 1),
(74, 7, 'Coca Cola 1,5 litros.', 0, '', '/img/products/00001.png', 1, 27, 1),
(75, 7, 'Coca Cola Zero 1,5 litros.', 0, '', '/img/products/00001.png', 1, 27, 1),
(76, 7, 'Fanta 1,5 litros.', 0, '', '/img/products/00001.png', 1, 27, 1),
(77, 7, 'Coca Cola Zero 500cc.', 0, '', '/img/products/00001.png', 1, 16, 1),
(78, 7, 'Fanta 500cc.', 0, '', '/img/products/00001.png', 1, 16, 1),
(79, 7, 'Agua Mineral Eco de los Andes SIN GAS', 0, '', '/img/products/00001.png', 1, 16, 1),
(80, 7, 'Agua Mineral Eco de los Andes CON GAS', 0, '', '/img/products/00001.png', 1, 16, 1),
(81, 7, 'H2O Citrus 500 cc', 0, '', '/img/products/00001.png', 1, 16, 1),
(82, 7, 'Cerveza Iguana 1 litro', 0, '', '/img/products/00001.png', 1, 40, 1),
(83, 7, 'Cerveza Quilmes Lieber 500cc. ', 0, '', '/img/products/00001.png', 1, 11, 1),
(84, 7, 'Chocotorta SH', 0, '', '/img/products/00001.png', 1, 16, 1),
(85, 7, 'Patagonia Amber Lager', 0, '', '/img/products/00001.png', 1, 51, 1),
(86, 7, 'Patagonia Bohemian Pilsener', 0, '', '/img/products/00001.png', 1, 51, 1),
(87, 7, 'Patagonia Weisse', 0, '', '/img/products/00001.png', 1, 37, 1),
(90, 7, 'Sprite Zero 1,5 litros.', 0, '', '/img/products/00001.png', 1, 27, 1),
(91, 7, 'Sprite 1,5 litros.', 0, '', '/img/products/00001.png', 1, 27, 1),
(92, 7, 'Fanta Zero 1,5 litros.', 0, '', '/img/products/00001.png', 1, 27, 1),
(93, 2, 'Niguiri de Salmon Ahumado', 0, '', '/img/products/00001.png', 1, 59, 1),
(94, 8, 'Salsa de Soja Sakura 150 cc.', 0, '', '/img/products/00001.png', 1, 23, 1),
(95, 8, 'wasabi pouch', 0, '', '/img/products/00001.png', 1, 8, 1),
(96, 7, 'Brownie DELICIA TENTISS', 0, '', '/img/products/00001.png', 1, 7, 1),
(97, 7, 'Tarta Toffie DELICIA TENTISS', 0, '', '/img/products/00001.png', 1, 7, 1),
(98, 7, 'Tarta de Dulce de Leche y Coco DELICIA TENTISS', 0, '', '/img/products/00001.png', 1, 7, 1),
(99, 3, 'Blue Box', 0, 'Arroz koshikari, champignones, pescado blanco, camarones y salsa de ostras.', '/img/products/00001.png', 1, 75, 1),
(106, 8, 'Guacamole', 0, 'Consultar disponibilidad', '/img/products/00001.png', 1, 14, 1),
(107, 5, 'Home Tempura Roll', 0, 'Salmon tempurizado, queso philadelphia, sésamo', '/img/products/00001.png', 1, 34, 1),
(108, 5, 'CHICKEN ROLL', 0, 'pollo, queso philadelphia saborizado con hierbas, sésamo', '/img/products/00001.png', 1, 55, 1),
(109, 7, 'Quilmes Bock 355 cc.', 0, '', '/img/products/00001.png', 1, 10.5, 1),
(120, 7, 'Champagne Sta Julia ONE', 0, '187cc.', '/img/products/00001.png', 1, 27, 1),
(121, 7, 'Vino Monteconejo Sauvignon Blanc', 0, '', '/img/products/00001.png', 1, 29, 1),
(122, 7, 'Vino Monteconejo Malbec', 0, '', '/img/products/00001.png', 1, 32, 1),
(123, 7, 'Vino Dos Vientos Blend Tinto', 0, '', '/img/products/00001.png', 1, 90, 1),
(124, 7, 'Vino Dos Vientos Chardonay', 0, '', '/img/products/00001.png', 1, 90, 1),
(125, 7, 'Champagne Montcunill', 0, '', '/img/products/00001.png', 1, 47, 1),
(126, 5, 'Shitake Roll', 0, 'Shitake, teriyaki, espinaca, zanahoria, queso philadelphia', '/img/products/00001.png', 1, 56, 1),
(127, 5, 'Shi Roll', 0, 'Queso philadelphia, palta, palmito, cubierto con salmon fresco. Acompañado con batatas fritas y salsa de maracuya.', '/img/products/00001.png', 1, 67, 1),
(132, 5, 'Dragon Roll', 0, 'Langostinos rebozos, salsa tabasco y concase de tomate', '/img/products/00001.png', 1, 61, 1),
(133, 5, 'Humo Roll', 0, 'Salmón Ahumado, palta y queso philadelphia', '/img/products/00001.png', 1, 73, 1),
(134, 5, 'Sunny Roll', 0, 'Tamago, salmón y cebolla de verdeo', '/img/products/00001.png', 1, 58, 1),
(135, 5, 'Golden', 0, 'Tamago, salmon, queso philadelphia y cebolla de verdeo (SIN ALGA Y SIN ARROZ)', '/img/products/00001.png', 8, 56, 1),
(136, 5, 'Azteka Roll', 0, 'Salmon, queso philadelphia y espuma de guacamole', '/img/products/00001.png', 1, 61, 1),
(137, 5, 'Capresse', 0, 'Queso philadelphia, aceituna negras, tomate y rúcula', '/img/products/00001.png', 1, 54, 1),
(138, 5, 'Italian', 0, 'Salmón ahumado y muzarella acompañado con un aciete de albaca (Roll rebozado)', '/img/products/00001.png', 3, 73, 1),
(139, 5, 'Cheddar', 0, 'Salmón tostado, queso chedar y muzarella rebozado acompañado con salsa tomanesa ', '/img/products/00001.png', 3, 75, 1),
(140, 1, 'Bastoncitos Marinos', 0, 'Bastones de calamares fritos.', '/img/products/00003.png', 1, 39, 1),
(141, 2, 'Sashimi de Tamago', 0, '', '/img/products/00001.png', 1, 39, 1),
(148, 5, 'Deli Roll', 0, 'Philadelphia Roll rebozado con salsa de ostras.', '/img/products/00001.png', 1, 68, 1),
(149, 8, 'Genjibre', 0, 'raiz de genjibre en conserva', '/img/products/00001.png', 1, 8, 1),
(150, 7, 'Fanta Zero 500cc.', 0, '', '/img/products/00001.png', 1, 16, 1),
(151, 7, 'Stella Artois 1 lts', 0, 'descarteble - no se precisa envase', '/img/products/00001.png', 1, 41, 1),
(152, 5, 'Tei Hot Roll', 0, 'Mousse de salmon, queso philadelphia y jengibre, rebozado en panko y frito con miel.', '/img/products/00001.png', 1, 61, 1),
(154, 1, 'Arrolladitos Vegetarianos', 0, NULL, '/img/products/00002.png', 3, 35, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
