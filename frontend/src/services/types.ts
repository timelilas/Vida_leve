import { AxiosRequestConfig } from "axios";

export interface HttpRequest {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: AxiosRequestConfig["headers"];
  body?: Record<string, any>;
}
