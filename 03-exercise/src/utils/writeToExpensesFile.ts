import fs from "fs/promises";

const writeToExpensesFile = async (data: any) => {
  await fs.writeFile("./src/data/expenses.json", JSON.stringify(data));
};

export default writeToExpensesFile;
