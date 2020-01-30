CREATE TABLE
IF NOT EXISTS users
(id SERIAL PRIMARY KEY,
    Name TEXT UNIQUE, 
    Password TEXT
);

CREATE TABLE
IF NOT EXISTS appointment
(id SERIAL PRIMARY KEY,
    Date DATE,
    Time TIME
(5),
    Location TEXT,
    Doctor TEXT,
    Notes TEXT,
    user_id INTEGER,
    FOREIGN KEY
(user_id) REFERENCES users
(id)

);