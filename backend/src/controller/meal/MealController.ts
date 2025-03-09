import { Request, Response } from "express";
import MealService from "../../service/Meal/MealService";

export default class MealController {
    private _mealService = new MealService();

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const meals = await this._mealService.getAll();
            return res.status(200).json({ data: meals });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}