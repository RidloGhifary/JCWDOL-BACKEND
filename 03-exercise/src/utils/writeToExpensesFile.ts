import fs from "fs/promises";

const writeToExpensesFile = async (data: any) => {
  await fs.writeFile("./src/data/expenses.json", JSON.stringify(data, null, 2));
};

export default writeToExpensesFile;
