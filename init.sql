-- Create database
CREATE DATABASE IF NOT EXISTS library;

-- Create the new schema
CREATE SCHEMA IF NOT EXISTS library;

-- Crear la tabla enum para roles
CREATE TYPE roles AS ENUM ('librarian', 'student');

-- Crear la tabla users
CREATE TABLE library.users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role roles NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla books
CREATE TABLE library.books (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    published_year TIMESTAMP,
    genre VARCHAR,
    copies INTEGER
);

-- Crear la tabla reserved_books
CREATE TABLE library.reserved_books (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    body TEXT,
    -- user_id INTEGER REFERENCES users(id),
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATING FIXTURES DATA

-- Insert initial records into the "users" table
INSERT INTO library.users (first_name, last_name, password, role, email) VALUES
  ('rodrigo', 'serrano', 'pwd', 'student', 'test@gmail.com'),
--   ('Frozen', 7000, '11/19/2013', 2),

INSERT INTO library.books (title, author, published_year, genre, copies) VALUES
  ('Titanic', 'James Cameron', 1997, 'drama', 20),
--   ('Frozen', 7000, '11/19/2013', 2),
