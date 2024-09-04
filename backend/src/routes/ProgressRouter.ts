import { Router } from "express";
import ProgressController from "../controller/ProgressController";
import ValidationProgress from "../middleware/ValidationProgress";

const progressRouter = Router();
const progressController = new ProgressController();

progressRouter.post('/:id', ValidationProgress.validateProgress,  (req, res) => progressController.post(req, res));

export default progressRouter;