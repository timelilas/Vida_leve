"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    constructor() {
        this._userService = new UserService_1.default();
    }
    async post(req, res) {
        const { userName, email, senha } = req.body;
        try {
            const { type, message } = await this._userService.post(userName || '', email, senha);
            return res.status(type).json(message);
        }
        catch (error) {
            console.error('Error in UserController:', error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }
    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const { type, message } = await this._userService.login(email, senha);
            return res.status(type).json(message);
        }
        catch (error) {
            console.error('Error in UserController:', error);
            return res.status(500).json({ error: 'Error logging in' });
        }
    }
    async put(req, res) {
        const { userName, telefone, aniversario, sexo } = req.body;
        const { id } = req.params;
        try {
            const { type, message } = await this._userService.put(Number(id), userName, telefone, aniversario, sexo);
            return res.status(type).json(message);
        }
        catch (error) {
            console.error('Error in UserController:', error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }
}
exports.default = UserController;
