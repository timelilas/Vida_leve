import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Necessário para conexões seguras
      rejectUnauthorized: false // Se o certificado não for verificado
    }
  },
  logging: false
});

export default sequelize;
