import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { db } from '../index';
import User from './User';
import Sequelize from 'sequelize';

class Progress extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>>{
    declare id: CreationOptional<number>;
    declare userId: number;
    declare altura: number;
    declare peso: number;
    declare meta: number | null;
    declare atividade: string | null;
}

Progress.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        altura: {
            type: Sequelize.DECIMAL(3, 2),
            allowNull: false,
        },
        peso: {
            type: Sequelize.SMALLINT,
            allowNull: false,
        },
        meta: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        atividade: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
        },
    },
    {
        sequelize: db,
        tableName: 'progress',
        timestamps: false,
        freezeTableName: true,
    }
);

User.hasMany(Progress, { foreignKey: 'userId'});
Progress.belongsTo(User, { foreignKey: 'userId'});

export default Progress;