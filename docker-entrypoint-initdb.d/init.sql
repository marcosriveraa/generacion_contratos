CREATE DATABASE IF NOT EXISTS contratos;
USE contratos;

-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db:3306
-- Tiempo de generación: 01-04-2025 a las 06:48:21
-- Versión del servidor: 8.0.41
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `contratos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `ruta_pdf` varchar(255) NOT NULL,
  `firmado` tinyint(1) DEFAULT '0',
  `fecha_firma` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `contratos`
--

INSERT INTO `contratos` (`id`, `nombre`, `ruta_pdf`, `firmado`, `fecha_firma`) VALUES
(107, 'ff', 'contratos_firmados/ff_contrato_firmado.pdf', 1, '2025-03-31 14:47:37'),
(108, 'Empresa Ficticia S.A.', 'contratos_firmados/empresa_ficticia_s.a._contrato_firmado.pdf', 1, '2025-04-01 08:04:29'),
(109, 'gthyh', 'contratos_firmados/gthyh_contrato_firmado.pdf', 1, '2025-03-31 14:54:32'),
(110, 'Empresa Ficticia S.A.', 'contratos_firmados/empresa_ficticia_s.a._contrato_1_firmado.pdf', 1, '2025-03-31 14:57:14'),
(111, 'Empresa Ficticia S.A.', 'pendientes_firma/empresa_ficticia_s.a._contrato_2.pdf', 0, NULL),
(112, 'Empresa Ficticia S.A.', 'pendientes_firma/empresa_ficticia_s.a._contrato_3.pdf', 0, NULL),
(113, 'Empresa Ficticia S.A.', 'contratos_firmados/empresa_ficticia_s.a._contrato_4_firmado.pdf', 1, '2025-04-01 08:09:25');

--
-- Disparadores `contratos`
--
DELIMITER $$
CREATE TRIGGER `fecha_firma_nueva` BEFORE UPDATE ON `contratos` FOR EACH ROW BEGIN
    IF NEW.firmado = 1 AND OLD.firmado != 1 THEN
        -- Asignar la fecha y hora actual a la columna `fecha_firmado`
        SET NEW.fecha_firma = CONVERT_TZ(NOW(), '+00:00', '+02:00');
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `correo` varchar(255) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `correo`, `usuario`, `password`) VALUES
(1, 'admin@admin.com', 'admin', '$2y$10$zp8O8llezb83hx5r0IGVF.uzuDTqMl58WaMoNkgRQbSbYIO2ZGVn2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
