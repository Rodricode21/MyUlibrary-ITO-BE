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

type BookQueryParams = Pick<Book, "title" | "author" | "genre">;

export const getBooks = async (params?: BookQueryParams): Promise<Book[]> => {
  let query = "SELECT * FROM library.books";
  const queryParams: string[] = [];

  if (params) {
    const conditions: string[] = [];

    if (params.title) {
      conditions.push(`title ILIKE $${conditions.length + 1}`);
      queryParams.push(`%${params.title}%`);
    }
    if (params.author) {
      conditions.push(`author ILIKE $${conditions.length + 1}`);
      queryParams.push(`%${params.author}%`);
    }
    if (params.genre) {
      conditions.push(`genre ILIKE $${conditions.length + 1}`);
      queryParams.push(`%${params.genre}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
  }

  const res = await pool.query(query, queryParams);
  return res.rows;
};

const bookById = async (id: string): Promise<Book> => {
  const res = await pool.query(`SELECT * FROM library.books WHERE id = ${id}`);
  const book = res.rows[0];
  return book;
};

const createBooks = async (book: NewBook): Promise<Book> => {
  const { title, author, genre, copies, published_year } = book;

  const query =
    "INSERT INTO library.books (title,author,genre,copies, published_year) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  const values = [title, author, genre, copies, published_year];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const reserveBook = async ({ bookId, userId }: { bookId: string, userId: string }): Promise<void> => {
  const query =
    "INSERT INTO library.reserved_books (book_id, user_id) VALUES ($1, $2) RETURNING *"

  const values = [bookId, userId]

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export default {
  getBooks,
  bookById,
  createBooks,
  reserveBook
};
