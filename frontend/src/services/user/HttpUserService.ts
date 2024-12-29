import { HttpUpdateProfileInputDTO, HttpUpdateProfileOutputDTO } from "./types";
import { HttpService } from "../HttpService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";

export class HttpUserService extends HttpService {
  public async updateProfile(data: HttpUpdateProfileInputDTO) {
    const token = await AsyncStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpUpdateProfileOutputDTO>({
      method: "PUT",
      path: "/user/profile",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
