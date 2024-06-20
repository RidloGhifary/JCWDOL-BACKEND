import express from "express";
import {
  getExpenses,
  getExpensesByCategory,
  getExpensesByDateRange,
  getExpensesDetail,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controller/expensesController";

const router = express.Router();

router.get("/", getExpenses);
router.get("/category/:category", getExpensesByCategory);
router.get("/range", getExpensesByDateRange);
router.get("/:id", getExpensesDetail);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
