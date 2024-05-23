import { Request, Response } from "express";
import Books from "../models/books";

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookParams: any = {};

    if (req.query.title) {
      bookParams.title = String(req.query.title);
    }
    if (req.query.author) {
      bookParams.author = String(req.query.author);
    }
    if (req.query.genre) {
      bookParams.genre = String(req.query.genre);
    }

    const books = await Books.getBooks(bookParams);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Books.bookById(id);
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book", error);
  }
};

export const createBooks = async (req: Request, res: Response) => {
  try {
    const books = await Books.createBooks(req.body);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
