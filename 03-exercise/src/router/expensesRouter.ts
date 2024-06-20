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

router.get("/category/:category", getExpensesByCategory);
router.get("/range", getExpensesByDateRange);
router.route("/").get(getExpenses).post(createExpense);
router
  .route("/:id")
  .get(getExpensesDetail)
  .patch(updateExpense)
  .delete(deleteExpense);

export default router;
