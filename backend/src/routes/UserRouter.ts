import { Router } from "express";
import UserController from "../controller/UserController";
import validateUser from "../middleware/ValidationCreate";

const userRouter = Router()
const userController = new UserController();

userRouter.get('/profile/all', (req, res) => userController.get(req, res));
userRouter.put('/profile/:id', validateUser.validateProfile, (req, res) => userController.put(req, res));
userRouter.delete('/delete/:id', (req, res) => userController.delete(req, res));

export default userRouter;