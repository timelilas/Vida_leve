import { PlanType } from "../../@core/entities/@shared/planType/type";
import { HttpService } from "../HttpService";
import { ProgressProps } from "../../@core/entities/progress/type";
import { HttpUpsertProgressInputDTO } from "./types";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";
import { SecureStorage } from "../secureStorage/SecureStorage";

export class HttpProgressService extends HttpService {
  public async upsertProgress(params: HttpUpsertProgressInputDTO) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<ProgressProps>({
      method: "POST",
      path: "/progress",
      body: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async setCaloriePlan(plan: PlanType) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<ProgressProps>({
      method: "PATCH",
      path: "/progress/plan",
      body: { currentCaloriePlan: plan },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async getProgress() {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<ProgressProps | null>({
      method: "GET",
      path: "/progress",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
