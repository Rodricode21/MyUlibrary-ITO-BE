import express, { Request, Response, NextFunction } from "express";
import { createBooks, getAllBooks } from "./controllers/booksControllers";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

var cors = require("cors");

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/api/books", getAllBooks);
app.post("/api/createBooks", createBooks);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
