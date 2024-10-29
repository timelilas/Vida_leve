import Progress from "../../database/models/Progress";
import User from "../../database/models/User";
import { CreateProgressDTO } from "./types";

export default class ProgressService {
    public create = async (params: CreateProgressDTO) => {
        const {userId, meta, altura, atividade, peso} = params

        const createdProgress = await Progress.create({ altura, peso, meta, atividade, userId});
        return createdProgress.toJSON()
    }
};