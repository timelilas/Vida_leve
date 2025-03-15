import { HttpService } from "../HttpService";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";
import { SecureStorage } from "../secureStorage/SecureStorage";
import {
  HttpCalorieConsumptionOutputDTO,
  HttpCreateMealInputDTO,
  HttpCreateMealOutputDTO,
  HttpGetMealsOutputDTO,
  HttpUpdateMealInputDTO,
  HttpUpdateMealOutputDTO,
} from "./types";

export class HttpMealService extends HttpService {
  public async getMeals(date: string) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpGetMealsOutputDTO>({
      method: "GET",
      path: `/meals?date=${date}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async createMeal(params: HttpCreateMealInputDTO) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpCreateMealOutputDTO>({
      method: "POST",
      path: "/meals",
      body: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async getDailyCalorieConsumption(date: string) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpCalorieConsumptionOutputDTO>({
      method: "GET",
      path: `/meals/calorie-consumption/${date}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async updateMeal(params: HttpUpdateMealInputDTO) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpUpdateMealOutputDTO>({
      method: "PUT",
      path: `/meals/${params.id}`,
      body: { foods: params.foods },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
