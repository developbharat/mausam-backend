import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "../../../apollo/middlewares/isAuthenticated";
import { District } from "../../../entities/area/District";
import * as districtService from "../services/district.service";
import { ListDistrictsInput } from "./district";

@Resolver()
export class DistrictResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [District])
  async list_districts(@Arg("options") options: ListDistrictsInput): Promise<District[]> {
    return await districtService.list_districts(options);
  }
}
