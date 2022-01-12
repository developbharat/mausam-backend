import { Response, Request } from "express";

declare global {
  interface ExpressContext {
    req: Request;
    res: Response;
  }
}
