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
    gameResult int(11) NOT NULL,
    gameType int(11) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (userId1) REFERENCES users(ID),
    FOREIGN KEY (userId2) REFERENCES users(ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE cards (
    imageRecource TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO achievements(ID, name, description) VALUES(1,"Rookie","First win");
INSERT INTO achievements(ID, name, description) VALUES(2,"Razing the villages","First win by destruction");
INSERT INTO achievements(ID, name, description) VALUES(3,"Creator","First win by building");
INSERT INTO achievements(ID, name, description) VALUES(4,"Tie","First tie");
INSERT INTO achievements(ID, name, description) VALUES(5,"Loser","First loss");
INSERT INTO achievements(ID, name, description) VALUES(6,"Builder","Castle above 100");
INSERT INTO achievements(ID, name, description) VALUES(7,"Underworld","Castle below 0");
INSERT INTO achievements(ID, name, description) VALUES(8,"Nimrod","Castle above 500");
INSERT INTO achievements(ID, name, description) VALUES(9,"Even start","Curse twice in single game");
INSERT INTO achievements(ID, name, description) VALUES(10,"Nocturnal","Thief twice in single game");
INSERT INTO achievements(ID, name, description) VALUES(11,"Tower of babel","Babylon played");
INSERT INTO achievements(ID, name, description) VALUES(12,"Wizard","Five mages in a single game");
INSERT INTO achievements(ID, name, description) VALUES(13,"Warrior","Five soldiers in a single game");
INSERT INTO achievements(ID, name, description) VALUES(14,"Architect","Five builders in a single game");
INSERT INTO achievements(ID, name, description) VALUES(15,"Wake up","Ten losses");
INSERT INTO achievements(ID, name, description) VALUES(16,"Start playing","50 losses");
INSERT INTO achievements(ID, name, description) VALUES(17,"Are you even trying?","100 losses");
INSERT INTO achievements(ID, name, description) VALUES(18,"Bad luck","Got curse");
INSERT INTO achievements(ID, name, description) VALUES(19,"Bad dreams","Got banshee");
INSERT INTO achievements(ID, name, description) VALUES(20,"Armory","50 weapons in single game");
INSERT INTO achievements(ID, name, description) VALUES(21,"Postman","First correspondence duel");
INSERT INTO achievements(ID, name, description) VALUES(22,"On the edge","Win from castle below 20");
INSERT INTO achievements(ID, name, description) VALUES(23,"No fear","Attack from castle below 10");
INSERT INTO achievements(ID, name, description) VALUES(24,"Watch out guys","Attack from castle below 5");
INSERT INTO achievements(ID, name, description) VALUES(25,"Safety is our priority","Wall above 100");
INSERT INTO achievements(ID, name, description) VALUES(26,"Chess player","Score above 100");
INSERT INTO achievements(ID, name, description) VALUES(27,"Genius","Score above 1000");