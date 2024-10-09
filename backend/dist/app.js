"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet")); // Segurança
const cors_1 = __importDefault(require("cors")); // Controle de acesso entre origens
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)()); // Adiciona cabeçalhos de segurança
app.use((0, cors_1.default)()); // Permite CORS
app.use(express_1.default.json()); // Faz o parsing do corpo da requisição em JSON
// Roteamento
// Importar e usar rotas
// import userRoutes from './routes/userRoutes';
// app.use('/api/users', userRoutes);
// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Rota de teste
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
