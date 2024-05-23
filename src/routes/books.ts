import express from 'express'
const router = express.Router();

import { getAllBooks, createBooks } from "../controllers/booksControllers";

router.get("/books", getAllBooks);
router.post("/books", createBooks);

export default router