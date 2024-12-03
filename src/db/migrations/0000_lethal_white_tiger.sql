CREATE TABLE `guest_appearance` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`people_id` text NOT NULL,
	FOREIGN KEY (`people_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `occupation` (
	`name` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`birth_date` text NOT NULL,
	`job` text,
	`location` text,
	`country` text,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `people_to_occupations` (
	`people_id` text NOT NULL,
	`occupation_name` text NOT NULL,
	PRIMARY KEY(`occupation_name`, `people_id`),
	FOREIGN KEY (`people_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`occupation_name`) REFERENCES `occupation`(`name`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `people_to_team` (
	`people_id` text,
	`team_name` text,
	PRIMARY KEY(`people_id`, `team_name`),
	FOREIGN KEY (`people_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`team_name`) REFERENCES `team`(`name`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `team` (
	`name` text PRIMARY KEY NOT NULL
);
