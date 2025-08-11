import { PlanType } from "../../../@core/entities/@shared/planType/type";
import { HttpService } from "../../HttpService";
import { HttpProgressOutputDTO, HttpUpsertProgressInputDTO } from "./types";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";
import { secureStorage } from "../../common/secureStorage";

export class HttpProgressService extends HttpService {
  public async upsertProgress(params: HttpUpsertProgressInputDTO) {
    const accessToken = await secureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpProgressOutputDTO>({
      method: "POST",
      path: "/progress",
      body: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });
  }

  public async setCaloriePlan(plan: PlanType) {
    const accessToken = await secureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpProgressOutputDTO>({
      method: "PATCH",
      path: "/progress/plan",
      body: { currentCaloriePlan: plan },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });
  }

  public async getProgress() {
    const accessToken = await secureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpProgressOutputDTO | null>({
      method: "GET",
      path: "/progress",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
