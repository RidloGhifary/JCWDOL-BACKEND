import { Request, Response } from "express";
import getExpensesFilePath from "../utils/getExpensesFilePath";
import writeToExpensesFile from "../utils/writeToExpensesFile";
import ErrorHandler from "../utils/customError";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await getExpensesFilePath();

    res.status(200).json({ message: "success get all expenses", expenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpensesByDateRange = async (req: Request, res: Response) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  try {
    if (!startDate || !endDate)
      throw new ErrorHandler(400, "Invalid date range");

    const expenses = await getExpensesFilePath();
    const filteredExpenses = expenses.filter(
      (expense: { createdAt: Date }) =>
        new Date(expense.createdAt) >= new Date(startDate) &&
        new Date(expense.createdAt) <= new Date(endDate)
    );

    res.status(200).json({ message: "success", expenses: filteredExpenses });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message || "Internal server error" });
    else res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpensesByCategory = async (req: Request, res: Response) => {
  const {
    params: { category },
  } = req;

  try {
    if (!["food", "transportation", "salary"].includes(category))
      throw new ErrorHandler(400, "Invalid category");

    const expenses = await getExpensesFilePath();

    const filteredExpenses = expenses.filter(
      (expense: { category: string }) =>
        expense.category.toLowerCase() === category.toLowerCase()
    );

    if (!filteredExpenses.length)
      throw new ErrorHandler(404, "Cannot found expenses");

    res.status(200).json({ message: "success", expenses: filteredExpenses });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message || "Internal server error" });
    else res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpensesDetail = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const expenses = await getExpensesFilePath();

    const expense = expenses.find(
      (expense: { id: number }) => expense.id === Number(id)
    );

    if (!expense) throw new ErrorHandler(404, "Cannot found expense");

    res.status(200).json({
      message: "success",
      expense,
    });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message || "Internal server error" });
    else res.status(500).json({ message: "Internal server error" });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  const {
    body: { name, nominal, category, type },
  } = req;

  try {
    if (!name || !nominal || !category || !type)
      throw new ErrorHandler(400, "All fields must be filled");

    if (!["income", "expense"].includes(type))
      throw new ErrorHandler(400, "Type must be either income or expense");

    if (!["food", "transportation", "salary"].includes(category))
      throw new ErrorHandler(
        400,
        "Category must be either food, transportation or salary"
      );

    if (typeof nominal !== "number")
      throw new ErrorHandler(400, "Nominal must be a number");

    const expenses = await getExpensesFilePath();

    const newExpenses = {
      id: expenses.length + 1,
      name,
      nominal,
      category,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expenses.push(newExpenses);
    await writeToExpensesFile(expenses);

    res.status(201).json({ message: "success", newExpenses, expenses });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message || "Internal server error" });
    else res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name, nominal, category, type },
  } = req;

  try {
    if (nominal && typeof nominal !== "number")
      throw new ErrorHandler(400, "Nominal must be a number");

    if (type && !["income", "expense"].includes(type))
      throw new ErrorHandler(400, "Type must be either income or expense");

    const expenses = await getExpensesFilePath();

    const expenseIndex = expenses.findIndex(
      (expense: { id: number }) => expense.id === Number(id)
    );

    if (expenseIndex === -1)
      throw new ErrorHandler(404, "Cannot found expense");

    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      name: name || expenses[expenseIndex].name,
      nominal: nominal || expenses[expenseIndex].nominal,
      category: category || expenses[expenseIndex].category,
      type: type || expenses[expenseIndex].type,
      updatedAt: new Date(),
    };

    await writeToExpensesFile(expenses);

    res.status(200).json({
      message: "success",
      updateExpense: expenses[expenseIndex],
      expenses,
    });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message || "Internal server error" });
    else res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const expenses = await getExpensesFilePath();

    const expenseIndex = expenses.findIndex(
      (expense: { id: number }) => expense.id === Number(id)
    );

    if (expenseIndex === -1)
      throw new ErrorHandler(404, "Cannot found expense");

    expenses.splice(expenseIndex, 1);

    await writeToExpensesFile(expenses);
    res.status(200).json({ message: "success", expenses });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message || "Internal server error" });
    else res.status(500).json({ message: "Internal server error" });
  }
};
