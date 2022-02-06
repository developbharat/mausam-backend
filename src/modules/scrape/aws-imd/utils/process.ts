import es from "event-stream";
import fs from "fs";
import { SQLDatabase } from "../../../../db/SQLDatabase";
import { ObservationStation } from "../../../weather/entities/weather/ObservationStation";
import { WeatherObservation } from "../../../weather/entities/weather/WeatherObservation";
import { parse_observation_html_row } from "./parse_observation_html_row";

export const process_raw_html_observations = async (filepath: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!fs.existsSync(filepath)) return reject(new Error(`File: ${filepath}, doesn't exist.`));

    let headers: string[] = [];
    let observations: WeatherObservation[] = [];

    const stream = fs
      .createReadStream(filepath)
      .pipe(es.split(new RegExp("(?<=<tr>)(.*?)(?=</tr>)", "gs")))
      .pipe(
        es.mapSync(async (line: string) => {
          const header = line.match(new RegExp("(?<=<th>)(.*?)(?=</th>)", "gs")) || [];
          const cols = line.match(new RegExp("(?<=<td>)(.*?)(?=</td>)", "gs"));

          if (!!header.length && !headers.length) headers = header;

          const is_proceed = !!cols && !!headers;
          if (!is_proceed) return;

          // Parse raw html to WeatherObservation instance.
          const cat_code = filepath.split("/").pop()!.split("--")[0];
          const observation = parse_observation_html_row([...cols, cat_code], [...headers, "cat_code"]);
          if (observation) observations.push(observation);

          if (observations.length >= 10000) {
            stream.pause();
            await save_observations(observations);
            observations = [];
            stream.resume();
          }
        })
      )
      .on("end", async () => {
        if (!!observations.length) await save_observations(observations);
        fs.rmSync(filepath);
        resolve();
      });
  });
};

const save_observations = async (observations: WeatherObservation[]): Promise<void> => {
  const conditions = observations.map((ob) => ob.station);
  const stations = await SQLDatabase.conn
    .getRepository(ObservationStation)
    .find({ where: conditions, select: ["id", "aws_code"] });

  for (let obs of observations) {
    const station = stations.find((st) => st.aws_code === obs.station.aws_code) as ObservationStation;
    obs["station"] = station;
  }

  /**
   * INSERT OR IGNORE INTO clause is not supported yet by sqlite.
   * It is supported by: MySQL and Postgres,
   * Refer: https://github.com/typeorm/typeorm/issues/1780
   */

  const [sql, args] = SQLDatabase.conn
    .getRepository(WeatherObservation)
    .createQueryBuilder()
    .insert()
    .values(observations)
    .useTransaction(true)
    .getQueryAndParameters();

  const new_sql = sql.replaceAll("INSERT INTO", "INSERT IGNORE INTO");
  if (!!new_sql) await SQLDatabase.conn.manager.query(new_sql, args);
};
