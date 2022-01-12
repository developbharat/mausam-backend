import { Response, Request } from "express";

declare global {
  interface ExpressContext {
    req: Request;
    res: Response;
  }
}

declare module "express-session" {
  interface SessionData {
    user_id?: number;
  }
}
