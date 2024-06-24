import express, { Application, Request, Response } from "express";
import "dotenv/config";

import mysqlConnection from "./config/db.config";

const app: Application = express();
const port: number = 3200;

app.get("/", (req: Request, res: Response) => {
  mysqlConnection.query("SELECT * FROM students", (err, result) => {
    if (err) throw err;
    res.status(200).json({
      status: true,
      message: "success",
      data: result,
    });
  });
});

mysqlConnection.getConnection((error, connection) => {
  if (error) throw error.message;
  console.log(`MySQL connected: ${connection.threadId}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
