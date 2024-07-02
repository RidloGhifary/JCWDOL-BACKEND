import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const AuthenticatedToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is missing!" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token!" });
    }

    res.locals.user = user;
    next();
  });
};
