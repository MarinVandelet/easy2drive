
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS `forart_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `forart_db`;


CREATE TABLE `avis` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `contenu` text NOT NULL,
  `nb_etoiles` tinyint(4) DEFAULT NULL CHECK (`nb_etoiles` between 1 and 5),
  `date_depot` datetime DEFAULT current_timestamp(),
  `date_publication` datetime DEFAULT NULL,
  `est_modere` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `avis` (`id`, `id_eleve`, `contenu`, `nb_etoiles`, `date_depot`, `date_publication`, `est_modere`) VALUES
(1, 18, 'Super leçon, le moniteur était très pédagogue !', 3, '2025-03-22 23:42:02', '2025-03-23 23:26:32', 1),
(7, 18, 'Je n\'ai pas tout compris, un peu trop rapide.', 2, '2025-03-23 22:06:17', '2025-03-23 23:26:32', 1),
(8, 18, 'Correct, mais peut mieux faire.', 3, '2025-03-23 22:06:22', '2025-03-23 23:26:22', 1),
(9, 18, 'Bon accompagnement, je me suis senti à l\'aise.', 4, '2025-03-23 22:06:27', '2025-03-23 23:26:21', 1),
(10, 18, 'Excellente séance, je me sens prêt pour l\'examen !', 5, '2025-03-23 22:06:34', '2025-03-23 23:25:30', 1),
(12, 18, 'J\'ai beaucoup appris, mais le créneau était un peu court.', 3, '2025-03-23 23:27:22', NULL, 0),
(13, 18, 'Topissime ! J\'ai envie de refaire une séance avec ce moniteur.', 4, '2025-03-23 23:27:31', NULL, 0),
(14, 18, 'Décevant, je m\'attendais à mieux.', 1, '2025-03-23 23:27:36', '2025-03-23 23:32:31', 1),
(15, 18, 'Une expérience incroyable, merci à toute l\'équipe !', 5, '2025-03-23 23:27:42', '2025-03-23 23:32:28', 1);


CREATE TABLE `codeblancs` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` between 0 and 100),
  `date_passage` datetime DEFAULT current_timestamp(),
  `duree` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `codeblancs` (`id`, `id_eleve`, `score`, `date_passage`, `duree`) VALUES
(1, 18, 34, '2025-03-22 22:52:24', 10),
(2, 18, 36, '2025-03-23 13:28:41', 0);

CREATE TABLE `coderoute` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` between 0 and 40),
  `date_passage` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `coderoute` (`id`, `id_eleve`, `score`, `date_passage`) VALUES
(1, 18, 37, '2025-03-22 23:29:01');

CREATE TABLE `coderouteavenir` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `date_passage` datetime NOT NULL,
  `creneau` varchar(20) NOT NULL,
  `centre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `coderouteavenir` (`id`, `id_eleve`, `date_passage`, `creneau`, `centre`) VALUES
(21, 18, '2025-03-24 00:00:00', '16:00 - 17:00', 'La Poste');

