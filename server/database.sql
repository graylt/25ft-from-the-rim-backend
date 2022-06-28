CREATE DATABASE 25ftfromtherim;

-- CREATE TABLE teams(
--     id SERIAL PRIMARY KEY,
--     abrreviation varchar(255), 
--     city varchar(255),
--     conference varchar(255),
--     division varchar(255),
--     full_name varchar(255),
--     name varchar(255)

-- );

CREATE TABLE profiles (
    id UUID DEFAULT uuid_generate_v4(), 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);