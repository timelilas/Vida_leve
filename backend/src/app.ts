import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/UserRouter";
import progressRouter from "./routes/ProgressRouter";
import authRouter from "./routes/AuthRouter";
import caloriePlanRouter from "./routes/CaloriePlanRouter";
import helmet from "helmet";
import foodRouter from "./routes/FoodRouter";
import mealRouter from "./routes/MealRouter";
import planHistoryRouter from "./routes/PlanHistoryRouter";

class App {
  public app: Application = express();

  constructor() {
    this.config();
    this.routes();
    this.app.get("/", (req: Request, res: Response) =>
      res.json({ message: "Backend API is running" })
    );
  }

  private config(): void {
    const corsOptions: cors.CorsOptions = {
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Timezone"],
      credentials: false,
      origin: process.env.WEB_ORIGIN,
    };

    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
  }

  private routes(): void {
    this.app.use("/auth", authRouter);
    this.app.use("/users", userRouter);
    this.app.use("/progress", progressRouter);
    this.app.use("/plans", caloriePlanRouter);
    this.app.use("/foods", foodRouter);
    this.app.use("/meals", mealRouter);
    this.app.use("/history", planHistoryRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    );
  }
}

export default App;
