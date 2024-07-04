import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
        role: string;
      };
    }
  }
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).send("Unauthorized");
  }

  const token = authorizationHeader.replace("Bearer ", "");
  try {
    const verifyUser = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & {
      id: string;
      username: string;
      email: string;
      role: string;
    };

    if (!verifyUser) {
      return res.status(401).send("Unauthorized");
    }

    req.user = {
      id: verifyUser.id,
      username: verifyUser.username,
      email: verifyUser.email,
      role: verifyUser.role,
    };

    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}
