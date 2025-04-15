BEGIN;

DROP TABLE IF EXISTS public.Messages;
DROP TABLE IF EXISTS public.Users;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE Users (
  username TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birthdate DATE NOT NULL
);

CREATE TABLE Messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "from" TEXT REFERENCES Users(username) ON DELETE CASCADE,
  "to" TEXT REFERENCES Users(username) ON DELETE CASCADE,
  content TEXT NOT NULL,
  date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
