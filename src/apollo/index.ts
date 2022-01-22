import { Router } from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { create_helix_server } from "./middlewares/create_helix_server";

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

  router.use("/", create_helix_server(client_schema));
  router.use("/admin", create_helix_server(admin_schema));

  return router;
};