CREATE TABLE `examensavenir` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `id_moniteur` int(11) NOT NULL,
  `date_passage` datetime NOT NULL,
  `centre` varchar(100) NOT NULL,
  `duree` int(11) DEFAULT 45,
  `creneau` enum('08:00 - 09:00','09:00 - 10:00','10:00 - 11:00','11:00 - 12:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `examensavenir` (`id`, `id_eleve`, `id_moniteur`, `date_passage`, `centre`, `duree`, `creneau`) VALUES
(1, 18, 10, '2025-03-27 01:58:47', 'Villepinte', 45, '15:00 - 16:00');

CREATE TABLE `examen_permis` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `id_moniteur` int(11) NOT NULL,
  `date_passage` datetime NOT NULL,
  `centre` varchar(100) NOT NULL,
  `duree` int(11) DEFAULT 45,
  `creneau` enum('08:00 - 09:00','09:00 - 10:00','10:00 - 11:00','11:00 - 12:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00') NOT NULL,
  `reussi` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `examen_permis` (`id`, `id_eleve`, `id_moniteur`, `date_passage`, `centre`, `duree`, `creneau`, `reussi`) VALUES
(1, 18, 10, '2025-03-16 02:17:36', 'Villerois', 45, '10:00 - 11:00', 0);

CREATE TABLE `leconconduite` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `id_moniteur` int(11) NOT NULL,
  `date_lecon` date NOT NULL,
  `creneau` enum('08:00-10:00','10:00-12:00','14:00-16:00','16:00-18:00') NOT NULL,
  `voiture` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `leconconduite` (`id`, `id_eleve`, `id_moniteur`, `date_lecon`, `creneau`, `voiture`) VALUES
(1, 18, 10, '2025-03-25', '10:00-12:00', 'Renault Clio 3');

CREATE TABLE `leconconduitepasses` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `id_moniteur` int(11) NOT NULL,
  `date_lecon` datetime NOT NULL,
  `creneau` enum('08:00-10:00','10:00-12:00','14:00-16:00','16:00-18:00') NOT NULL,
  `avis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `leconconduitepasses` (`id`, `id_eleve`, `id_moniteur`, `date_lecon`, `creneau`, `avis`) VALUES
(1, 18, 10, '2025-03-23 14:24:12', '16:00-18:00', 'Ca s\'est parfaitement bien passé avec Ethan :))');

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `theme` enum('Feux','Intersection','Priorité','Signalisation','Autre') NOT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` between 0 and 100),
  `date_passage` datetime DEFAULT current_timestamp(),
  `duree` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `tests` (`id`, `id_eleve`, `theme`, `score`, `date_passage`, `duree`) VALUES
(1, 18, 'Intersection', 39, '2025-03-22 23:18:19', 0),
(2, 18, 'Signalisation', 29, '2025-03-22 23:19:50', 0),
(3, 18, 'Priorité', 27, '2025-03-22 13:29:02', 0);


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('eleve','moniteur','admin') DEFAULT 'eleve',
  `date_naissance` date DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `code_postal` varchar(10) DEFAULT NULL,
  `npeh` varchar(20) DEFAULT NULL,
  `etg` enum('B1','B','BE','C','D','CE','DE','C1','D1','C1E','D1E') DEFAULT NULL,
  `echec_etg` tinyint(1) DEFAULT 0,
  `date_inscription` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `role`, `date_naissance`, `adresse`, `ville`, `code_postal`, `npeh`, `etg`, `echec_etg`, `date_inscription`) VALUES
(3, 'Vandele', 'Marin', 'admin1@gmail.com', 'Password123', 'admin', '2001-03-06', NULL, NULL, NULL, NULL, NULL, 0, '2025-03-22 17:12:58'),
(10, 'Renard', 'Marc', 'moniteur1@gmail.com', 'Password123', 'moniteur', '1985-07-12', NULL, NULL, NULL, NULL, NULL, 0, '2025-03-22 21:25:44'),
(18, 'Robert', 'Ethan', ' eleve1@gmail.com', 'Password123', 'eleve', '2004-10-02', NULL, NULL, NULL, NULL, NULL, 0, '2025-03-22 21:25:44');

ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_eleve` (`id_eleve`);

ALTER TABLE `codeblancs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_eleve` (`id_eleve`);

ALTER TABLE `coderoute`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_eleve` (`id_eleve`);

ALTER TABLE `coderouteavenir`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `examensavenir`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `examen_permis`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `leconconduite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_eleve` (`id_eleve`),
  ADD KEY `id_moniteur` (`id_moniteur`);

ALTER TABLE `leconconduitepasses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_eleve` (`id_eleve`),
  ADD KEY `id_moniteur` (`id_moniteur`);

ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_eleve` (`id_eleve`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `avis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `codeblancs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `coderoute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `coderouteavenir`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `examensavenir`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `examen_permis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `leconconduite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `leconconduitepasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `codeblancs`
  ADD CONSTRAINT `codeblancs_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `coderoute`
  ADD CONSTRAINT `coderoute_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `leconconduite`
  ADD CONSTRAINT `leconconduite_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leconconduite_ibfk_2` FOREIGN KEY (`id_moniteur`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `leconconduitepasses`
  ADD CONSTRAINT `leconconduitepasses_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `leconconduitepasses_ibfk_2` FOREIGN KEY (`id_moniteur`) REFERENCES `users` (`id`);

ALTER TABLE `tests`
  ADD CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`id_eleve`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;