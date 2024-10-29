import { Router } from "express";
import validateUser from "../middleware/ValidationCreate";
import { AuthController } from "../controller/AuthController";

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/signup', validateUser.validateUser, (req, res)=> authController.signup(req,res));
authRouter.post('/login', validateUser.validateLogin, (req, res)=> authController.login(req,res));

export default authRouter