import { Request, Response } from "express";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import WeightHistoryService from "../../service/weightHistory/WeightHistoryService";

export default class WeightHistoryController {
    private _weightHistoryService = new WeightHistoryService();

    async get (req: Request, res: Response): Promise<Response> {
        try {
            const plans = await this._weightHistoryService.getById(req.user.id);
            return res.status(200).json({ data: plans });
        } catch (error: any) {
            return exceptionResponseAdapter({
                req,
                res,
                exception: error,
                alternativeMsg: "Erro ao obter a lista de peso.",
            });
        }
    }

    async getByDate (req: Request, res: Response): Promise<Response> {
        const { date } = req.params;
        const { id } = req.user;

        try {
            const plan = await this._weightHistoryService.getByDate(id, date);
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

    async post (req: Request, res: Response): Promise<Response> {
        const { weight, date } = req.body;
        const { id } = req.user;
        
        try {
            const plan = await this._weightHistoryService.post({ weight, date, userId: id });
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
        const { weight, date } = req.body;
        const { id } = req.user;

        try {
            const plan = await this._weightHistoryService.put({ weight, date, userId: id });
            
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