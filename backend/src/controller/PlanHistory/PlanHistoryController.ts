import { Request, Response } from "express";
import PlanHistoryService from "../../service/planHistory/PlanHistoryService";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export default class PlanHistoryController {
  private _planHistoryService = new PlanHistoryService();

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await this._planHistoryService.getById(req.user.id);
      return res.status(200).json({ data: plans });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao obter a lista de planos.",
      });
    }
  }

  async getByDate(req: Request, res: Response): Promise<Response> {
    const { date } = req.params;
    const { id } = req.user;

    try {
      const plan = await this._planHistoryService.getByDate(id, date);
      return res.status(200).json({ data: plan });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao obter o plano.",
      });
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    const { dailyCalorieIntake, planType, date, strategy } = req.body;
    const { id } = req.user;

    try {
      const plan = await this._planHistoryService.post({
        dailyCalorieIntake,
        strategy,
        date,
        planType,
        userId: id,
      });
      return res.status(201).json({ data: plan });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao criar um novo plano.",
      });
    }
  }

  async put(req: Request, res: Response): Promise<Response> {
    const { dailyCalorieIntake, planType, date, strategy } = req.body;
    const { id } = req.user;

    try {
      const plan = await this._planHistoryService.put({
        dailyCalorieIntake,
        strategy,
        date,
        planType,
        userId: id,
      });

      return res.status(200).json({ data: plan });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao atualizar o plano.",
      });
    }
  }
}
