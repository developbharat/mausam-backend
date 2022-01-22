import { NextFunction, Request, Response, Router } from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { create_helix_server } from "./middlewares/create_helix_server";
import { hash_request } from "./utils/hash_request";
import { store } from "./utils/store";

export const create_graphql_server = async (): Promise<Router> => {
  const router = Router();

  // Note: Setting validate: true will require class-validator dependency
  const client_schema = await buildSchema({
    resolvers: [path.join(__dirname, "..", "modules", "**", "apollo", "*Resolver.{ts,js}")],
    validate: false
  });

  const admin_schema = await buildSchema({
    resolvers: [
      path.join(__dirname, "..", "modules", "**", "apollo", "*Resolver.{ts,js}"),
      path.join(__dirname, "..", "modules", "**", "apollo", "admin", "*Resolver.{ts,js}")
    ],
    validate: false
  });

  const cache_middleware = (req: Request, res: Response, next: NextFunction) => {
    const hash = hash_request(req);
    // Return cached response
    if (store.check(hash)) {
      return res.end(store.at(hash));
    }

    // We enabled this functionality to resolver middleware too.
    // but you can also cache every response for few seconds,
    // just to increase performance.
    const end = res.end;
    res.end = (data) => {
      // Note: Ignore if some middleware updated the store.
      if (!store.at(hash)) store.put(hash, data, 2000);
      return end(data);
    };

    return next();
  };

  router.use("/", cache_middleware, create_helix_server(client_schema));
  router.use("/admin", cache_middleware, create_helix_server(admin_schema));

  return router;
};
