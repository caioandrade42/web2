CREATE DATABASE  IF NOT EXISTS `devweb2025`;

USE `web2`;

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `nome` varchar(128) DEFAULT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;