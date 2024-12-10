import { HttpResponse } from "../types";
import {
  HttpLoginDTO,
  HttpCreateProgressDTO,
  HttpUpdateProfileDTO,
  HttpSignupDTO,
} from "./types";
import { HttpService } from "../HttpService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class HttpAuthService extends HttpService {
  public async signup(data: HttpSignupDTO): Promise<HttpResponse> {
    return await this.submit({
      method: "POST",
      path: "/auth/signup",
      body: data,
    });
  }

  public async login(data: HttpLoginDTO): Promise<HttpResponse> {
    return await this.submit({
      method: "POST",
      path: "/auth/login",
      body: data,
    });
  }

  public async updateProfile(
    data: HttpUpdateProfileDTO
  ): Promise<HttpResponse> {
    const token = await AsyncStorage.getItem("token");

    return await this.submit({
      method: "PUT",
      path: "/user/profile",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async createProgress(
    data: HttpCreateProgressDTO
  ): Promise<HttpResponse> {
    const token = await AsyncStorage.getItem("token");

    return await this.submit({
      method: "POST",
      path: "/progress",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
