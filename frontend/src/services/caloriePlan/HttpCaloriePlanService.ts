import { HttpService } from "../HttpService";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";
import { SecureStorage } from "../secureStorage/SecureStorage";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";

export class HttpCaloriePlanService extends HttpService {
  public async getPlans() {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<CaloriePlanProps[]>({
      method: "GET",
      path: "/plans",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
