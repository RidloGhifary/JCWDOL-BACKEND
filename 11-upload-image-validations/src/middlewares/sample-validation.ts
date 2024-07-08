import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const sampleValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("code").notEmpty().withMessage("Code is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          ok: false,
          message: "Invalid request",
          errors: errors.array(),
        });
    }

    next();
  },
];
