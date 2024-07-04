import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from nodejs with typescript");
});

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
