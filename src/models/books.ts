import pool from "../db";

export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: Date;
  genre: string;
  copies: number;
}

export interface NewBook {
  title: string;
  author: string;
  published_year: Date;
  genre: string;
  copies: number;
}

export const getBooks = async (): Promise<Book[]> => {
  const res = await pool.query("SELECT * FROM library.books");
  return res.rows;
};

export const createBooks = async (book: NewBook) => {
  const { title, author, genre, copies } = book;

  const query =
    "INSERT INTO library.books (title,author,genre,copies) VALUES ($1, $2, $3, $4) RETURNING *";

  const values = [title, author, genre, copies];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getBooks,
  createBooks,
};
