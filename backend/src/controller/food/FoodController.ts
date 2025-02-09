import { Request, Response } from "express";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import FoodService from "../../service/food/FoodService";

export class FoodController {
  private _foodService = new FoodService();

  async getFoods(req: Request, res: Response): Promise<Response> {
    const query = req.query as {
      name?: string;
      limit?: number;
      offset?: number;
    };

    try {
      const foods = await this._foodService.get({
        filter: { name: query.name, limit: query.limit, offset: query.offset },
      });
      return res.status(200).json({ data: { foods, hasMore: false } });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao tentar buscar a lista de alimentos",
      });
    }
  }
}
