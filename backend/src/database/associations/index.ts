import User from "../models/User";
import Food from "../models/Food";
import Meal from "../models/Meal";
import Progress from "../models/Progress";
import CaloriePlan from "../models/CaloriePlan";
import ConsumedFood from "../models/ConsumedFood";
import PlanHistory from "../models/PlanHistory";

User.hasOne(Progress, { foreignKey: "userId" });
Progress.belongsTo(User, { foreignKey: "userId" });

User.hasMany(CaloriePlan, { foreignKey: "userId" });
CaloriePlan.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Meal, { foreignKey: "userId" });
Meal.belongsTo(User, { foreignKey: "userId" });

Meal.belongsToMany(Food, { through: ConsumedFood, foreignKey: "mealId" });
Meal.hasMany(ConsumedFood, { foreignKey: "mealId" });
ConsumedFood.belongsTo(Meal, { foreignKey: "mealId" });

Food.belongsToMany(Meal, { through: ConsumedFood, foreignKey: "foodId" });
Food.hasMany(ConsumedFood, { foreignKey: "foodId" });
ConsumedFood.belongsTo(Food, { foreignKey: "foodId" });

User.hasMany(PlanHistory, { foreignKey: "userId" });
PlanHistory.belongsTo(User, { foreignKey: "userId" });

export { User, Food, Meal, Progress, CaloriePlan, ConsumedFood, PlanHistory };
