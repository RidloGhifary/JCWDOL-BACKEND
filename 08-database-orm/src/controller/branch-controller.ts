import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBranches(req: Request, res: Response) {
  try {
    const branches = await prisma.branch.findMany();
    res.status(200).json({ ok: true, branches });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Internal server error" });
  }
}

export async function createBranch(req: Request, res: Response) {
  const { name, location } = req.body;

  try {
    await prisma.branch.create({
      data: {
        name: name,
        location: location,
      },
    });

    res.status(201).json({ ok: true, message: "Branch created successfully" });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Internal server error" });
  }
}
