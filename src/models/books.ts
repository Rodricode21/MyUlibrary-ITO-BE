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

const getBooks = async (): Promise<Book[]> => {
  const res = await pool.query("SELECT * FROM library.books");
  return res.rows;
};

const bookById = async (id: string): Promise<Book> => {
  const res = await pool.query(`SELECT * FROM library.books WHERE id = ${id}`)
  const book = res.rows[0]
  return book
}

const createBooks = async (book: NewBook): Promise<Book> => {
  const { title, author, genre, copies } = book;

  const query =
    "INSERT INTO library.books (title,author,genre,copies) VALUES ($1, $2, $3, $4) RETURNING *";

  const values = [title, author, genre, copies];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export default {
  getBooks,
  bookById,
  createBooks,
}
