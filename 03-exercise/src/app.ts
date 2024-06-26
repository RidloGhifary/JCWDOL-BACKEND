import express, { Application } from "express";

import ExpensesRouter from "./router/expensesRouter";

const app: Application = express();
const port = process.env.port || 3200;

app.use(express.json());

app.use("/api/v1/expenses", ExpensesRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
