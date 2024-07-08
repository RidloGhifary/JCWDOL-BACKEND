import { Router } from "express";

import SampleController from "../controllers/sample.controller";
import { sampleValidation } from "../middlewares/sample-validation";

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
  }

  getRouter(): Router {
    return this.router;
  }
}
