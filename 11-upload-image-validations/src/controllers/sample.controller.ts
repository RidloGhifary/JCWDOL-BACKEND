import { NextFunction, Request, Response } from "express";

import prisma from "../prisma";

export default class SampleController {
  async getSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const sampleData = await prisma.sample.findMany();

      return res.status(200).send({
        ok: true,
        message: "Get all samples successfully",
        data: sampleData,
      });
    } catch (err) {
      next(err);
    }
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;

      const newSampleData = await prisma.sample.create({
        data: {
          name,
          code,
        },
      });

      res.status(201).json({
        ok: true,
        message: "Sample created successfully",
        data: newSampleData,
      });
    } catch (err) {
      next(err);
    }
  }
}
