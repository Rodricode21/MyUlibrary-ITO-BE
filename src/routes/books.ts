import express from 'express'
const router = express.Router();

import { getAllBooks, createBooks } from "../controllers/booksControllers";

router.get("/", getAllBooks);
router.post("/", createBooks);

export default router