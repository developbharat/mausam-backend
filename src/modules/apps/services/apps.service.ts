import { customAlphabet } from "nanoid";
import { CustomError, GeneralStatusCodes } from "../../../core/errors/CustomError";
import { SQLDatabase } from "../../../db/SQLDatabase";
import { IPV4Address } from "../../../entities/apps/IPV4Address";
import { UserApplication } from "../../../entities/apps/UserApplication";
import { User } from "../../../entities/auth/User";
import { ObservationStation } from "../../../entities/weather/ObservationStation";
import { IAddObservationStationOptions } from "../types/apps/IAddObservationStationOptions";
import { ICreateApplicationOptions } from "../types/apps/ICreateApplicationOptions";
import { IListUserApplicationsOptions } from "../types/apps/IListUserApplicationsOptions";
import { ISetWhitelistIpOptions } from "../types/apps/ISetWhitelistIpOptions";
import { AppsValidators } from "../validators/AppsValidators";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21);

export const list_user_applications = async (options: IListUserApplicationsOptions): Promise<UserApplication[]> => {
  if (!AppsValidators.isListUserApplicationsOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, AppsValidators.error);
  }

  const [apps, count] = await SQLDatabase.conn
    .getRepository(UserApplication)
    .findAndCount({ where: { user: { id: options.user_id } } });

  return !count ? [] : apps.map((item) => UserApplication.clean(item));
};

export const create_application = async (options: ICreateApplicationOptions): Promise<UserApplication> => {
  if (!AppsValidators.isCreateOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, AppsValidators.error);
  }

  const exists = await SQLDatabase.conn
    .getRepository(UserApplication)
    .count({ where: { name: options.name, user: { id: options.user_id } } });
  if (!!exists) {
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `Application with provided name: ${options.name}, already exists.`
    );
  }

  const user = await SQLDatabase.conn.getRepository(User).findOne({ where: { id: options.user_id } });
  if (!user) throw new CustomError(GeneralStatusCodes.NotFound, `User with provided id, doesn't exist.`);

  const app = await SQLDatabase.conn
    .getRepository(UserApplication)
    .save({ name: options.name, description: options.description, access_token: nanoid(), user: user });
  return UserApplication.clean(app);
};

