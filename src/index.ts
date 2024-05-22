import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = process.env.PORT || 8000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
