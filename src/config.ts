import { AppConfig } from "./types/AppConfig";

export const config: AppConfig = {
  root: {
    port: Number(process.env.PORT),
    env: process.env.NODE_ENV as string
  },
  cors: {
    origin: process.env.CORS_ORIGIN as string
  },
  db: {
    url: process.env.DB_URL as string
  },
  jwt: {
    secret: process.env.JWT_SECRET as string
  }
};
