"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Progress_1 = __importDefault(require("../database/models/Progress"));
const User_1 = __importDefault(require("../database/models/User"));
class ProgressService {
    constructor() {
        this.post = async (altura, peso, meta, atividade, userId) => {
            try {
                const idUser = await User_1.default.findByPk(userId);
                if (!idUser) {
                    return { type: 404, message: { error: 'Usuario não logado' } };
                }
                await Progress_1.default.create({ altura, peso, meta, atividade, userId });
                return { type: 201, message: { message: 'Dados completos!' } };
            }
            catch (error) {
                console.error('Error logging in:', error);
                throw new Error('Error logging in');
            }
        };
    }
}
exports.default = ProgressService;
;
