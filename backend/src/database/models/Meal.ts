import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { MealEntity } from "../../@core/entity/Meal/enitys"
import { allowedTypeMeal, TypeMeal  } from "../../@core/entity/@shared";
import { TableNames } from "../constants";
import User from "./User";

class Meal
    extends Model<InferAttributes<Meal>, InferCreationAttributes<Meal>>
    implements MealEntity
{
    declare id: CreationOptional<number>
    declare typeMeal: TypeMeal
    declare userId: number
    declare date: Date
    declare totalCalories: number
    
    public toJSON(): MealEntity {
        const props = super.toJSON()
        return {
        id: props.id,
        typeMeal: props.typeMeal,
        userId: props.userId,
        date: props.date,
        totalCalories: props.totalCalories,
        }
    }
}

Meal.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        typeMeal: {
            type: Sequelize.ENUM<TypeMeal>(...allowedTypeMeal),
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        totalCalories: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: TableNames.Meal,
        timestamps: true,
        freezeTableName: true,
    }
)

User.hasMany(Meal, { foreignKey: "userId" });
Meal.belongsTo(User, { foreignKey: "userId" });

export default Meal;