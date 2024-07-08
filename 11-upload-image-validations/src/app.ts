import express, { Express } from "express";
import cors from "cors";

import SampleRouter from "./routes/sample.route";

const PORT = 3100;

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes();
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();

    this.app.use("/api", sampleRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
