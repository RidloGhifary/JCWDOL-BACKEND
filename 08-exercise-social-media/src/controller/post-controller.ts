import { Response, Request, NextFunction } from "express";
import { PostSchema } from "../schema";
import db from "../lib/db";

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validateRequest = PostSchema.safeParse(req.body);

  if (!validateRequest.success) {
    return res.status(400).json({ ok: false, message: "Invalid request" });
  }

  await db.post.create({
    data: {
      ...validateRequest.data,
      userId: 1,
    },
  });

  res.status(201).json({ message: "Successfully created post" });

  try {
  } catch (error: any) {
    next(error);
  }
}
