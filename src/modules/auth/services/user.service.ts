import argon2 from "argon2";
import { __AUTH_ROLE_ID_CLIENT__ } from "../../../constants";
import { AuthStatusCodes, CustomError, GeneralStatusCodes, ServerStatusCodes } from "../../../core/errors/CustomError";
import { SQLDatabase } from "../../../db/SQLDatabase";
import { User } from "../../../entities/auth/User";
import { UserProfile } from "../../../entities/auth/UserProfile";
import { ICreateNewAccountOptions } from "../types/user/ICreateNewAccountOptions";
import { ILoginViaEmailOptions } from "../types/user/ILoginViaEmailOptions";
import { ILoginViaMobileOptions } from "../types/user/ILoginViaMobileOptions";
import { IUpdateProfileOptions } from "../types/user/IUpdateProfileOptions";
import { UserValidators } from "../validators/UserValidators";

export const find_user_by_id = async (id: number): Promise<User | undefined> => {
  if (!Number(id)) throw new CustomError(ServerStatusCodes.InternalServerError, "User id must be a number.");
  const user = await SQLDatabase.conn.getRepository(User).findOne({ where: { id: id } });
  return user ? User.clean(user) : undefined;
};

export const create_new_account = async (options: ICreateNewAccountOptions): Promise<User> => {
  if (!UserValidators.isCreateNewAccountOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, UserValidators.error);
  }

  const exists = await SQLDatabase.conn.getRepository(User).findOne({ where: { email: options.email } });
  if (!!exists)
    throw new CustomError(GeneralStatusCodes.NotFound, `User with provided email: ${options.email}, already exist.`);

  const password = await argon2.hash(options.passcode);
  const profile = await SQLDatabase.conn.getRepository(UserProfile).save({
    full_name: options.full_name
  });
  const user = await SQLDatabase.conn.getRepository(User).save({
    email: options.email,
    passcode: password,
    profile: profile,
    role: { id: __AUTH_ROLE_ID_CLIENT__ }
  });

  return User.clean(user);
};

export const login_via_mobile = async (options: ILoginViaMobileOptions): Promise<User> => {
  if (!UserValidators.isLoginViaMobileOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, UserValidators.error);
  }

  const user = await SQLDatabase.conn.getRepository(User).findOne({ where: { mobile: options.mobile } });
  if (!user)
    throw new CustomError(GeneralStatusCodes.NotFound, `User with provided mobile: ${options.mobile}, doesn't exist.`);

  const isPasswordValid = await argon2.verify(user.passcode, options.passcode);
  if (!isPasswordValid) throw new CustomError(AuthStatusCodes.Forbidden, "Invalid credentials provided.");

  return User.clean(user);
};

export const login_via_email = async (options: ILoginViaEmailOptions): Promise<User> => {
  if (!UserValidators.isLoginViaEmailOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, UserValidators.error);
  }

  const user = await SQLDatabase.conn.getRepository(User).findOne({ where: { email: options.email } });
  if (!user)
    throw new CustomError(GeneralStatusCodes.NotFound, `User with provided email: ${options.email}, doesn't exist.`);

  const isPasswordValid = await argon2.verify(user.passcode, options.passcode);
  if (!isPasswordValid) throw new CustomError(AuthStatusCodes.Forbidden, "Invalid credentials provided.");

  return User.clean(user);
};

export const update_profile = async (options: IUpdateProfileOptions): Promise<User> => {
  if (!UserValidators.isUpdateProfileOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, UserValidators.error);
  }

  const user = await SQLDatabase.conn.getRepository(User).findOne({ where: { id: options.user_id } });
  if (!user) throw new CustomError(GeneralStatusCodes.NotFound, "User with provided id doesn't exist.");

  user.profile = await SQLDatabase.conn.getRepository(UserProfile).save({
    ...user.profile,
    full_name: options.full_name || undefined
  });

  await SQLDatabase.conn.getRepository(User).save(user);
  return User.clean(user);
};
