import express, { Application } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import ErrorHandler from "./middleware/error-middleware";
import PostRouter from "./router/post-router";
import UserRouter from "./router/user-router";
import LikeRouter from "./router/like-post-router";
import CommentRouter from "./router/comment-post-router";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(helmet());

app.use(ErrorHandler);

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/posts", PostRouter);
app.use("/api/v1/posts/like", LikeRouter);
app.use("/api/v1/posts/comment", CommentRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
