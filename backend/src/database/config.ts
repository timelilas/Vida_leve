import { Options } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config(); // Carrega variáveis do arquivo .env

const sequelizeOptions: Options = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: "postgres", // Certifique-se de especificar o dialecto
  dialectOptions: {
    pgbouncer: true,
    ssl: {
      require: true, // Habilita SSL
      rejectUnauthorized: false, // Pode ser necessário dependendo do ambiente
    },
  },
  logging: false, // Desativa o log das consultas SQL no console
};

export = sequelizeOptions;
