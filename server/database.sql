CREATE DATABASE 25ftfromtherim;

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    abrreviation varchar(255), 
    city varchar(255),
    conference varchar(255),
    division varchar(255),
    full_name varchar(255),
    name varchar(255)

);

CREATE TABLE historical_player(
    player_name VARCHAR(255) NOT NULL,
    player_id VARCHAR(255) NOT NULL,
    season VARCHAR(255) DEFAULT NULL,
    poss VARCHAR(255) DEFAULT NULL,
    mp VARCHAR(255) DEFAULT NULL,
    raptor_offense VARCHAR(255) DEFAULT NULL,
    raptor_defense VARCHAR(255) DEFAULT NULL,
    raptor_total VARCHAR(255) DEFAULT NULL,
    war_total VARCHAR(255) DEFAULT NULL,
    war_reg_season VARCHAR(255) DEFAULT NULL,
    war_playoffs VARCHAR(255) DEFAULT NULL,
    predator_offense VARCHAR(255) DEFAULT NULL,
    predator_defense VARCHAR(255) DEFAULT NULL,
    predator_total VARCHAR(255) DEFAULT NULL,
    pace_impact VARCHAR(255) DEFAULT NULL
);

CREATE TABLE profiles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL
);

CREATE TABLE profiles(
    -- id UUID DEFAULT uuid_generate_v4(),
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    -- PRIMARY KEY(id)
);

INSERT INTO profiles (name, email, password) VALUES ($1,$2, $3);

-- CREATE TABLE profiles (
--     -- id UUID DEFAULT uuid_generate_v4(),
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL, 
--     email VARCHAR(255) NOT NULL UNIQUE, 
--     password VARCHAR(255) NOT NULL,
-- );