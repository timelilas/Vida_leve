import Progress from "../../database/models/Progress";
import User from "../../database/models/User";
import { CreateProgressDTO } from "./types";

export default class ProgressService {
    public create = async (params: CreateProgressDTO) => {
        const {userId, meta, altura, atividade, peso} = params
        const idUser = await User.findByPk(userId)

        if (!idUser) {
            return { type: 404, message: { error: 'Usuário não logado' } };
        }

        const createdProgress = await Progress.create({ altura, peso, meta, atividade, userId });
        return { type: 201, message: { message: createdProgress.toJSON()} }
    }
};