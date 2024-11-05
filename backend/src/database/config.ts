import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do arquivo .env

const sequelize = new Sequelize(process.env.SERVER_PORT as string, {
  dialect: 'postgres', // Certifique-se de especificar o dialecto
  dialectOptions: {
    ssl: {
      require: true, // Habilita SSL
      rejectUnauthorized: false // Pode ser necessário dependendo do ambiente
    }
  },
  logging: false, // Desativa o log das consultas SQL no console
});
export default sequelize;