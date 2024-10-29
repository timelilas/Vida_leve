import { Router } from "express";
import ProgressController from "../controller/ProgressController";
import ValidationProgress from "../middleware/ValidationProgress";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";

const progressRouter = Router();
const progressController = new ProgressController();

progressRouter.post('/',
   authorizationMiddleware, 
   ValidationProgress.validateProgress, 
   (req, res)=> progressController.post(req, res)
);

export default progressRouter;