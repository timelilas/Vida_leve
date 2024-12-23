import express, { Application, Request, Response } from "express";
import userRouter from "./routes/UserRouter";
import progressRouter from "./routes/ProgressRouter";
import authRouter from "./routes/AuthRouter";
import caloriePlanRouter from "./routes/CaloriePlanRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.get("/", (req: Request, res: Response) =>
      res.json({ message: "Backend API is running" })
    );
  }

  private config(): void {
    const accessControl: express.RequestHandler = (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");

      if (req.method === "OPTIONS") {
        return res.end();
      }

      return next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use("/progress", progressRouter);
    this.app.use("/plans", caloriePlanRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    );
  }
}

export default App;
