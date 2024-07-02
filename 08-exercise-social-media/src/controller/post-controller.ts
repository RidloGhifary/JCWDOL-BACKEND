import { Response, Request, NextFunction } from "express";
import { PostSchema } from "../schema";
import db from "../lib/db";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await db.post.findMany();

    res.status(200).json({ ok: true, data: posts });
  } catch (err) {
    next(err);
  }
}

export async function getSinglePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const post = await db.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ ok: true, data: post });
  } catch (err) {
    next(err);
  }
}

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
      userId: res.locals.user.user.id,
    },
  });

  res.status(201).json({ message: "Successfully created post" });

  try {
  } catch (error: any) {
    next(error);
  }
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    params: { id },
    body: { content, image },
  } = req;

  const validateRequest = PostSchema.safeParse(req.body);

  if (!validateRequest.success) {
    return res.status(400).json({ ok: false, message: "Invalid request" });
  }

  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ ok: false, message: "Post not found" });
    }

    if (post?.userId !== res.locals.user.user.id) {
      return res
        .status(403)
        .json({ ok: false, message: "Unauthorized to update this post" });
    }

    const updatedPost = await db.post.update({
      where: { id: parseInt(id) },
      data: {
        content,
        image,
      },
    });

    res.status(200).json({ ok: true, post: updatedPost });
  } catch (err) {
    next(err);
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    params: { id },
  } = req;

  const validateRequest = PostSchema.safeParse(req.body);

  if (!validateRequest.success) {
    return res.status(400).json({ ok: false, message: "Invalid request" });
  }

  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ ok: false, message: "Post not found" });
    }

    if (post?.userId !== res.locals.user.user.id) {
      return res
        .status(403)
        .json({ ok: false, message: "Unauthorized to update this post" });
    }

    await db.post.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ ok: true, message: "Successfully deleted post" });
  } catch (err) {
    next(err);
  }
}
