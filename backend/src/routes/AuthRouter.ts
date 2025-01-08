import { Router } from "express";
import { AuthController } from "../controller/auth/AuthController";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import { loginSchema, signupSchema } from "../controller/auth/schemas";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/signup", validationMiddleware(signupSchema), (req, res) =>
  authController.signup(req, res)
);

authRouter.post("/login", validationMiddleware(loginSchema), (req, res) =>
  authController.login(req, res)
);

export default authRouter;
