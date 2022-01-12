import path from "path";
import { ConnectionOptions } from "typeorm";
import { config } from "../config";
import { __TEST__ } from "../constants";

export default {
  name: "default",
  type: "mariadb",
  url: config.db.url,
  synchronize: false,
  migrationsRun: true,
  dropSchema: __TEST__,
  entities: [path.join(__dirname, "..", "entities", "**", "*.*"), path.join(__dirname, "..", "entities", "*.*")],
  migrations: [path.join(__dirname, "migrations", "*.*")],
  cli: {
    entitiesDir: path.join(__dirname, "..", "entities"),
    migrationsDir: path.join(__dirname, "migrations")
  }
} as ConnectionOptions;
