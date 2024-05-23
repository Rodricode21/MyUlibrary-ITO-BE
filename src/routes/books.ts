import express from 'express'
const router = express.Router();

import {
  createBooks,
  getAllBooks,
  getBookById
} from "../controllers/booksControllers";

router.get("/books", getAllBooks);
router.get("/book/:id", getBookById)
router.post("/books", createBooks);

export default router