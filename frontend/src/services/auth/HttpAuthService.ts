import { HttpResponse } from "../types";
import { HttpLoginDTO, HttpProfileFormnDTO, HttpSignupDTO } from "./types";
import { HttpService } from "../HttpService";

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

  public async profileForm(data: HttpProfileFormnDTO): Promise<HttpResponse> {
    return await this.submit({
      method: "PUT",
      path: "/user/profile",
      body: data,
    })
  }
}
