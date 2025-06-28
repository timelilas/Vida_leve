import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpError } from "../../@core/errors/httpError";
import { ConnectionError } from "../../@core/errors/connectionError";
import {
  INTERNAL_SERVER_ERROR,
  NETWORK_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE
} from "../../constants/errorMessages";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 7000
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
        ...headers
      }
    });

    return { ...response, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorParams = error.response.data;
        let errorMessage = errorParams.error || INTERNAL_SERVER_ERROR;

        if (error.status && error.status === 401) {
          errorMessage = UNAUTHORIZED_ERROR_MESSAGE;
        }

        if (error.status && error.status >= 500) {
          errorMessage = INTERNAL_SERVER_ERROR;
        }

        throw new HttpError({
          field: errorParams.field,
          path: errorParams.path,
          timestamp: new Date(errorParams.timestamp),
          message: errorMessage,
          status: error.response.status
        });
      }

      throw new ConnectionError(NETWORK_ERROR_MESSAGE);
    }

    const unexpectedError = error;
    unexpectedError.details = error.message;
    unexpectedError.message = UNEXPECTED_ERROR_MESSAGE;

    throw unexpectedError;
  }
};