export const set_whitelist_ip_status = async (options: ISetWhitelistIpOptions): Promise<UserApplication> => {
  if (!AppsValidators.isSetWhitelistIpOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, AppsValidators.error);
  }

  const user = await SQLDatabase.conn.getRepository(User).findOne({ where: { id: options.user_id } });
  if (!user)
    throw new CustomError(GeneralStatusCodes.NotFound, `User with provided id: ${options.user_id}, doesn't exist.`);

  const application = await SQLDatabase.conn
    .getRepository(UserApplication)
    .findOne({ where: { id: options.application_id } });
  if (!application)
    throw new CustomError(
      GeneralStatusCodes.NotFound,
      `Application with provided id: ${options.application_id}, doesn't exist.`
    );

  const octets = options.ipv4.split(".");
  const ip_found = await SQLDatabase.conn.getRepository(IPV4Address).findOne({
    where: {
      octet_one_from: Number(octets[0].includes("-") ? octets[0].split("-")[0] : octets[0]),
      octet_one_to: Number(octets[0].includes("-") ? octets[0].split("-")[1] : octets[0]),
      octet_two_from: Number(octets[1].includes("-") ? octets[1].split("-")[0] : octets[1]),
      octet_two_to: Number(octets[1].includes("-") ? octets[1].split("-")[1] : octets[1]),
      octet_three_from: Number(octets[2].includes("-") ? octets[2].split("-")[0] : octets[2]),
      octet_three_to: Number(octets[2].includes("-") ? octets[2].split("-")[1] : octets[2]),
      octet_four_from: Number(octets[3].includes("-") ? octets[3].split("-")[0] : octets[3]),
      octet_four_to: Number(octets[3].includes("-") ? octets[3].split("-")[1] : octets[3])
    }
  });

  if (ip_found?.is_whitelisted === options.is_whitelisted)
    throw new CustomError(GeneralStatusCodes.BadRequest, `Provided IPv4: ${options.ipv4}, is already whitelisted.`);

  // Map found ip to application if not already mapped.
  if (!!ip_found) {
    const is_mapped = application.ips?.find((ip) => ip.id === ip_found?.id);
    ip_found.is_whitelisted = options.is_whitelisted;

    const ips = !is_mapped ? application.ips : application.ips?.filter((ip) => ip.id !== ip_found.id);
    application.ips = [...(ips || []), ip_found];
    await SQLDatabase.conn.getRepository(UserApplication).save(application);
  }

  // If ip doesn't exist then save it to database and map it to application.
  if (!ip_found) {
    const ip = await SQLDatabase.conn.getRepository(IPV4Address).save({
      octet_one_from: Number(octets[0].includes("-") ? octets[0].split("-")[0] : octets[0]),
      octet_one_to: Number(octets[0].includes("-") ? octets[0].split("-")[1] : octets[0]),
      octet_two_from: Number(octets[1].includes("-") ? octets[1].split("-")[0] : octets[1]),
      octet_two_to: Number(octets[1].includes("-") ? octets[1].split("-")[1] : octets[1]),
      octet_three_from: Number(octets[2].includes("-") ? octets[2].split("-")[0] : octets[2]),
      octet_three_to: Number(octets[2].includes("-") ? octets[2].split("-")[1] : octets[2]),
      octet_four_from: Number(octets[3].includes("-") ? octets[3].split("-")[0] : octets[3]),
      octet_four_to: Number(octets[3].includes("-") ? octets[3].split("-")[1] : octets[3]),
      is_whitelisted: options.is_whitelisted
    });

    application.ips = [...(application.ips || []), ip];
    await SQLDatabase.conn.getRepository(UserApplication).save(application);
  }

  return UserApplication.clean(application);
};

export const add_observation_station = async (options: IAddObservationStationOptions): Promise<UserApplication> => {
  if (!AppsValidators.isAddObservationStationOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, AppsValidators.error);
  }

  const application = await SQLDatabase.conn
    .getRepository(UserApplication)
    .findOne({ where: { id: options.application_id, user: { id: options.user_id } } });

  if (!application)
    throw new CustomError(
      GeneralStatusCodes.NotFound,
      `Application with provided id: ${options.application_id}, doesn't exist.`
    );

  const found = application.stations?.find((item) => item.id === Number(options.station_id));
  if (!!found)
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `Station with provided id: ${options.station_id}, is already available in application.`
    );

  const station = await SQLDatabase.conn
    .getRepository(ObservationStation)
    .findOne({ where: { id: options.station_id } });
  if (!station)
    throw new CustomError(
      GeneralStatusCodes.NotFound,
      `Observation Station with provided id: ${options.station_id}, doesn't exist.`
    );

  application.stations = [...(application.stations || []), station];
  await SQLDatabase.conn.getRepository(UserApplication).save(application);

  return UserApplication.clean(application);
};

export const remove_observation_station = async (options: IAddObservationStationOptions): Promise<UserApplication> => {
  if (!AppsValidators.isAddObservationStationOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, AppsValidators.error);
  }

  const application = await SQLDatabase.conn
    .getRepository(UserApplication)
    .findOne({ where: { id: options.application_id, user: { id: options.user_id } } });

  if (!application)
    throw new CustomError(
      GeneralStatusCodes.NotFound,
      `Application with provided id: ${options.application_id}, doesn't exist.`
    );

  const found = application.stations?.find((item) => item.id === Number(options.station_id));
  if (!found)
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `Station with provided id: ${options.station_id}, is not linked to application: ${application.name}.`
    );

  application.stations = application.stations?.filter((item) => item.id !== Number(options.station_id));
  await SQLDatabase.conn.getRepository(UserApplication).save(application);

  return UserApplication.clean(application);
};
