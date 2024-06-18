const fs = require("fs");

fs.writeFileSync("01-nodejs.txt", "Hello from nodejs");
const content = fs.readFileSync("01-nodejs.txt", "utf-8");
console.log("🚀 ~ content:", content);
