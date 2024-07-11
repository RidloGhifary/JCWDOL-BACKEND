import express, { Application } from "express";

import userRouter from "./routes/user";
import pokemonRouter from "./routes/pokemon";

const app: Application = express();
const PORT = 4000;

app.use("/api/users", userRouter);
app.use("/api/pokemon", pokemonRouter);

app.listen(PORT, () => console.log("Server Connected!"));

export default app;
