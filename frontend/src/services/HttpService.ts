import { AxiosResponse } from "axios";
import { request } from "../libs/axios/Request";
import { HttpRequest } from "./types";

export abstract class HttpService {
  protected async submit<T>(req: HttpRequest): Promise<AxiosResponse<T>> {
    const response = await request<T>(req.method, req.path, req.body, req.headers);
    return response;
  }
}
