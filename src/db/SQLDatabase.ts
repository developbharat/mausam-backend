import { Connection, ConnectionOptions, createConnection } from "typeorm";
import ormconfig from "./ormconfig";

export class SQLDatabase {
  private static _conn: Connection;

  public static get conn(): Connection {
    return this._conn;
  }

  public static async init(options?: Partial<ConnectionOptions>): Promise<Connection> {
    const config: ConnectionOptions =
      typeof options !== "undefined" ? ({ ...ormconfig, ...options } as ConnectionOptions) : ormconfig;
    if (typeof this._conn === "undefined") this._conn = await createConnection(config);
    return this._conn;
  }

  public static async close(): Promise<void> {
    if (this._conn?.isConnected) await this._conn.close();
  }
}
