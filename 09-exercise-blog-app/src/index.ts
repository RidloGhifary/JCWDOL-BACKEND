import express, { Application } from "express";

import UserRouter from "./router/user.router";

const app: Application = express();
const port: number = 3000;

app.use(express.json());

app.use("/api/v1/users", UserRouter);

app.get("/", (req, res) => {
  res.send("Hello, Prisma!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
