CREATE TABLE `briefings` (
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
