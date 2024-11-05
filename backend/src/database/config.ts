import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do arquivo .env

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});