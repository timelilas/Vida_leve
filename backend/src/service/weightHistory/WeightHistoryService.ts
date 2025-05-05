import WeightHistory from "../../database/models/WeightHistory";
import { WeightHistoryDTO } from "./types";

export default class WeightHistoryService {
    public getById = async (id: number) => {
        try {
            const weightHistory = await WeightHistory.findAll({
                where: { userId: id },
                attributes: { exclude: ["userId"] },
            });

            return weightHistory?.map((wh) => wh.toJSON());
        } catch (error) {
            console.log(error);
            const message = `Ocorreu um erro durante a busca do histórico de peso com id: '${id}'`;
            throw new Error(message);
        }
    };

    public getByDate = async (id: number, date: string) => {
        try {
          const weightHistory = await WeightHistory.findOne({
            where: { userId: id, date },
            attributes: { exclude: ["userId"] },
          });
    
          return weightHistory?.toJSON();
        } catch (error) {
          console.log(error);
          const message = `Ocorreu um erro durante a busca do histórico de peso com id: '${id}'`;
          throw new Error(message);
        }
    };

    public post = async (weightHistory: WeightHistoryDTO) => {
        try {
            const date = weightHistory.date.toISOString().split("T")[0];
            const createdWeightHistory = await WeightHistory.create(
                { ...weightHistory, date },
                {}
            );

            const newData = {
                weight: createdWeightHistory.weight,
                date: createdWeightHistory.date,
            }

            return newData
        } catch (error) {
            console.log(error);
            const message = `Ocorreu um erro durante a criação do histórico de peso.`;
            throw new Error(message);
        }
    };

    public put = async (weightHistory: WeightHistoryDTO) => {
        const exist = await WeightHistory.findOne({
          where: { userId: weightHistory.userId, date: weightHistory.date },
        });
    
        if (!exist) {
          throw new Error(
            `Histórico de peso com id: '${weightHistory.userId}' não encontrado.`
          );
        }
        try {
          const date = weightHistory.date.toISOString().split("T")[0];
          const updatedWeightHistory = await WeightHistory.update(
            { ...weightHistory, date },
            {
              where: { userId: weightHistory.userId, date: weightHistory.date },
              returning: true,
            }
          );
    
          const newData = {
            weight: updatedWeightHistory[1][0].weight,
            date: updatedWeightHistory[1][0].date,
          };

          return newData;
        } catch (error) {
          console.log(error);
          const message = `Ocorreu um erro durante a atualização do histórico de peso com id: '${weightHistory.userId}'`;
          throw new Error(message);
        }
    };
}