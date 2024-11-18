import { AxiosRequestConfig } from "axios";

export interface SuccessHttpResponse {
  status: number;
  success: true;
  response: { data: Record<string, any> };
}

export interface FailedHttpResponse {
  status: number;
  success: false;
  error: { field: string | null; message: string };
}

export type HttpResponse = SuccessHttpResponse | FailedHttpResponse;

export interface HttpRequest {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: AxiosRequestConfig["headers"];
  body?: Record<string, any>;
}
