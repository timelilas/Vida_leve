import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { ProgressEntity } from '../../entity/ProgressEntity';
import { sequelize } from '../config';
import User from './User';
import Sequelize from 'sequelize';

class Progress extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>> implements ProgressEntity{
    declare id: CreationOptional<number>;
    declare userId: number;
    declare altura: number;
    declare peso: number;
    declare meta: number;
    declare atividade: string;

    public toJSON(): Omit<ProgressEntity, "userId">{
        const {id, altura, atividade, meta, peso} = super.get()  
        return {id, altura, atividade, meta, peso}
    }
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
            type: Sequelize.SMALLINT,
            allowNull: false,
        },
        atividade: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
        },
    },
    {
        sequelize,
        tableName: 'progress',
        timestamps: false,
        freezeTableName: true,
    }
);

User.hasMany(Progress, { foreignKey: 'userId'});
Progress.belongsTo(User, { foreignKey: 'userId'});

export default Progress;