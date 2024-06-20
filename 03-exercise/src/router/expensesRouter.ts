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

router.route("/").get(getExpenses).post(createExpense);
router
  .route("/:id")
  .get(getExpensesDetail)
  .patch(updateExpense)
  .delete(deleteExpense);
router.get("/category/:category", getExpensesByCategory);
router.get("/range", getExpensesByDateRange);

export default router;
