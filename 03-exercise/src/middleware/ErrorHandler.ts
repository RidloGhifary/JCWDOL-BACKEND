import { NextFunction, Request, Response } from "express";
import CustomAPIError from "../utils/customError";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
