"use strict";
exports.__esModule = true;

// Obtém a URL de conexão do banco de dados do ambiente
var DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/database';

var config = {
    url: DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Configure conforme necessário
        },
    },
    logging: false
};

module.exports = config;
