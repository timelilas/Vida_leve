import { Request, Response } from "express";
import MealService from "../../service/meal/MealService";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export default class MealController {
  private _mealService = new MealService();

  async createMeal(req: Request, res: Response): Promise<Response> {
    const { date, mealType, foods } = req.body;

    try {
      const cratedMeal = await this._mealService.create({
        userId: req.user.id,
        date: new Date(date),
        mealType,
        foods,
      });

      return res.status(200).json({ data: cratedMeal });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante a criação da refeição",
      });
    }
  }

  async getCalorieConsumption(req: Request, res: Response) {
    const date = req.params.date;
    const userId = req.user.id;

    try {
      const dailyCalorieConsumption =
        await this._mealService.getCalorieConsumption({
          date: new Date(date),
          userId,
        });
      return res.status(200).json({ data: dailyCalorieConsumption });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao obter o consumo de calorias diário",
      });
    }
  }
}
