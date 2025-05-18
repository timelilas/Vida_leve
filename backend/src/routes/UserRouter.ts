import { Router } from "express";
import UserController from "../controller/user/UserController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import { updateUserSchema } from "../controller/user/schemas";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/profile",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => userController.getById(req, res)
);

userRouter.put(
  "/profile",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(updateUserSchema, "body"),
  (req, res) => userController.update(req, res)
);

export default userRouter;
