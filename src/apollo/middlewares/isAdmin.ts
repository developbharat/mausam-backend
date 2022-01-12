import { MiddlewareFn } from "type-graphql";
import { AuthStatusCodes, CustomError } from "../../core/errors/CustomError";
import { userService } from "../../modules/auth";

export const isAdmin: MiddlewareFn = async ({ context }, next) => {
  const ctx = context as ExpressContext;
  if (ctx.req.session.user_id) {
    const user = await userService.find_user_by_id(ctx.req.session.user_id);
    if (!user) throw new CustomError(AuthStatusCodes.UnAuthorized, "User has been logged out.");
    if (!user.is_admin) throw new CustomError(AuthStatusCodes.Forbidden, "Only admin is allowed to use this resource.");

    return next();
  }
  throw new CustomError(AuthStatusCodes.UnAuthorized, "You need to be logged in, to use this resource.");
};
