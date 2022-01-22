import Joi from "joi";
import { BaseValidator } from "../core/BaseValidator";

const appConfigSchema = Joi.object()
  .keys({
    root: Joi.object()
      .keys({
        port: Joi.number().positive().integer().label("Application Port: PORT").required(),
        env: Joi.string().valid("production", "development", "test").label("NODE_ENV").required()
      })
      .label("Root Configuration")
      .required(),
    cors: Joi.object().keys({
      origin: Joi.string().min(5).label("Cors Origin url: CORS_ORIGIN").required()
    }),
    db: Joi.object().keys({
      url: Joi.string().min(5).label("Database URL: DB_URL").required()
    }),
    jwt: Joi.object().keys({
      secret: Joi.string().min(8).label("JSON Web Token Secret: JWT_SECRET").required()
    })
  })
  .label("Database Configuration")
  .required();

export class EnvironmentValidators extends BaseValidator {
  public static isEnvConfigValid(env: object): boolean {
    return this.isValidJoi(appConfigSchema, env);
  }
}
