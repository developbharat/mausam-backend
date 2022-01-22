import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { cache } from "../../../apollo/middlewares/cache";
import { User } from "../../../entities/auth/User";
import * as userService from "../services/user.service";
import { CreateNewAccountInput, LoginViaEmailInput, LoginViaMobileInput, UpdateProfileInput } from "./user";

@Resolver()
export class UserResolver {
  @UseMiddleware(cache(10000))
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: ExpressContext): Promise<User | undefined> {
    return req.session.user_id ? await userService.find_user_by_id(req.session.user_id) : undefined;
  }

  @Mutation(() => User)
  async create_new_account(@Arg("options") options: CreateNewAccountInput): Promise<User> {
    const user = await userService.create_new_account(options);
    return user;
  }

  @Mutation(() => User)
  async login_via_mobile(@Ctx() { req }: ExpressContext, @Arg("options") options: LoginViaMobileInput): Promise<User> {
    const user = await userService.login_via_mobile(options);
    req.session.user_id = user.id;
    return user;
  }

  @Mutation(() => User)
  async login_via_email(@Ctx() { req }: ExpressContext, @Arg("options") options: LoginViaEmailInput): Promise<User> {
    const user = await userService.login_via_email(options);
    req.session.user_id = user.id;
    return user;
  }

  @Mutation(() => User)
  async update_profile(@Ctx() { req }: ExpressContext, @Arg("options") options: UpdateProfileInput): Promise<User> {
    return await userService.update_profile({ ...options, user_id: req.session.user_id! });
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ExpressContext): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      req.session.destroy((err) => {
        res.clearCookie("uid");
        if (err) reject(err);
        return resolve(true);
      });
    });
  }
}
