import { Router } from "express";
import { setup_v1_routes } from "./api/v1";

export const setup_express_routes = (): Router => {
  const router = Router();

  router.use("/api/v1", setup_v1_routes());

  return router;
};
