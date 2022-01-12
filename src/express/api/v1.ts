import { Router } from "express";

export const setup_v1_routes = (): Router => {
  const router = Router();

  router.get("/status", (_req, res) => res.sendStatus(200));

  return router;
};
