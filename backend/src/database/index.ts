import { Sequelize } from "sequelize";
import sequelizeOptions = require("./config");

export const sequelize = new Sequelize(sequelizeOptions);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
