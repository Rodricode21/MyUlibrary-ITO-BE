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
    book_id INTEGER REFERENCES library.books(id),
    body TEXT,
    -- user_id INTEGER REFERENCES users(id),
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ********* CREATING FIXTURES DATA

-- Insert initial records into the "users" table
INSERT INTO library.users (first_name, last_name, password, role, email) VALUES
  ('rodrigo', 'serrano', 'pwd', 'student', 'test@gmail.com')
--   ('Frozen', 7000, '11/19/2013', 2),

INSERT INTO library.books (title, author, published_year, genre, copies) VALUES
  ('1984', 'George Orwell', '1949-06-08', 'Dystopian', 10),
  ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 'Fiction', 25),
  ('Pride and Prejudice', 'Jane Austen', '1813-01-28', 'Romance', 18),
  ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 'Fiction', 12),
  ('Moby Dick', 'Herman Melville', '1851-10-18', 'Adventure', 8),
  ('War and Peace', 'Leo Tolstoy', '1869-01-01', 'Historical', 7),
  ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16', 'Fiction', 14),
  ('The Lord of the Rings', 'J.R.R. Tolkien', '1954-07-29', 'Fantasy', 30),
  ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '1997-06-26', 'Fantasy', 22),
  ('The Hobbit', 'J.R.R. Tolkien', '1937-09-21', 'Fantasy', 18),
  ('The Da Vinci Code', 'Dan Brown', '2003-03-18', 'Mystery', 20),
  ('The Alchemist', 'Paulo Coelho', '1988-01-01', 'Adventure', 15),
  ('Brave New World', 'Aldous Huxley', '1932-01-01', 'Dystopian', 11),
  ('The Kite Runner', 'Khaled Hosseini', '2003-05-29', 'Drama', 9),
  ('The Hunger Games', 'Suzanne Collins', '2008-09-14', 'Dystopian', 17),
  ('Gone Girl', 'Gillian Flynn', '2012-06-05', 'Thriller', 13),
  ('The Fault in Our Stars', 'John Green', '2012-01-10', 'Romance', 21),
  ('The Chronicles of Narnia', 'C.S. Lewis', '1950-10-16', 'Fantasy', 14),
  ('The Shining', 'Stephen King', '1977-01-28', 'Horror', 10),
  ('Dracula', 'Bram Stoker', '1897-05-26', 'Horror', 5),
  ('The Girl with the Dragon Tattoo', 'Stieg Larsson', '2005-08-27', 'Mystery', 12),
  ('Catch-22', 'Joseph Heller', '1961-11-10', 'Satire', 7),
  ('The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams', '1979-10-12', 'Science Fiction', 15);
