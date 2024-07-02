import { Request, Response } from "express";
import db from "../lib/db";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await db.user.findMany();

    res.status(200).json({ message: "success", data: users });
  } catch (err) {
    console.log("🚀 ~ getAllUsers ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
