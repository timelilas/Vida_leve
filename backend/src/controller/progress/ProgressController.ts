import { Request, Response } from "express";
import ProgressService from "../../service/progress/ProgressService";

export default class ProgressController {
  private _ProgressService = new ProgressService();

  async post(req: Request, res: Response): Promise<Response> {
    const { height, weight, goalWeight, activityFrequency } = req.body;
    const { id: userId } = req.user;

    try {
      const createdProgress = await this._ProgressService.create({
        height,
        weight,
        goalWeight,
        activityFrequency,
        userId: Number(userId),
      });
      return res.status(200).json({ data: createdProgress });
    } catch (error) {
      console.error("Server internal error:", error);
      return res.status(500).json({ error: "Erro na criação do progresso." });
    }
  }
}
