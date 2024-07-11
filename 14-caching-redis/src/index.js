import express from "express";

import RedisRouter from "./routers/redis.router.js";

const app = express();
const port = 3000;

app.use("/api/redis", RedisRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
