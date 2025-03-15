import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  Association,
} from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { MealEntity } from "../../@core/entity/meal/enitys";
import { allowedTypeMeals, TypeMeal } from "../../@core/entity/@shared";
import { TableNames } from "../constants";
import ConsumedFood from "./ConsumedFood";
import User from "./User";

class Meal
  extends Model<InferAttributes<Meal>, InferCreationAttributes<Meal>>
  implements Pick<MealEntity, "id" | "type">
{
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare type: TypeMeal;
  declare date: string;
  declare foods?: NonAttribute<ConsumedFood[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    foods: Association<Meal, ConsumedFood>;
  };

  public toJSON(): MealEntity {
    const props = super.toJSON();
    return {
      id: props.id,
      type: props.type,
      date: new Date(props.date),
      foods: [],
    };
  }
}

Meal.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM<TypeMeal>(...allowedTypeMeals),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE(),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE(),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: TableNames.Meal,
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        fields: ["date", "type"],
        unique: true,
        using: "BTREE",
      },
    ],
  }
);

export default Meal;
