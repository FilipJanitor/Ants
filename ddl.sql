/*
Postgres source. DUMP IS IN MAIN


DROP DATABASE IF EXISTS main;
CREATE DATABASE main
    WITH
    OWNER = root
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


CREATE TABLE users
(
	userId SERIAL,
	name text NOT NULL UNIQUE,
	password text NOT NULL,
	score int NOT NULL,
	wins int NOT NULL,
	loses int NOT NULL,
	ties int NOT NULL,
	token text NOT NULL UNIQUE,
	CONSTRAINT pk_users PRIMARY KEY (userId)
);

*/

# Converted with pg2mysql-1.9
# Converted on Thu, 12 Apr 2018 16:54:43 -0400
# Lightbox Technologies Inc. http://www.lightbox.ca

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";

CREATE TABLE public.users (
    userid int(11) NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    score int(11) NOT NULL,
    wins int(11) NOT NULL,
    loses int(11) NOT NULL,
    ties int(11) NOT NULL,
    token text NOT NULL
) TYPE=MyISAM;

ALTER TABLE public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (userid);
