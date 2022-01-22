import path from "path";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { __TEST__ } from "../constants";
import ormconfig from "./ormconfig";

const testconfig: ConnectionOptions = {
  ...ormconfig,
  type: "better-sqlite3",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  migrationsRun: true,
  migrations: [path.join(__dirname, "migrations", "*-user_roles.*")]
};

export class SQLDatabase {
  private static _conn: Connection;

  public static get conn(): Connection {
    return this._conn;
  }

  public static async init(options?: Partial<ConnectionOptions>): Promise<Connection> {
    const config: ConnectionOptions =
      typeof options !== "undefined" ? ({ ...ormconfig, ...options } as ConnectionOptions) : ormconfig;

    if (typeof this._conn === "undefined") this._conn = await createConnection(__TEST__ ? testconfig : config);
    return this._conn;
  }

  public static async close(): Promise<void> {
    if (this._conn?.isConnected) await this._conn.close();
  }
}
