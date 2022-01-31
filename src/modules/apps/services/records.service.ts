import { Between } from "typeorm";
import { CustomError, GeneralStatusCodes } from "../../../core/errors/CustomError";
import { SQLDatabase } from "../../../db/SQLDatabase";
import { UserApplication } from "../../../entities/apps/UserApplication";
import { WeatherObservation } from "../../../entities/weather/WeatherObservation";
import { IPaginatedResult } from "../../../types/pagination/IPaginatedResult";
import { process_pagination_options } from "../../../utils/process_pagination_options";
import { IListObservationOptions } from "../types/records/IListObservationOptions";

export const list_observations = async (
  options: IListObservationOptions
): Promise<IPaginatedResult<WeatherObservation>> => {
  const { page, skip, take } = process_pagination_options(options);

  const application = await SQLDatabase.conn
    .getRepository(UserApplication)
    .findOne({ where: { access_token: options.access_token } });
  if (!application) {
    throw new CustomError(GeneralStatusCodes.NotFound, `Invalid access token provided.`);
  }

  const ip = options.ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{2})?/)?.toString();
  if (!ip) throw new CustomError(GeneralStatusCodes.BadRequest, `Request blocked due to invalid ip: ${options.ip}`);

  let is_whitelisted_ip = false;
  for (let ipv4 of application.ips || []) {
    if (ipv4.is_whitelisted && ipv4.ips().includes(ip)) {
      is_whitelisted_ip = true;
      break;
    }
  }

  if (!is_whitelisted_ip) {
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `You IP address: ${options.ip} not allowed to access this resource.`
    );
  }

  const ids = await application.stations?.map((st) => st.id);
  if (!ids?.includes(Number(options.station_id))) {
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `You are not allowed to access data for station id: ${options.station_id}`
    );
  }

  const [observations, count] = await SQLDatabase.conn.getRepository(WeatherObservation).findAndCount({
    skip: skip,
    take: take + 1,
    where: { station: { id: options.station_id }, date_time: Between(options.start_date, options.end_date) },
    relations: []
  });

  if (count === 0) {
    throw new CustomError(GeneralStatusCodes.BadRequest, "No observations found in database.");
  }

  if (skip >= count) {
    throw new CustomError(GeneralStatusCodes.BadRequest, "Invalid page no. provided.");
  }

  const isLastPage: Boolean = observations.length <= take;
  const data = observations.slice(0, take).map((item) => WeatherObservation.clean(item));
  return { page: page, limit: take, is_last_page: isLastPage, data: data };
};
