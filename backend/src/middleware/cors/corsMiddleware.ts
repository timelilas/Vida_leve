import cors, { CorsOptions } from "cors";

export function setupCORS(options?: CorsOptions) {
  const origins = process.env.WEB_ORIGIN?.split(",");

  const defaultOptions: CorsOptions = {
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Timezone"],
    credentials: false,
    origin: origins?.length === 1 ? origins[0] : origins,
  };

  return cors({ ...defaultOptions, ...options });
}
