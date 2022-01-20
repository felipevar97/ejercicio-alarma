CREATE SCHEMA `alarma` ;

CREATE TABLE `alarma`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `user` VARCHAR(45) NOT NULL UNIQUE,
  `pass` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  `updatedAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`));

CREATE TABLE `alarma`.`actions` (
  `id` INT NOT NULL,
  `status` BOOLEAN NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  `updatedAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`));

INSERT INTO `alarma`.`actions` (id, status) VALUES (1, false);

CREATE TABLE `alarma`.`attempts` (
  `id` INT NOT NULL,
  `unsuccessful` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  `updatedAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`));

INSERT INTO `alarma`.`attempts` (id, unsuccessful) VALUES (1, 0);
