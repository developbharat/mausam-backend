require("reflect-metadata");
import express from "express";
import http from "http";
import { config } from "./config";
import { SQLDatabase } from "./db/SQLDatabase";
import { EnvironmentValidators } from "./validators/EnvironmentValidators";
import cors from "cors";
import { create_admin_apollo_server, create_client_apollo_server } from "./apollo";
import { logger } from "./utils/logger";
import session from "express-session";
import { __DEV__, __PROD__ } from "./constants";
import createStore from "session-file-store";
import { setup_express_routes } from "./express";

export class MainServer {
  private static _httpServer: http.Server;

  private static _expressServer: express.Application = express();

  public static get expressServer(): express.Application {
    if (!this._expressServer) throw new Error("MainServer not initialized...");
    return this._expressServer;
  }

  public static get server(): http.Server {
    if (!this._httpServer) throw new Error("MainServer not initialized...");
    return this._httpServer;
  }

  public static async init(): Promise<void> {
    // Validate environment configuration
    const isEnvValid = EnvironmentValidators.isEnvConfigValid(config);
    if (!isEnvValid) {
      logger.error(EnvironmentValidators.error);
      process.exit(1);
    }

    // Initialize database
    await SQLDatabase.init();

    // Express Server
    await this.create_express_server();

    // Create http server.
    this._httpServer = http.createServer(this.expressServer);
  }

  public static async shutdown(): Promise<void> {
    await SQLDatabase.close();
    this.server.close();
  }

  public static start(): void {
    if (!this._httpServer) throw new Error("MainServer not initialized...");
    this._httpServer.listen(config.root.port, () => {
      logger.debug(`Server started at http://localhost:${config.root.port}`);
    });
  }

  private static async create_express_server(): Promise<void> {
    this.expressServer.use(cors({ origin: config.cors.origin, credentials: true }));
    this.expressServer.use(express.json());
    this.expressServer.use(express.urlencoded({ extended: true }));

    const Store = createStore(session);
    this.expressServer.use(
      session({
        name: "uid",
        secret: config.jwt.secret,
        resave: false,
        saveUninitialized: false,
        store: new Store(),
        cookie: {
          httpOnly: true,
          maxAge: 60000 * 60 * 5, // 5 hours
          sameSite: "lax",
          secure: __PROD__,
          signed: true
        }
      })
    );

    // Express API Endpoints
    this.expressServer.use(setup_express_routes());

    // Graphql Client Endpoints
    await create_client_apollo_server(this.expressServer);
    await create_admin_apollo_server(this.expressServer);

    // Error handlers.
    this.expressServer.use((err: any, _req: any, res: any, next: any) => {
      if (err) {
        if (err.status) return res.status(err.status).json({ error: err.message });
        return res.status(500).json({ error: err.message });
      } else {
        return next();
      }
    });

    // Configure 404 Routes
    this.expressServer.use("*", (_req, res, _next) => {
      return res.status(404).json({ error: "Requested route not found." });
    });
  }
}
