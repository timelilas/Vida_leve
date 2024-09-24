"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../database/models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_1 = require("../utils/JWT");
class UserService {
    constructor() {
        this.post = async (userName, email, senha) => {
            try {
                senha = await bcryptjs_1.default.hash(senha, 10);
                const user = await User_1.default.create({ userName, email, senha });
                return { type: 201, message: { message: user.id } };
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Error creating user');
            }
        };
        this.login = async (email, senha) => {
            try {
                const user = await User_1.default.findOne({ where: { email } });
                if (!user || !user.senha) {
                    return { type: 401, message: { error: 'Usuário ou senha incorretos' } };
                }
                const senhaassword = await bcryptjs_1.default.compare(senha, user.senha);
                if (!senhaassword) {
                    return { type: 401, message: { error: 'Senha incorreta' } };
                }
                const token = (0, JWT_1.generateToken)({ id: user.id, email: user.email, senha: user.senha });
                return { type: 200, message: { id: user.dataValues.id, message: token } };
            }
            catch (error) {
                console.error('Error logging in:', error);
                throw new Error('Error logging in');
            }
        };
        this.put = async (id, userName, telefone, aniversario, sexo) => {
            try {
                const idUser = await User_1.default.findByPk(id);
                if (!idUser) {
                    return { type: 404, message: { error: 'Usuario não logado' } };
                }
                await User_1.default.update({
                    userName: userName ?? idUser.userName,
                    telefone: telefone ?? idUser.telefone,
                    aniversario: aniversario ?? idUser.aniversario,
                    sexo: sexo ?? idUser.sexo,
                }, { where: { id } });
                return { type: 200, message: { message: 'Dados completado com sucesso' } };
            }
            catch (error) {
                console.error('Error logging in:', error);
                throw new Error('Error logging in');
            }
        };
    }
}
exports.default = UserService;
