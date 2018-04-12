/*
Postgres source


DROP DATABASE IF EXISTS main;
CREATE DATABASE ecolidb
    WITH
    OWNER = root
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


CREATE TABLE users
(
	id bigint SERIAL,
	name text NOT NULL UNIQUE,
	password text NOT NULL,
	score int NOT NULL,
	token text NOT NULL UNIQUE,
	CONSTRAINT pk_users PRIMARY KEY (id)
);


*/

# Converted with pg2mysql-1.9
# Converted on Thu, 12 Apr 2018 16:54:43 -0400
# Lightbox Technologies Inc. http://www.lightbox.ca

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";

DROP DATABASE IF EXISTS main;
CREATE DATABASE `` DEFAULT CHARACTER SET ;

CREATE TABLE users
(
	id bigint SERIAL,
	name text NOT NULL UNIQUE,
	password text NOT NULL,
	score int NOT NULL,
	token text NOT NULL UNIQUE,
	CONSTRAINT pk_users PRIMARY KEY (id)
) TYPE=MyISAM;

