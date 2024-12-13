import {
  HttpLoginInputDTO,
  HttpLoginOutputDTO,
  HttpUpdateProfileInputDTO,
  HttpUpdateProfileOutputDTO,
  HttpSignupInputDTO,
  HttpSignupOutputDTO,
  HttpCreateProgressInputDTO,
} from "./types";
import { HttpService } from "../HttpService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressProps } from "../../@core/entities/progress/progress";

export class HttpAuthService extends HttpService {
  public async signup(data: HttpSignupInputDTO) {
    return await this.submit<HttpSignupOutputDTO>({
      method: "POST",
      path: "/auth/signup",
      body: data,
    });
  }

  public async login(data: HttpLoginInputDTO) {
    return await this.submit<HttpLoginOutputDTO>({
      method: "POST",
      path: "/auth/login",
      body: data,
    });
  }

  public async updateProfile(data: HttpUpdateProfileInputDTO) {
    const token = await AsyncStorage.getItem("token");
    return await this.submit<HttpUpdateProfileOutputDTO>({
      method: "PUT",
      path: "/user/profile",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async createProgress(data: HttpCreateProgressInputDTO) {
    const token = await AsyncStorage.getItem("token");

    return await this.submit<ProgressProps>({
      method: "POST",
      path: "/progress",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
