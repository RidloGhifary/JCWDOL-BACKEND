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
      (expense: { createdAt: Date }) =>
        new Date(expense.createdAt) >= new Date(startDate) &&
        new Date(expense.createdAt) <= new Date(endDate)
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
    body: { name, nominal, category, type },
  } = req;

  if (!name || !nominal || !category || !type)
    return res.status(400).json({ message: "All fields are required" });

  if (!["income", "expense"].includes(type))
    return res
      .status(400)
      .json({ message: "Type must be either income or expense" });

  if (!["food", "transportation", "salary"].includes(category))
    return res.status(400).json({
      message: "Category must be either food, transportation, salary",
    });

  if (typeof nominal !== "number")
    return res.status(400).json({ message: "Nominal must be a number" });

  try {
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
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name, nominal, category, type },
  } = req;

  if (nominal && typeof nominal !== "number")
    return res.status(400).json({ message: "Nominal must be a number" });

  if (type !== "expense" || type !== "income")
    return res.status(400).json({ message: "Type must be expense or income" });

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
      type: type || expense.type,
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

    const expenseIndex = expenses.findIndex(
      (expense: { id: number }) => expense.id === Number(id)
    );

    if (expenseIndex === -1)
      return res.status(404).json({ message: "Not found" });

    expenses.splice(expenseIndex, 1);

    await writeToExpensesFile(expenses);
    res.status(200).json({ message: "success", expenses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
