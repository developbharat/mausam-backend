import { ApolloServer } from "apollo-server-express";
import e from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

export const create_client_apollo_server = async (app: e.Application): Promise<ApolloServer<ExpressContext>> => {
  const client_schema = await buildSchema({
    resolvers: [path.join(__dirname, "..", "modules", "**", "apollo", "*Resolver.*")],
    validate: false
  });

  // Note: Setting validate: true will require class-validator dependency
  const server = new ApolloServer({
    schema: client_schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/graphql", disableHealthCheck: false });

  return server;
};

export const create_admin_apollo_server = async (app: e.Application): Promise<ApolloServer<ExpressContext>> => {
  const admin_schema = await buildSchema({
    resolvers: [
      path.join(__dirname, "..", "modules", "**", "apollo", "*Resolver.*"),
      path.join(__dirname, "..", "modules", "**", "apollo", "admin", "*Resolver.*")
    ],
    validate: false
  });

  // Note: Setting validate: true will require class-validator dependency
  const server = new ApolloServer({
    schema: admin_schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/admin-graphql", disableHealthCheck: false });

  return server;
};
