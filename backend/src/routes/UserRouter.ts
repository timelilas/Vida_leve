import { Router } from "express";
import UserController from "../controller/UserController";
import validateUser from "../middleware/ValidationCreate";
import errorHandler from "../middleware/ErroHandle";

const userRouter = Router()
const userController = new UserController();

userRouter.get('/all', (req, res) => userController.get(req, res));
userRouter.post('/login', validateUser.validateLogin, (req, res) => userController.login(req, res));
userRouter.post('/create', validateUser.validateUser, (req, res) => userController.post(req, res));
userRouter.put('/profile/:id', validateUser.validateProfile, (req, res) => userController.put(req, res));

export default userRouter;