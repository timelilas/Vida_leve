import App from './app';
import { connectDB } from './database/index'; // Certifique-se de que o caminho está correto

// Defina a porta do servidor
const PORT = process.env.SERVER_PORT || 3000;

// Inicialize e inicie o servidor
const appInstance = new App();

// Inicialize a conexão com o banco de dados e o servidor
connectDB().then(()=>appInstance.start(PORT));

