import { Router } from "express";
import ProgressController from "../controller/progress/ProgressController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import { createProgressSchema } from "../controller/progress/schemas";

const progressRouter = Router();
const progressController = new ProgressController();

progressRouter.post('/',
   authorizationMiddleware, 
   validationMiddleware(createProgressSchema),
   (req, res)=> progressController.post(req, res)
);

export default progressRouter;