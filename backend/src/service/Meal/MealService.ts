import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import Meals from "../../database/models/Meal";

export default class MealService {
    public getAll = async () => {
        console.log("Meals Service");
        try {
            const meals = await Meals.findAll();
            console.log("Meals Service OK", meals);
            return meals;
        } catch (error: any) {
            console.log("Meals Service", error);
            throw new DatabaseException(
                `Erro na busca de todas as refeições.`,
                MealService.name,
                error.message
            );
        }
    }
}