import { Request, Response } from "express";
import { CaloriePlanService } from "../../service/caloriePlan/CaloriePlanService";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export class CaloriePlanController {
  private _CaloriePlanService = new CaloriePlanService();

  async get(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    try {
      const caloriePlans = await this._CaloriePlanService.getAll(userId);
      return res.status(200).json({ data: caloriePlans });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao buscar os planos de calorias do usuário.",
      });
    }
  }
}
