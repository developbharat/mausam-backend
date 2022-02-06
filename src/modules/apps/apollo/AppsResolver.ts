import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "../../../apollo/middlewares/isAuthenticated";
import { UserApplication } from "../entities/apps/UserApplication";
import * as appsService from "../services/apps.service";
import {
  CreateApplicationInput,
  SetApplicationIPv4StatusInput,
  UpdateApplicationObservationStationInput
} from "./apps";

/**
 * TODO:
 * 1. generate migrations.
 * 2. Test functionality via Graphql endpoint
 * 3. Implement user request functionality to fetch data.
 *
 * FUTURE TODO:
 * 1. Write validator tests for appsvalidator
 * 2. Migrate all numeric primary generated columns to use nanoid, to prevent bruteforce attack by user.
 * 3. Write more tests
 */

@Resolver()
export class AppsResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [UserApplication])
  async list_applications(@Ctx() { req }: ExpressContext): Promise<UserApplication[]> {
    return await appsService.list_user_applications({ user_id: req.session.user_id! });
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => UserApplication)
  async create_application(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: CreateApplicationInput
  ): Promise<UserApplication> {
    const user_id = req.session.user_id!;
    return await appsService.create_application({ ...options, user_id: user_id });
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => UserApplication)
  async whitelist_app_ip(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: SetApplicationIPv4StatusInput
  ): Promise<UserApplication> {
    return await appsService.set_whitelist_ip_status({
      ...options,
      user_id: req.session.user_id!,
      is_whitelisted: true
    });
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => UserApplication)
  async blacklist_app_ip(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: SetApplicationIPv4StatusInput
  ): Promise<UserApplication> {
    return await appsService.set_whitelist_ip_status({
      ...options,
      user_id: req.session.user_id!,
      is_whitelisted: false
    });
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => UserApplication)
  async add_app_observation_station(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: UpdateApplicationObservationStationInput
  ): Promise<UserApplication> {
    return await appsService.add_observation_station({ ...options, user_id: req.session.user_id! });
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => UserApplication)
  async remove_app_observation_station(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: UpdateApplicationObservationStationInput
  ): Promise<UserApplication> {
    return await appsService.remove_observation_station({ ...options, user_id: req.session.user_id! });
  }
}
