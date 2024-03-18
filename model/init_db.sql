DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS plays;

CREATE TABLE users(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(30) NOT NULL,
    `lastName` VARCHAR(30) NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 10011;


CREATE TABLE plays(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date_played` DATETIME NOT NULL,
    `user_id` MEDIUMINT NOT NULL,
    `total_score_game` SMALLINT NOT NULL,
    `yatzee_score_count` TINYINT(1) NOT NULL DEFAULT '0',
    `total_upper_wo_bonus` SMALLINT NOT NULL,
    `total_lower_wo_bonus` SMALLINT NOT NULL,
    `rounds_played` TINYINT(1) NOT NULL DEFAULT '13',
    `full_game` TINYINT(1) NOT NULL DEFAULT '1'

)ENGINE=INNODB AUTO_INCREMENT = 20022;

INSERT INTO users(firstName, lastName)
VALUES
    ("Julie", "Andrews");


INSERT INTO plays(date_played, user_id, total_score_game, yatzee_score_count, total_upper_wo_bonus, total_lower_wo_bonus, rounds_played, full_game)
VALUES
    ("2024-03-10 13:01:01", 10011, 116, 0, 26, 90, 5, '0');

ALTER TABLE
    `plays` ADD CONSTRAINT `plays_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
