"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const User_1 = __importDefault(require("./User"));
class Progress extends sequelize_1.Model {
}
Progress.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    altura: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    peso: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    meta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    atividade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: _1.default,
    modelName: 'Progress',
    tableName: 'Progress',
    timestamps: false,
    freezeTableName: true,
});
User_1.default.hasMany(Progress, { foreignKey: 'userId', as: 'progresses' });
Progress.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
exports.default = Progress;
