-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-12-2022 a las 13:36:43
-- Versión del servidor: 8.0.30
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clinica`
--
DROP SCHEMA IF EXISTS `clinica` ;
CREATE SCHEMA IF NOT EXISTS `clinica` ;
USE `clinica` ;


CREATE TABLE `modulos` (
  `id` bigint UNSIGNED NOT NULL,
  `modulo` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`id`, `modulo`, `descripcion`) VALUES
(1, 'Accesos', 'Configuración de usuarios, módulos, roles y permisos'),
(2, 'Compras', 'Proceso de adquisición, desde CDP hasta Adjudicación'),
(3, 'Bodegas', 'Recepción de bienes, entrega de materiales y otros'),
(4, 'Parametros', 'Configuración parámetros generales del sistema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` bigint UNSIGNED NOT NULL,
  `id_modulo` bigint UNSIGNED NOT NULL,
  `id_rol` bigint UNSIGNED NOT NULL,
  `ins` tinyint(1) NOT NULL,
  `updt` tinyint(1) NOT NULL,
  `vw` tinyint(1) NOT NULL,
  `dlt` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `id_modulo`, `id_rol`, `ins`, `updt`, `vw`, `dlt`) VALUES
(1, 1, 1, 1, 1, 1, 1),
(2, 2, 1, 1, 1, 1, 1),
(3, 3, 1, 1, 1, 1, 1),
(4, 4, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idroles` bigint UNSIGNED NOT NULL,
  `rol` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idroles`, `rol`, `estado`) VALUES
(1, 'Administrador', 1),
(2, 'Supervisor', 1),
(3, 'Operador', 1),
(4, 'Bodega', 1),
(5, 'Aprobador', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `datos` text CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `id` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `ultimo_acceso` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------


--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint UNSIGNED NOT NULL,
  `rol_id` bigint UNSIGNED NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `rut` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `clave` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `activo` tinyint NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_rol`, `nombre`, `correo`, `rut`, `pass`, `estado`, `activo`, `fecha_creacion`, `token`) VALUES
(1, 1, 'Reinaldo Blanco', 'rj@rj.cl', '25.801.628-9', '$2y$10$zzcWlSScGAPVCX4HyIWWguuGKT5ME6B34IVjDSUoUmOYmNPjo/gxC', 1, 1, '2023-04-22 09:51:36', '')

--
-- Indices de la tabla `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_modulo` (`id_modulo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`) 

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD CONSTRAINT `permisos_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
