import { NextFunction, Request, Response } from "express";
import handlebars from "handlebars";
import { join } from "path";
import fs from "fs";

import prisma from "../prisma";
import { transporter } from "../helpers/nodemailer";

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

  async addNewImage(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;

      if (!file) throw new Error("No file found");

      return res.status(200).json({
        ok: true,
        message: "File uploaded successfully",
        data: file.filename,
      });
    } catch (err) {
      next(err);
    }
  }

  async sendEmail(req: Request, res: Response, next: NextFunction) {
    const { email, name } = req.body;

    try {
      const templatePath = join(__dirname, "../templates", "template.hbs");
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ name });

      await transporter.sendMail({
        from: "ridloghfry@gmail.com",
        to: email,
        subject: "Testing",
        text: "Testing",
        html,
      });

      return res.status(200).json({
        ok: true,
        message: "Email sent successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
