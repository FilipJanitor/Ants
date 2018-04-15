SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";

DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS users_achievements;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    ID int(11) NOT NULL AUTO_INCREMENT,
    name text NOT NULL,
    password text NOT NULL,
    score int(11) NOT NULL,
    wins int(11) NOT NULL,
    loses int(11) NOT NULL,
    ties int(11) NOT NULL,
    token text NOT NULL,
    lookingForMatch int(11) NOT NULL,
    rank int(11) NOT NULL,
    PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE achievements (
    ID int(11) NOT NULL AUTO_INCREMENT,
    name text NOT NULL,
    description text NOT NULL,
    imageResource text NOT NULL,
    PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE users_achievements (
    achievementId int(11) NOT NULL,
    userId int(11) NOT NULL,
    FOREIGN KEY (achievementId) REFERENCES achievements(ID),
    FOREIGN KEY (userId) REFERENCES users(ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE tournaments (
    ID int(11) NOT NULL AUTO_INCREMENT,
    userId1 int(11) NOT NULL,
    userId2 int(11) NOT NULL,
    rounds int(11) NOT NULL,
    gameResult int(11) NOT NULL,
    gameType int(11) NOT NULL,
    playerOnTurn int(11) NOT NULL,
    /*stats doplnit*/
    PRIMARY KEY (ID),
    FOREIGN KEY (userId1) REFERENCES users(ID),
    FOREIGN KEY (userId2) REFERENCES users(ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE cards (
    imageRecource TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
