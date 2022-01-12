import Joi from "joi";
import { BaseValidator } from "../../../core/BaseValidator";
import { ICreateNewAccountOptions } from "../types/user/ICreateNewAccountOptions";
import { ILoginViaEmailOptions } from "../types/user/ILoginViaEmailOptions";
import { ILoginViaMobileOptions } from "../types/user/ILoginViaMobileOptions";
import { IUpdateProfileOptions } from "../types/user/IUpdateProfileOptions";

const passcodeSchema = Joi.string().trim().min(6).max(14).label("User passcode").required();

const fullnameSchema = Joi.string()
  .trim()
  .regex(/^[a-zA-Z\s]*$/, "alphabets and spaces")
  .label("fullname")
  .required();

const mobileSchema = Joi.string()
  .trim()
  .length(10)
  .regex(/^[0-9]*$/, "numbers")
  .label("mobile no")
  .required();

const emailSchema = Joi.string().trim().email({ multiple: false, allowUnicode: false }).label("email").required();

export class UserValidators extends BaseValidator {
  public static isCreateNewAccountOptionsValid(options: ICreateNewAccountOptions): boolean {
    return (
      this.isValidJoi(emailSchema, options.email) &&
      this.isValidJoi(passcodeSchema, options.passcode) &&
      this.isValidJoi(fullnameSchema, options.full_name)
    );
  }

  public static isLoginViaMobileOptionsValid(options: ILoginViaMobileOptions): boolean {
    return this.isValidJoi(mobileSchema, options.mobile) && this.isValidJoi(passcodeSchema, options.passcode);
  }

  public static isLoginViaEmailOptionsValid(options: ILoginViaEmailOptions): boolean {
    return this.isValidJoi(emailSchema, options.email) && this.isValidJoi(passcodeSchema, options.passcode);
  }

  public static isUpdateProfileOptionsValid(options: IUpdateProfileOptions): boolean {
    return this.isValidJoi(fullnameSchema, options.full_name);
  }
}
