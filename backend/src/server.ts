import App from './app';
import connectDB from './database'; // Certifique-se de que o caminho está correto

// Defina a porta do servidor
const PORT = process.env.PORT || 3000;

// Inicialize a conexão com o banco de dados
connectDB();

// Inicialize e inicie o servidor
const appInstance = new App();
appInstance.start(PORT);
