import {
  HttpLoginInputDTO,
  HttpLoginOutputDTO,
  HttpSignupInputDTO,
  HttpSignupOutputDTO
} from "./types";
import { HttpService } from "../../HttpService";

export class HttpAuthService extends HttpService {
  public async signup(data: HttpSignupInputDTO) {
    return await this.submit<HttpSignupOutputDTO>({
      method: "POST",
      path: "/auth/signup",
      body: data
    });
  }

  public async login(data: HttpLoginInputDTO) {
    return await this.submit<HttpLoginOutputDTO>({
      method: "POST",
      path: "/auth/login",
      body: data
    });
  }
}
