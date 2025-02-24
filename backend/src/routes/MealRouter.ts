import { Router } from "express";
import MealController from "../controller/Meal/MealController";

const mealRouter = Router();
const mealController = new MealController();

mealRouter.get("/", (req, res) => mealController.getAll(req, res));

export default mealRouter;