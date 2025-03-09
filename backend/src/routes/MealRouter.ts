import { Router } from "express";
import MealController from "../controller/meal/MealController";

const mealRouter = Router();
const mealController = new MealController();

mealRouter.get("/", (req, res) => mealController.getAll(req, res));

export default mealRouter;
