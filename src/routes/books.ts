import express from "express";
const router = express.Router();

import {
  createBooks,
  getAllBooks,
  getBookById,
  reserveBook
} from "../controllers/booksControllers";

router.get("/books", getAllBooks);
router.get("/book/:id", getBookById);
router.post("/books/create", createBooks);
router.post("/books/reserve", reserveBook)

export default router;
