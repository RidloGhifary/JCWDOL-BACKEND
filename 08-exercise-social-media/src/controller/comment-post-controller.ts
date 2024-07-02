import { Response, Request, NextFunction } from "express";
import db from "../lib/db";
import { CommentSchema } from "../schema";

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = req.params;
  const validateRequest = CommentSchema.safeParse(req.body);

  if (!validateRequest.success) {
    return res.status(400).json({ ok: false, message: "Invalid request!" });
  }

  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      return res.status(404).json({ ok: false, message: "Post not found" });
    }

    await db.comment.create({
      data: {
        ...validateRequest.data,
        userId: res.locals.user.user.id,
        postId: post.id,
      },
    });

    res.status(201).json({ message: "Comment created!" });
  } catch (err) {
    next(err);
  }
}
