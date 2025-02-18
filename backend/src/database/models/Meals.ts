import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { MealsEntity } from "../../@core/entity/Meals/enitys"
import { allowedTypeMeals, TypeMeal  } from "../../@core/entity/@shared";
import { TableNames } from "../constants";

class Meals
    extends Model<InferAttributes<Meals>, InferCreationAttributes<Meals>>
    implements MealsEntity
{
    declare id: CreationOptional<number>
    declare typeMeals: TypeMeal
    declare userId: number
    declare date: Date
    
    public toJSON(): MealsEntity {
        const props = super.toJSON()
        return {
        id: props.id,
        typeMeals: props.typeMeals,
        userId: props.userId,
        date: props.date,
        }
    }
}

Meals.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        typeMeals: {
            type: Sequelize.ENUM<TypeMeal>(...allowedTypeMeals),
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
    },
    {
        sequelize,
        tableName: TableNames.Meal,
        timestamps: true,
        freezeTableName: true,
    }
)

export default Meals;