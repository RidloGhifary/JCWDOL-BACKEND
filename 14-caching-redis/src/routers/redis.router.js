import express from "express";
import axios from "axios";

import { redisClient } from "../config/redis.config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connected = await redisClient.connect();
    if (!connected) return res.status(500).send("Redis connection failed");

    const redisData = await redisClient.get("posts");
    console.log("🚀 ~ router.get ~ redisData:", redisData);

    res.status(200).send("Success");
  } catch (error) {
    console.log("🚀 ~ router.get ~ error:", error);
  }
});

export default router;
