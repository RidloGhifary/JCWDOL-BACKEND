import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import db from "../lib/db";
import { RegisterSchema } from "../schema";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validateRequest = RegisterSchema.safeParse(req.body);

  if (!validateRequest.success) {
    return res.status(400).json({ message: "Invalid request!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(validateRequest.data.password, 10);

    await db.user.create({
      data: {
        ...validateRequest.data,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created!" });
  } catch (err) {
    next(err);
  }
}
