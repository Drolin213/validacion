-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2024 a las 18:34:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mentory`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `response_1` varchar(45) DEFAULT NULL,
  `response_2` varchar(45) DEFAULT NULL,
  `cases_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `code_case` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`client_id`, `client_name`) VALUES
(1, 'Cliente A'),
(2, 'Cliente B'),
(3, 'Cliente C'),
(4, 'Cliente D'),
(5, 'Cliente E'),
(6, 'Cliente F'),
(7, 'Cliente G'),
(8, 'Cliente H'),
(9, 'Cliente I'),
(10, 'Cliente J'),
(11, 'Cliente K'),
(12, 'Cliente L'),
(13, 'Cliente M'),
(14, 'Cliente N'),
(15, 'Cliente O');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `rol_id` int(11) NOT NULL,
  `rol_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`rol_id`, `rol_name`) VALUES
(1, 'superAdmin'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(45) NOT NULL,
  `password` varchar(256) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `access_Token` varchar(260) NOT NULL,
  `token_Exp` int(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `password`, `rol_id`, `client_id`, `access_Token`, `token_Exp`) VALUES
(2, 'user1', 'password1', 1, 1, 'token1', 2024),
(3, 'user2', 'password2', 2, 2, 'token2', 2024),
(4, 'user3', 'password3', 1, 3, 'token3', 2024),
(5, 'user4', 'password4', 2, 4, 'token4', 2024),
(6, 'user5', 'password5', 1, 5, 'token5', 2024),
(7, 'user6', 'password6', 2, 6, 'token6', 2024),
(8, 'user7', 'password7', 1, 7, 'token7', 2024),
(9, 'user8', 'password8', 2, 8, 'token8', 2024),
(10, 'user9', 'password9', 1, 9, 'token9', 2024),
(11, 'user10', 'password10', 2, 10, 'token10', 2024),
(12, 'user11', 'password11', 1, 1, 'token11', 2024),
(13, 'user12', 'password12', 2, 2, 'token12', 2024),
(14, 'user13', 'password13', 1, 3, 'token13', 2024),
(15, 'user14', 'password14', 2, 4, 'token14', 2024),
(16, 'user15', 'password15', 1, 5, 'token15', 2024),
(17, 'user16', 'password16', 2, 6, 'token16', 2024),
(18, 'user17', 'password17', 1, 7, 'token17', 2024),
(19, 'user18', 'password18', 2, 8, 'token18', 2024),
(20, 'user19', 'password19', 1, 9, 'token19', 2024),
(21, 'user20', 'password20', 2, 10, 'token20', 2024),
(22, 'user21', 'password21', 1, 1, 'token21', 2024),
(23, 'user22', 'password22', 2, 2, 'token22', 2024),
(24, 'user23', 'password23', 1, 3, 'token23', 2024),
(25, 'user24', 'password24', 2, 4, 'token24', 2024),
(26, 'user25', 'password25', 1, 5, 'token25', 2024),
(27, 'user26', 'password26', 2, 6, 'token26', 2024),
(28, 'user27', 'password27', 1, 7, 'token27', 2024),
(29, 'user28', 'password28', 2, 8, 'token28', 2024),
(30, 'user29', 'password29', 1, 9, 'token29', 2024),
(36, 'davidlozano.7', '$2b$10$nHwXR0wMVq4sLiDb3miVNeczsD8IGEQHxtbqT1.XkJ67t4YVcZAqK', 2, 1, '1302111d5b2c18434d2362dd2198664580d8811e85d680bb07bdcddee3d9c6799da5ddc66b3b8b7f11aa304ae5a0d6fd01ce46ba5fc5286b1109586b2e534f142b51b6bd18a8f5ed8f998a2edfa590fa638293e8a81615c9e21fdb8fd13691b2706556f69c9c3bd76f0333777c41ea9b0fdd310cf82cf441557413ef7012faa360b4', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `name_video` varchar(45) DEFAULT NULL,
  `link_video` varchar(45) DEFAULT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id`, `name_video`, `link_video`, `client_id`) VALUES
(1, 'Video A', 'http://linka.com', 1),
(2, 'Video B', 'http://linkb.com', 2),
(3, 'Video C', 'http://linkc.com', 3),
(4, 'Video D', 'http://linkd.com', 4),
(5, 'Video E', 'http://linke.com', 5),
(6, 'Video F', 'http://linkf.com', 6),
(7, 'Video G', 'http://linkg.com', 7),
(8, 'Video H', 'http://linkh.com', 8),
(9, 'Video I', 'http://linki.com', 9),
(10, 'Video J', 'http://linkj.com', 10),
(11, 'Video K', 'http://linkk.com', 11),
(12, 'Video L', 'http://linkl.com', 12),
(13, 'Video M', 'http://linkm.com', 13),
(14, 'Video N', 'http://linkn.com', 14),
(15, 'Video O', 'http://linko.com', 15);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_answers_cases1_idx` (`cases_id`);

--
-- Indices de la tabla `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_answers_cases1` FOREIGN KEY (`cases_id`) REFERENCES `cases` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
