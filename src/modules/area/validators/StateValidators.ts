import Joi from "joi";
import { BaseValidator } from "../../../core/BaseValidator";
import { ICreateStateOptions } from "../types/state/admin/ICreateStateOptions";
import { IDeleteStateOptions } from "../types/state/admin/IDeleteStateOptions";

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

export class StateValidators extends BaseValidator {
  public static isCreateStateOptionsValid(options: ICreateStateOptions): boolean {
    return this.isValidJoi(nameSchema, options.name) && this.isValidJoi(awsCodeSchema, options.aws_code);
  }

  public static isDeleteStateOptionsValid(options: IDeleteStateOptions): boolean {
    return this.isValidJoi(idSchema, options.state_id);
  }
}
