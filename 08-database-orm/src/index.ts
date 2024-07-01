import express, { Application, Request, Response } from "express";

import BranchRouter from "./router/branch-route";

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/v1", BranchRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Prisma with Express and TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} :)`);
});
