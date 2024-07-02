import { Request, Response } from "express";
import db from "../lib/db";

export async function getAllArticles(req: Request, res: Response) {
  try {
    const articles = await db.article.findMany();
    res.status(200).json({ message: "success", data: articles });
  } catch (err) {
    console.log("🚀 ~ getAllArticles ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSingleArticle(req: Request, res: Response) {
  try {
    const article = await db.article.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ message: "success", data: article });
  } catch (err) {
    console.log("🚀 ~ getSingleArticle ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createArticle(req: Request, res: Response) {
  try {
    const article = await db.article.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: "success", data: article });
  } catch (err) {
    console.log("🚀 ~ createArticle ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateArticle(req: Request, res: Response) {
  try {
    const article = await db.article.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "success", data: article });
  } catch (err) {
    console.log("🚀 ~ createArticle ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteArticle(req: Request, res: Response) {
  try {
    const article = await db.article.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("🚀 ~ createArticle ~ err:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
