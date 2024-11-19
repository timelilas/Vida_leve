import { AxiosError } from "axios";
import { request } from "../libs/axios/Request";
import { FailedHttpResponse, HttpRequest, HttpResponse } from "./types";
import { failedConnectionError } from "./helpers";

export abstract class HttpService {
  protected async submit(req: HttpRequest): Promise<HttpResponse> {
    try {
      const res = await request(req.method, req.path, req.body);
      return { success: true, status: res.status, response: res.data };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as FailedHttpResponse | undefined;

      return {
        success: false,
        status: axiosError.status as number,
        error: data ? data.error : failedConnectionError(),
      };
    }
  }
}
