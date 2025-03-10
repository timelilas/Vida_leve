import { Router } from "express";
import MealController from "../controller/meal/MealController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import { createMealSchema } from "../controller/meal/schemas";

const mealRouter = Router();
const mealController = new MealController();

mealRouter.post(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(createMealSchema, "body"),
  (req, res) => mealController.createMeal(req, res)
);

export default mealRouter;
