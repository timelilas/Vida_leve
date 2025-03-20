import { Request, Response } from "express";
import PlanHistoryService from "../../service/PlanHistory/PlanHistoryService";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export default class PlanHistoryController {
    private _planHistoryService = new PlanHistoryService();

    async get (req: Request, res: Response): Promise<Response> {
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

    async post (req: Request, res: Response): Promise<Response> {
        const { dailyCalorieIntake, PlanType, date } = req.body;
        const { id } = req.user;
        
        try {
            const plan = await this._planHistoryService.post({ dailyCalorieIntake, date, PlanType, userId: id });
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

    async put (req: Request, res: Response): Promise<Response> {
        const { dailyCalorieIntake, PlanType, date } = req.body;
        const { id } = req.user;

        try {
            const plan = await this._planHistoryService.put({ dailyCalorieIntake, date, PlanType, userId: id });
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