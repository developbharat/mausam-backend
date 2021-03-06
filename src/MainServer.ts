require("reflect-metadata");
import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import createStore from "session-file-store";
import { create_graphql_server } from "./apollo";
import { config } from "./config";
import { __PROD__ } from "./constants";
import { SQLDatabase } from "./db/SQLDatabase";
import { setup_express_routes } from "./express";
import { init_schedules } from "./tasks";
import { logger } from "./utils/logger";
import { EnvironmentValidators } from "./validators/EnvironmentValidators";

// Currently type definitions doesn't contain gracefulShutdown types,
// but it can be found at: https://github.com/node-schedule/node-schedule/blob/master/lib/schedule.js#L76
// So, we use require instead of import.
// TODO: fix it with import in case types gets merged. or add custom types in global.d.ts for node-schedule
const schedule = require("node-schedule");

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

    await schedule.gracefulShutdown();
  }

  public static start(): void {
    // initialize jobs
    init_schedules();

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

    // Graphql Endpoints
    this.expressServer.use("/graphql", await create_graphql_server());

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
