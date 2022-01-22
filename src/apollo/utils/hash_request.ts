import { Request } from "express";
import crypto from "crypto";

export const hash_request = (req: Request) => {
  const options = {
    originalUrl: req.originalUrl,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    cookies: req.cookies
  };

  return crypto.createHash("sha512").update(JSON.stringify(options), "utf-8").digest("hex");
};
