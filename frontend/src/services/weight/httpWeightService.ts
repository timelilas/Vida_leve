import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";
import { HttpService } from "../HttpService";
import { SecureStorage } from "../secureStorage/SecureStorage";
import {
  HttpAddWeightInputDTO,
  HttpAddWeightOutputDTO,
  HttpDeleteWeightInputDTO,
  HttpGetWeightHistoryInputDTO,
  HttpGetWeightHistoryOutputDTO
} from "./types";

export class HttpWeightHistoryService extends HttpService {
  public async getWeightHistory(params: HttpGetWeightHistoryInputDTO) {
    const { limit, offset } = params;
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpGetWeightHistoryOutputDTO>({
      method: "GET",
      path: `/weight-history?limit=${limit}&offset=${offset}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  public async deleteWeight(params: HttpDeleteWeightInputDTO) {
    const { id } = params;
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<void>({
      method: "DELETE",
      path: `/weight-history/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  public async addWeight(params: HttpAddWeightInputDTO) {
    const { date, weight } = params;
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpAddWeightOutputDTO>({
      method: "POST",
      path: "/weight-history",
      body: { date, weight },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
