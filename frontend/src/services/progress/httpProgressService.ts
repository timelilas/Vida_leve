import { PlanType } from "../../@core/entities/@shared/planType/type";
import { HttpService } from "../HttpService";
import { ProgressProps } from "../../@core/entities/progress/type";
import { HttpCreateProgressInputDTO } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";

export class HttpProgressService extends HttpService {
  public async createProgress(data: HttpCreateProgressInputDTO) {
    const token = await AsyncStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<ProgressProps>({
      method: "POST",
      path: "/progress",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public async setCaloriePlan(plan: PlanType) {
    const token = await AsyncStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<ProgressProps>({
      method: "PATCH",
      path: "/progress/plan",
      body: { currentCaloriePlan: plan },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
