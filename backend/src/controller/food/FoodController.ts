import { Request, Response } from "express";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import FoodService from "../../service/food/FoodService";
import { DEFAULT_FOOD_LIMIT } from "./constants";

export class FoodController {
  private _foodService = new FoodService();

  async getFoods(req: Request, res: Response): Promise<Response> {
    const query = req.query as {
      name?: string;
      limit?: number;
      offset?: number;
    };

    try {
      const { foods, hasMore } = await this._foodService.get({
        name: query.name,
        limit: query.limit || DEFAULT_FOOD_LIMIT,
        offset: query.offset,
      });
      return res.status(200).json({ data: { foods, hasMore } });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao na obtenção da lista de alimentos.",
      });
    }
  }
}
