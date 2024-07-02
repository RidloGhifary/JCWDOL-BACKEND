import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../lib/db";
import { LoginSchema, RegisterSchema } from "../schema";

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

export async function login(req: Request, res: Response, next: NextFunction) {
  const validateRequest = LoginSchema.safeParse(req.body);

  if (!validateRequest.success) {
    return res.status(400).json({ message: "Invalid request!" });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: validateRequest.data.email },
    });

    const isPasswordMatch = await bcrypt.compare(
      validateRequest.data.password,
      user?.password as string
    );

    if (!(user || isPasswordMatch)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}
