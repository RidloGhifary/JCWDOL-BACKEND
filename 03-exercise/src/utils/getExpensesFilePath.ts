import fs from "fs/promises";

const getExpensesFilePath = async () => {
  const expenses = await fs.readFile("./src/data/expenses.json", "utf-8");
  return JSON.parse(expenses);
};

export default getExpensesFilePath;
