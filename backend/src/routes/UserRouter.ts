import { Router } from "express";
import UserController from "../controller/UserController";
import validateUser from "../middleware/ValidationCreate";
import errorHandler from "../middleware/ErroHandle";

const userRouter = Router()
const userController = new UserController();

userRouter.post('/create', validateUser.validateUser, (req, res) => userController.post(req, res))
userRouter.post('/', validateUser.validateLogin, (req, res) => userController.login(req, res))

export default userRouter;