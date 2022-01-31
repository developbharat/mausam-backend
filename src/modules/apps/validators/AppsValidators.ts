import Joi from "joi";
import { BaseValidator } from "../../../core/BaseValidator";
import { IAddObservationStationOptions } from "../types/apps/IAddObservationStationOptions";
import { ICreateApplicationOptions } from "../types/apps/ICreateApplicationOptions";
import { IListUserApplicationsOptions } from "../types/apps/IListUserApplicationsOptions";
import { ISetWhitelistIpOptions } from "../types/apps/ISetWhitelistIpOptions";

const idSchema = Joi.number().integer().positive().min(1).label("ID").required();

const nameSchema = Joi.string()
  .trim()
  .regex(/^[a-zA-Z0-9\s]*$/, "alphabets, spaces and numbers")
  .label("application name")
  .required();

const boolSchema = Joi.boolean().required();

const ipv4Schema = Joi.string()
  .trim()
  .regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/, "ipv4 address")
  .label("ipv4 address")
  .required();

const descriptionSchema = Joi.string()
  .trim()
  .regex(/^[a-zA-Z0-9-_.,()#\s]*$/, "alphabets, spaces, numbers, -, _, ., ,, (, ), #")
  .label("application description")
  .optional();

// const userAgentSchema = Joi.string()
//   .trim()
//   .regex(/^(?!opera)(?=.*\b(android|iphone|ipod)\b).*$/, "user agent")
//   .label("user agent")
//   .required();

export class AppsValidators extends BaseValidator {
  public static isListUserApplicationsOptionsValid(options: IListUserApplicationsOptions): boolean {
    return this.isValidJoi(idSchema, options.user_id);
  }

  public static isCreateOptionsValid(options: ICreateApplicationOptions): boolean {
    return (
      this.isValidJoi(nameSchema, options.name) &&
      this.isValidJoi(descriptionSchema, options.description) &&
      this.isValidJoi(idSchema, options.user_id)
    );
  }

  public static isSetWhitelistIpOptionsValid(options: ISetWhitelistIpOptions): boolean {
    return (
      this.isValidJoi(idSchema, options.user_id) &&
      this.isValidJoi(idSchema, options.application_id) &&
      this.isValidJoi(ipv4Schema, options.ipv4) &&
      this.isValidJoi(boolSchema.label("is_whitelisted"), options.is_whitelisted)
    );
  }

  public static isAddObservationStationOptionsValid(options: IAddObservationStationOptions): boolean {
    return (
      this.isValidJoi(idSchema, options.user_id) &&
      this.isValidJoi(idSchema, options.station_id) &&
      this.isValidJoi(idSchema, options.application_id)
    );
  }
}
