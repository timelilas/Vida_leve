import axios, { AxiosResponse } from "axios";

const api = axios.create({
<<<<<<< HEAD:frontend/src/services/Request.tsx
    baseURL: "http://localhost:3000",
//   baseURL: "https://vida-leve-h7ug.onrender.com",
=======
  // baseURL: "http://192.168.0.120:3000",
  baseURL: "http://localhost:3000/",
  // baseURL: "https://vida-leve-h7ug.onrender.com",
>>>>>>> 806a64f524c86d89c4442b245c1454c11df8d229:frontend/src/libs/axios/Request.ts
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
