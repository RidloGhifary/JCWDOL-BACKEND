import { Request, Response } from "express";
import getExpensesFilePath from "../utils/getExpensesFilePath";
import writeToExpensesFile from "../utils/writeToExpensesFile";

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

  if (!startDate || !endDate)
    return res.status(400).json({ message: "Invalid date range" });

  try {
    const expenses = await getExpensesFilePath();
    const filteredExpenses = expenses.filter(
      (expense: { date: Date }) =>
        new Date(expense.date) >= new Date(startDate) &&
        new Date(expense.date) <= new Date(endDate)
    );

    res.status(200).json({ message: "success", expenses: filteredExpenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpensesByCategory = async (req: Request, res: Response) => {
  const {
    params: { category },
  } = req;

  if (!category) return res.status(400).json({ message: "Invalid category" });

  try {
    const expenses = await getExpensesFilePath();

    const filteredExpenses = expenses.filter(
      (expense: { category: string }) =>
        expense.category.toLowerCase() === category.toLowerCase()
    );

    if (!filteredExpenses.length)
      return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "success", expenses: filteredExpenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
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

    if (!expense) return res.status(404).json({ message: "Not found" });

    res.status(200).json({
      message: "success",
      expense,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  const {
    body: { name, nominal, category },
  } = req;

  if (!name || !nominal || !category)
    return res.status(400).json({ message: "All fields are required" });

  if (typeof nominal !== "number")
    return res.status(400).json({ message: "Nominal must be a number" });

  try {
    const expenses = await getExpensesFilePath();

    const newExpenses = {
      id: expenses.length + 1,
      name,
      nominal,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expenses.push(newExpenses);
    await writeToExpensesFile(expenses);

    res.status(201).json({ message: "success", newExpenses, expenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name, nominal, category },
  } = req;

  if (nominal && typeof nominal !== "number")
    return res.status(400).json({ message: "Nominal must be a number" });

  try {
    const expenses = await getExpensesFilePath();

    let expense = expenses.find(
      (expense: { id: number }) => expense.id === Number(id)
    );
    if (!expense) return res.status(404).json({ message: "Not found" });

    expense = {
      ...expense,
      name: name || expense.name,
      nominal: nominal || expense.nominal,
      category: category || expense.category,
      updatedAt: new Date(),
    };

    expenses.push(expense);
    await writeToExpensesFile(expenses);

    res
      .status(200)
      .json({ message: "success", UpdatedExpense: expense, expenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const expenses = await getExpensesFilePath();

    const newExpenses = expenses.filter((expense: { id: number }) => {
      return expense.id !== Number(id);
    });

    await writeToExpensesFile(newExpenses);
    res.status(200).json({ message: "success", expenses: newExpenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
