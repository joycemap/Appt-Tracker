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
    to_char TEXT,
    Time TIME
(5),
    Location TEXT,
    Doctor TEXT,
    Notes TEXT

);