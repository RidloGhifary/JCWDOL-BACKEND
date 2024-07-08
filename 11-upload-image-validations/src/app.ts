import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

import SampleRouter from "./routes/sample.route";

const PORT = 3100;

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Error ->", err.stack);
        res.status(500).send(err.message);
      }
    );
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
