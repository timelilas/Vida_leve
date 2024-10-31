import { Sequelize } from 'sequelize';
import options from './config';
import * as dotenv from 'dotenv';

dotenv.config()

export const db = new Sequelize(options)

export const connectDB = async () => {
  try {
    await db.authenticate();
    //Sincroniza o banco de dados a cada alteração feita nos schemas
    //apenas em desenvolvimento
    if(process.env.NODE_ENV === "development"){
      await db.sync({alter: true})
    }
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
