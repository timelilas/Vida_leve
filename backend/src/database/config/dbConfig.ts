import { Sequelize } from 'sequelize';

// Obtém a URL de conexão do banco de dados do ambiente
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/database';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Configure conforme necessário
    },
  },
});

export default sequelize;
