import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "failed",
      data: "username, email, and password are required",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "failed",
        data: "email has been used",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        attempt: 0,
      },
    });

    return res.status(201).send({
      ok: true,
      message: "success",
      data: "register success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "failed",
      data: "internal server error",
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "failed",
      data: "email and password are required",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).send({
        message: "failed",
        data: "invalid email or password",
      });
    }

    if (user.isSuspend) {
      return res.status(400).send({
        message: "failed",
        data: "account suspended",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      if (user.attempt < 3) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            attempt: user.attempt + 1,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            isSuspend: true,
          },
        });
        return res.status(400).send({
          message: "failed",
          data: "account suspended",
        });
      }

      return res.status(400).send({
        message: "failed",
        data: "invalid credentials",
      });
    }

    const jwtPayload = {
      id: user.id,
      name: user.username,
      email: email,
      role: user.role,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return res.status(200).send({
      message: "success",
      data: user,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "failed",
      data: "internal server error",
    });
  }
}
