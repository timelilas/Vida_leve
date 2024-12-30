import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpError } from "../../@core/errors/httpError";
import { ConnectionError } from "../../@core/errors/connectionError";
import {
  INTERNAL_SERVER_ERROR,
  UNEXPECTED_ERROR_MESSAGE,
} from "../../constants/errorMessages";

const api = axios.create({
  // baseURL: "http://192.168.0.117:3000",
  // baseURL: "http://localhost:3000/",
  baseURL: "https://vida-leve-h7ug.onrender.com",
  timeout: 5000,
});

export const request = async <T>(
  method: string,
  endpoint: string,
  data?: object,
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    return { ...response, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorParams = error.response.data;

        const errorMessage =
          error.status && error.status >= 500
            ? INTERNAL_SERVER_ERROR
            : errorParams.error;

        throw new HttpError({
          field: errorParams.field,
          path: errorParams.path,
          timestamp: new Date(errorParams.timestamp),
          message: errorMessage,
          status: error.response.status,
        });
      }

      throw new ConnectionError(
        "Falha na conexão, tente novamente mais tarde."
      );
    }

    const unexpectedError = error;
    unexpectedError.details = error.message;
    unexpectedError.message = UNEXPECTED_ERROR_MESSAGE;

    throw unexpectedError;
  }
};
