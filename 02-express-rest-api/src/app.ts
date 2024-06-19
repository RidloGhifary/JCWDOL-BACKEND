import express, { Application, Request, Response, NextFunction } from "express";
import fs from "fs/promises";

const app: Application = express();
const port = process.env.port || 3200;

app.use(express.json());

const todosFilePath = "./src/data/todos.json";

const getTodos = async () => {
  try {
    const data = await fs.readFile(todosFilePath, "utf-8");
    const todos = JSON.parse(data);

    return todos;
  } catch (err) {
    console.log(err);
  }
};

app.get("/api/v1/todos", async (req: Request, res: Response) => {
  try {
    const todos = await getTodos();

    res.status(200).json({ message: "success", todos });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v1/todos/:id", async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const todos = await getTodos();
    const todo = todos.find((todo: { id: number }) => todo.id === Number(id));

    if (!todo) res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "success", todo });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/todos", async (req: Request, res: Response) => {
  const { task } = req.body;

  if (!task) res.status(400).json({ message: "Task is required" });

  try {
    const todos = await getTodos();

    const newTodo = {
      id: todos.length + 1,
      task,
      completed: false,
    };

    todos.push(newTodo);
    await fs.writeFile(todosFilePath, JSON.stringify(todos));

    res.status(201).json({ message: "success", todo: newTodo });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/api/v1/todos/:id", async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { completed },
  } = req;

  if (!completed)
    res.status(400).json({ message: "Completed field is required" });

  if (typeof completed !== "boolean")
    res.status(400).json({ message: "Completed must be a boolean" });

  try {
    const todos = await getTodos();
    const todo = todos.find((todo: { id: number }) => todo.id === Number(id));
    if (!todo) res.status(404).json({ message: "Not found" });

    const index = todos.indexOf(todo);
    todos[index] = { ...todo, completed: true };
    await fs.writeFile(todosFilePath, JSON.stringify(todos));

    res.status(200).json({ message: "success", todo: todos[index] });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v1/todos/:id", async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const todos = await getTodos();

    const todo = todos.filter((todo: { id: number }) => {
      return todo.id !== Number(id);
    });
    if (!todo) res.status(404).json({ message: "Not found" });

    await fs.writeFile(todosFilePath, JSON.stringify(todo));
    res.status(200).json({ message: "success", todos: todo });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
