import { Response, Request, NextFunction } from "express";
import { PostSchema } from "../schema";
import db from "../lib/db";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await db.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            like: true,
            comment: true,
          },
        },
      },
    });

    // Map the results to include "likeAmount" instead of "_count.like"
    const formattedPosts = posts.map((post) => ({
      ...post,
      likeAmount: post._count.like,
      commentAmount: post._count.comment,
      _count: undefined, // Remove the original _count property if necessary
    }));

    res.status(200).json({ ok: true, posts: formattedPosts });
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        like: {
          select: {
            id: true,
          },
        },
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
