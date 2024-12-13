import { Request, Response } from "express";
import { CaloriePlanService } from "../../service/caloriePlan/CaloriePlanService";

export class CaloriePlanController {
  private _CaloriePlanService = new CaloriePlanService();

  async get(req: Request, res: Response) {
    const userId = req.user.id;
    try {
      const caloriePlans = await this._CaloriePlanService.getAll(userId);
      return res.status(200).json({ data: caloriePlans });
    } catch (error) {
      console.error("Server internal error:", error);

      return res.status(500).json({
        error: { field: null, message: "Erro ao buscar os planos do usuário." },
      });
    }
  }
}
