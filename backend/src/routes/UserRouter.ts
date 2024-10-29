import { Router } from "express";
import UserController from "../controller/UserController";
import validateUser from "../middleware/ValidationCreate";
import { AuthController } from "../controller/AuthController";

const userRouter = Router()
const userController = new UserController();
const authController = new AuthController()

userRouter.get('/all', (req, res) => userController.get(req, res));
userRouter.post('/login', validateUser.validateLogin, (req, res) => authController.login(req, res));
userRouter.post('/create', validateUser.validateUser, (req, res) => userController.post(req, res));
userRouter.put('/profile/:id', validateUser.validateProfile, (req, res) => userController.put(req, res));
userRouter.delete('/delete/:id', (req, res) => userController.delete(req, res));

export default userRouter;