import { PlanHistoryEntity } from "../../@core/entity/plan-history/entity";
import PlanHistory from "../../database/models/PlanHistory";
import {
    PlanHistoryDTO
} from "./types";

export default class PlanHistoryService {
    public getById = async (id: number) => {
        try {
            const planHistory = await PlanHistory.findOne({
                where: { id },
                attributes: { exclude: ["userId"] }
            });

            return planHistory?.toJSON();
        } catch (error) {
            console.log(error);
            const message = `Ocorreu um erro durante a busca do histórico de plano com id: '${id}'`;
            throw new Error(message);
        }
    }

    public post = async (planHistory: PlanHistoryDTO) => {
        try {
            const createdPlanHistory = await PlanHistory.create(planHistory);
            return createdPlanHistory.toJSON();
        } catch (error) {
            console.log(error);
            const message = `Ocorreu um erro durante a criação do histórico de plano.`;
            throw new Error(message);
        }
    }

    public put = async (planHistory: PlanHistoryDTO) => {
        try {
            const updatedPlanHistory = await PlanHistory.update(planHistory, {
                where: { id: planHistory.userId },
                returning: true
            });
            return updatedPlanHistory[1][0].toJSON();
        } catch (error) {
            console.log(error);
            const message = `Ocorreu um erro durante a atualização do histórico de plano com id: '${planHistory.userId}'`;
            throw new Error(message);
        }
    }
}