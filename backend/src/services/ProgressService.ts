import Progress from "../database/models/Progress";
import User from "../database/models/User"

export default class ProgressService {
    public post = async (altura: number, peso: number, meta:number, atividade: string, userId: number) => {
        try {
            const idUser = await User.findByPk(userId)

            if (!idUser) {
                return { type: 404, message: { error: 'Usuario não logado' } };
            }

            await Progress.create({ altura, peso, meta, atividade, userId });
            return { type: 201, message: { message: 'Dados '} }
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Error logging in');
        }
    }
}