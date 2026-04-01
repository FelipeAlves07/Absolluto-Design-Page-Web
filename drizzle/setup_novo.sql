-- ============================================================
-- MIGRATION: Criação das tabelas — Absolluto Design²
-- Execute este SQL no seu banco MySQL do Railway
-- ============================================================

-- 1. Recriar tabela users sem openId/loginMethod, com passwordHash
CREATE TABLE IF NOT EXISTS `users` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` text,
  `email` varchar(320) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `users_id` PRIMARY KEY(`id`),
  CONSTRAINT `users_email_unique` UNIQUE(`email`)
);

-- 2. Briefings
CREATE TABLE IF NOT EXISTS `briefings` (
  `id` int AUTO_INCREMENT NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientEmail` varchar(320) NOT NULL,
  `briefingType` varchar(50) NOT NULL,
  `formData` text NOT NULL,
  `status` enum('novo','em-andamento','concluido') NOT NULL DEFAULT 'novo',
  `notes` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `briefings_id` PRIMARY KEY(`id`)
);

-- 3. Custom Forms
CREATE TABLE IF NOT EXISTS `customForms` (
  `id` int AUTO_INCREMENT NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientEmail` varchar(320) NOT NULL,
  `formTitle` varchar(255) NOT NULL,
  `htmlContent` text NOT NULL,
  `cssContent` text,
  `uniqueLink` varchar(100) NOT NULL,
  `isActive` int NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `customForms_id` PRIMARY KEY(`id`),
  CONSTRAINT `customForms_uniqueLink_unique` UNIQUE(`uniqueLink`)
);

-- 4. Custom Form Submissions
CREATE TABLE IF NOT EXISTS `customFormSubmissions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `formId` int NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientEmail` varchar(320) NOT NULL,
  `formData` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `customFormSubmissions_id` PRIMARY KEY(`id`)
);
