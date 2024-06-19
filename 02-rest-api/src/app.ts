import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from nodejs with typescript");
});

app.post("/", (req: Request, res: Response) => {
  res.send("Hello from nodejs with typescript");
});

app.put("/:id", (req: Request, res: Response) => {
  res.send(`Hello from nodejs with typescript with id ${req.params.id}`);
});

app.delete("/:id", (req: Request, res: Response) => {
  res.send(`Hello from nodejs with typescript with id ${req.params.id}`);
});

const port = process.env.port || 3200;

app.listen(port, () => console.log(`Server running on port: ${port}`));
