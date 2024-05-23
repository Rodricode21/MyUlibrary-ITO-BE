import { Request, Response } from "express";
const Books = require("../models/books");

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Books.getBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
