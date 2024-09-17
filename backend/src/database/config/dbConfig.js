"use strict";
exports.__esModule = true;
var config = {
  url: process.env.DATABASE_URL || 'postgresql://localhost:5432/database',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Necessário para conexões seguras
      rejectUnauthorized: false // Se o certificado não for verificado
    }
  },
  logging: false
};
module.exports = config;
