"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    aniversario: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    sexo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize: _1.default,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
    freezeTableName: true,
});
exports.default = User;
