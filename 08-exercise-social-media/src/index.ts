import express, { Application } from "express";

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Prisma!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
