import express, { Application } from "express";

import UserRouter from "./router/user.router";
import ArticleRouter from "./router/article.router";

const app: Application = express();
const port: number = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Prisma!");
});

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/articles", ArticleRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
