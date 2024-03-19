DROP TABLE IF EXISTS plays;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstname` VARCHAR(30) NOT NULL,
    `lastname` VARCHAR(30) NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 10011;


CREATE TABLE plays(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date_played` DATETIME NOT NULL,
    `user_id` MEDIUMINT NOT NULL,
    `game_number` TINYINT(1) NOT NULL,
    `total_score_game` SMALLINT NOT NULL,
    `yatzee_score_count` TINYINT(1) NOT NULL DEFAULT '0',
    `total_upper_wo_bonus` SMALLINT NOT NULL,
    `total_lower_wo_bonus` SMALLINT NOT NULL,
    `rounds_played` TINYINT(1) NOT NULL DEFAULT '13',
    `full_game` TINYINT(1) NOT NULL DEFAULT '1'

)ENGINE=INNODB AUTO_INCREMENT = 20022;

INSERT INTO users(firstname, lastname, username, email, password)
VALUES
    ("Julie", "Andrews", "julie001", "julie@email.com", "qwerty");


INSERT INTO plays(date_played, user_id, game_number, total_score_game, yatzee_score_count, total_upper_wo_bonus, total_lower_wo_bonus, rounds_played, full_game)
VALUES
    ("2024-03-10 13:01:01", 10011, 1, 116, 0, 26, 90, 5, '0');

ALTER TABLE
    `plays` ADD CONSTRAINT `plays_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
