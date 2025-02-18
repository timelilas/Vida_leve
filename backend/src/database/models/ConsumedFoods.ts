import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { ConsumedFoodsEntity } from "../../@core/entity/ConsumedFoods/enitys";
import { TableNames } from "../constants";
import Food from "./Food";
import Meals from "./Meals";

class ConsumedFoods
    extends Model<InferAttributes<ConsumedFoods>, InferCreationAttributes<ConsumedFoods>>
    implements ConsumedFoodsEntity
{
    declare id: number
    declare mealId: number
    declare foodId: number
    declare quantity: number
    declare totalCalories: number

    public toJSON(): ConsumedFoodsEntity {
        const props = super.toJSON()
        return {
            id: props.id,
            mealId: props.mealId,
            foodId: props.foodId,
            quantity: props.quantity,
            totalCalories: props.totalCalories,
        }
    }
}

ConsumedFoods.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        mealId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        foodId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalCalories: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },

    {
        sequelize,
        tableName: TableNames.ConsumedFoods,
        timestamps: true,
        freezeTableName: true,
    }
)

Food.hasMany(ConsumedFoods, { foreignKey: "foodId" });
ConsumedFoods.belongsTo(Food, { foreignKey: "foodId" });

Meals.hasMany(ConsumedFoods, { foreignKey: "mealId" });
ConsumedFoods.belongsTo(Meals, { foreignKey: "mealId" });

export default ConsumedFoods