"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('../config/dbConfig'); // Importar configurações do JSON
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(config);
exports.default = sequelize;
