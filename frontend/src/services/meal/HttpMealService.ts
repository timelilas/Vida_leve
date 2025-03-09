import { HttpService } from "../HttpService";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";
import { SecureStorage } from "../secureStorage/SecureStorage";
import {
  HttpCalorieConsumptionOutputDTO,
  HttpCreateMealInputDTO,
  HttpCreateMealOutputDTO,
} from "./types";

export class HttpMealService extends HttpService {
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
}
