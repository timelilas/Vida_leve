const config = require('../config/dbConfig'); // Importar configurações do JSON

import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(config);

export default sequelize;