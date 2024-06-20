import express from "express";
import {
  getExpenses,
  getExpensesDetail,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controller/expensesController";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpensesDetail);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
