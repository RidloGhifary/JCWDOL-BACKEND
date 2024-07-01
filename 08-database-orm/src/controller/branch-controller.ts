import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBranch(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const branch = await prisma.branch.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ ok: true, branch });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Internal server error" });
  }
}

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

export async function updateBranch(req: Request, res: Response) {
  const { id } = req.params;
  const { name, location } = req.body;
  try {
    await prisma.branch.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        location: location,
        updatedAt: new Date(),
      },
    });
    res.status(200).json({ ok: true, message: "Branch updated successfully" });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Internal server error" });
  }
}

export async function deleteBranch(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.branch.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ ok: true, message: "Branch deleted successfully" });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Internal server error" });
  }
}

export async function getBranchStatus(req: Request, res: Response) {
  try {
    const status = await prisma.branch.aggregate({
      _count: {
        _all: true,
      },
      _max: {
        createdAt: true,
      },
      _min: {
        createdAt: true,
      },
    });

    res.status(200).json({ ok: true, status });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ message: "Internal server error" });
  }
}
