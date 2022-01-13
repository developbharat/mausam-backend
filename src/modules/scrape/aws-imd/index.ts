import { CustomError, GeneralStatusCodes } from "../../../core/errors/CustomError";
import { SQLDatabase } from "../../../db/SQLDatabase";
import { State } from "../../../entities/area/State";
import { ObservationStation } from "../../../entities/weather/ObservationStation";
import { CommonScrapeValidators } from "../validators/CommonScrapeValidators";
import { IScrapeAllStatesOptions } from "./types/IScrapeAllStatesOptions";
import { IScrapeOptions } from "./types/IScrapeOptions";
import { download } from "./utils/download";
import { process_raw_html_observations } from "./utils/process";

export const scrape_aws_imd_state = async (options: IScrapeOptions): Promise<State> => {
  if (!CommonScrapeValidators.isStateIdValid(options.state_id)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, CommonScrapeValidators.error);
  }

  const state = await SQLDatabase.conn.getRepository(State).findOne({ where: { id: options.state_id } });
  if (!state) {
    throw new CustomError(GeneralStatusCodes.NotFound, `State with provided id: ${options.state_id}, doesn't exist.`);
  }

  const stations = await SQLDatabase.conn
    .getRepository(ObservationStation)
    .find({ where: { district: { state: { id: options.state_id } } }, relations: ["district", "district.state"] });

  const start_date = options.start_date || new Date();
  const end_date = options.end_date || new Date();

  const from = `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`;
  const to = `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`;

  const urls = stations.map(
    (station) =>
      `http://aws.imd.gov.in:8091/AWS/dataview.php?a=${station.cat_code}&b=${station.district.state.aws_code}&c=${station.district.aws_code}&d=${station.aws_code}&e=${from}&f=${to}&g=ALL_HOUR&h=ALL_MINUTE`
  );

  // Download all urls
  const filepaths = await download(urls);

  // convert and save all html files scrapped to database
  await Promise.all(filepaths.map((filepath) => process_raw_html_observations(filepath)));

  return state;
};

export const scrape_aws_imd_all_states = async (options: IScrapeAllStatesOptions = {}): Promise<void> => {
  const stations = await SQLDatabase.conn.getRepository(ObservationStation).find({});

  const start_date = options.start_date || new Date();
  const end_date = options.end_date || new Date();

  const from = `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`;
  const to = `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`;

  const urls = stations.map(
    (station) =>
      `http://aws.imd.gov.in:8091/AWS/dataview.php?a=${station.cat_code}&b=${station.district.state.aws_code}&c=${station.district.aws_code}&d=${station.aws_code}&e=${from}&f=${to}&g=ALL_HOUR&h=ALL_MINUTE`
  );

  const filepaths = await download(urls);
  await Promise.all(filepaths.map((filepath) => process_raw_html_observations(filepath)));
};
