import { Router } from "express";
import UserController from "../controller/UserController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";

const userRouter = Router()
const userController = new UserController();

userRouter.put('/profile/', authorizationMiddleware, (req, res)=>userController.put(req, res));

//Rotas utilizada em desenvolvimento apenas. Não requerem autorização
userRouter.get('/profile/all', (req, res)=>userController.getAll(req, res));
userRouter.delete('/delete/:id', (req, res)=>userController.delete(req, res));

export default userRouter;