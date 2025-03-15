import {
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { TableNames } from "../constants";
import Meal from "./Meal";
import Food from "./Food";

class ConsumedFood extends Model<
  InferAttributes<ConsumedFood>,
  InferCreationAttributes<ConsumedFood>
> {
  declare mealId: ForeignKey<Meal["id"]>;
  declare foodId: ForeignKey<Food["id"]>;
  declare quantity: number;
  declare position: number;

  public toJSON() {
    const props = super.toJSON();
    return props;
  }
}

ConsumedFood.init(
  {
    mealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    foodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: TableNames.ConsumedFood,
    timestamps: false,
    freezeTableName: true,
  }
);

export default ConsumedFood;
