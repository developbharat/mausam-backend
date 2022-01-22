import { Router } from "express";
import { GraphQLSchema } from "graphql";
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";

export const create_helix_server = (schema: GraphQLSchema): Router => {
  const router = Router();

  router.use("/", async (req, res) => {
    // Create a generic Request object that can be consumed by Graphql Helix's API
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query
    };

    // Determine whether we should render GraphiQL instead of returning an API response
    if (shouldRenderGraphiQL(request)) {
      return res.send(renderGraphiQL());
    }

    // Extract the Graphql parameters from the request
    const { operationName, query, variables } = getGraphQLParameters(request);

    // Validate and execute the query
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema: schema,
      contextFactory: () => ({ req, res })
    });

    // processRequest returns one of three types of results depending on how the server should respond
    // 1) RESPONSE: a regular JSON payload
    // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
    // 3) PUSH: a stream of events to push back down the client for a subscription
    // The "sendResult" is a NodeJS-only shortcut for handling all possible types of Graphql responses,
    // See "Advanced Usage" below for more details and customizations available on that layer.
    return sendResult(result, res);
  });

  return router;
};
