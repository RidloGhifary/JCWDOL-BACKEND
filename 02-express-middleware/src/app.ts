import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

const Logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.url}`);
  console.log(`Method: ${req.method}`);
  next();
};

// ? built in middleware
app.use(express.static("public"));

// ? application middleware
app.use(Logger);

// ? root middleware
app.use("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  console.log(`Root middleware`);
  next();
});

app.get("/users", (req: Request, res: Response) => {
  res.send("Hello from nodejs with typescript");
});

const port = process.env.port || 3200;

app.listen(port, () => console.log(`Server running on port: ${port}`));
