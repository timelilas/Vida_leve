import { FailedHttpResponse } from "./types";

export function failedConnectionError(): FailedHttpResponse["error"] {
  return {
    field: "connection",
    message:
      "Ops! Parece que houve uma falha na conexão, tente novamente mais tarde.",
  };
}
