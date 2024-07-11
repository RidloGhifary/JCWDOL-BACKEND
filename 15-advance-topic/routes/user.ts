import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).send({ message: "OK", users: users });
  } catch (error) {
    res.status(500).send({
      message: "OK",
      users: JSON.stringify(error),
    });
  }
});

export default router;
