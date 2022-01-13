import Joi from "joi";
import { BaseValidator } from "../../../core/BaseValidator";

const stateIdSchema = Joi.number().integer().positive().min(1).label("State ID").required();

export class CommonScrapeValidators extends BaseValidator {
  public static isStateIdValid(state_id: number): boolean {
    return this.isValidJoi(stateIdSchema, state_id);
  }
}
