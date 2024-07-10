import express, { Application, Request, Response, NextFunction } from 'express';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.get('/', (req: Request, res: Response) => res.json({ message: "Backend API is running" }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  }
}

export default new App().app;