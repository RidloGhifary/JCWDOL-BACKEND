import { Response, Request, NextFunction } from "express";
import db from "../lib/db";

export async function likePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId, userId } = req.params;

  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      return res.status(404).json({ ok: false, message: "Post not found" });
    }

    const userAlreadyLikePost = await db.like.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId),
      },
    });

    if (userAlreadyLikePost) {
      await db.like.delete({
        where: {
          id: userAlreadyLikePost.id,
        },
      });

      return res
        .status(200)
        .json({ ok: true, message: "Successfully unlike post" });
    }

    await db.like.create({
      data: {
        userId: res.locals.user.user.id,
        postId: post?.id,
      },
    });

    res.status(200).json({ ok: true, message: "Successfully like post" });
  } catch (err) {
    next(err);
  }
}
