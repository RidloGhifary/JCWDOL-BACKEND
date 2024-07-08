import { Router } from "express";

import SampleController from "../controllers/sample.controller";
import { sampleValidation } from "../middlewares/sample-validation";
import { uploader } from "../middlewares/uploader";

export default class SampleRouter {
  private router: Router;
  private sampleRouter: SampleController;

  constructor() {
    this.sampleRouter = new SampleController();
    this.router = Router();
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.get("/sample", this.sampleRouter.getSampleData);
    this.router.post(
      "/sample",
      sampleValidation,
      this.sampleRouter.createSampleData
    );
    this.router.post(
      "/sample/single-image",
      uploader("IMG", "/images").single("file"),
      this.sampleRouter.addNewImage
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
