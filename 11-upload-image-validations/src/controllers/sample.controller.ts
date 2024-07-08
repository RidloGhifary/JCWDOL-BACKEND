import { Request, Response } from "express";

export default class SampleController {
  async getSampleData(req: Request, res: Response) {
    return res.status(200).send({
      message: "success",
      data: "Hello World",
    });
  }
}
