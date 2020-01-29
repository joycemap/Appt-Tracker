CREATE TABLE
IF NOT EXISTS users
(
    Id SERIAL PRIMARY KEY,
    Name TEXT UNIQUE, 
    Password TEXT
);

CREATE TABLE
IF NOT EXISTS appointment
(
    Id SERIAL PRIMARY KEY,
    Date DATE,
    Time TIME,
    Location TEXT,
    Doctor TEXT,
    Notes TEXT

);