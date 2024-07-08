import SampleController from "../controllers/sample.controller";
import { Router } from "express";

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
  }

  getRouter(): Router {
    return this.router;
  }
}
