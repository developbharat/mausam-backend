import Joi from "joi";
import { BaseValidator } from "../../../core/BaseValidator";
import { ICreateDistrictOptions } from "../types/district/admin/ICreateDistrictOptions";
import { IDeleteDistrictOptions } from "../types/district/admin/IDeleteDistrictOptions";
import { IListDistrictOptions } from "../types/district/IListDistrictOptions";

const idSchema = Joi.number().integer().positive().min(1).label("ID").required();

const nameSchema = Joi.string()
  .trim()
  .regex(/^[a-zA-Z\s]*$/, "alphabets and spaces")
  .label("name")
  .required();

const awsCodeSchema = Joi.string()
  .trim()
  .regex(/^[A-Z_]*$/, "uppercase alphabets and underscores")
  .label("aws code")
  .required();

export class DistrictValidators extends BaseValidator {
  public static isListDistrictOptionsValid(options: IListDistrictOptions): boolean {
    return this.isValidJoi(idSchema, options.state_id);
  }

  public static isCreateDistrictOptionsValid(options: ICreateDistrictOptions): boolean {
    return this.isValidJoi(nameSchema, options.name) && this.isValidJoi(awsCodeSchema, options.aws_code);
  }

  public static isDeleteDistrictOptionsValid(options: IDeleteDistrictOptions): boolean {
    return this.isValidJoi(idSchema, options.district_id);
  }
}
