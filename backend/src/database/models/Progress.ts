import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import User from './User';

class Progress extends Model {
    public id!: number;
    public altura!: number;
    public peso!: number;
    public meta!: number;
    public atividade!: string;
    public userId!: number;
}

Progress.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        meta: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        atividade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Progress',
        tableName: 'Progress',
        timestamps: false,
        freezeTableName: true,
    }
);

User.hasMany(Progress, { foreignKey: 'userId', as: 'progresses' });
Progress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Progress;