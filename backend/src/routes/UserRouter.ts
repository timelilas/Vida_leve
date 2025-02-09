import { Request, Response, Router } from "express";
import UserController from "../controller/user/UserController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import { updateUserSchema } from "../controller/user/schemas";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/profile",
  authorizationMiddleware,
  (req: Request, res: Response) => userController.getById(req, res)
);

userRouter.put(
  "/profile",
  authorizationMiddleware,
  validationMiddleware(updateUserSchema, "body"),
  (req, res) => userController.update(req, res)
);

//Rotas utilizada em desenvolvimento apenas. Não requerem autorização
userRouter.get("/profile/all", (req, res) => userController.getAll(req, res));
userRouter.delete("/:id", (req, res) => userController.delete(req, res));

export default userRouter;
