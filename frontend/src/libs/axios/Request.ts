import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.120:3000",
  // baseURL: "https://vida-leve-h7ug.onrender.com",
  timeout: 5000,
});

export const request = async (
  method: string,
  endpoint: string,
  data?: object
): Promise<AxiosResponse> => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Erro ao fazer ${method.toUpperCase()} na rota ${endpoint}:`,
      error
    );
    throw error;
  }
};