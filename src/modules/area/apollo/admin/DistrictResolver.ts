import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAdmin } from "../../../../apollo/middlewares/isAdmin";
import { District } from "../../../../entities/area/District";
import * as districtService from "../../services/admin/district.service";
import { CreateNewDistrictInput, DeleteDistrictInput } from "./district";

@Resolver()
export class DistrictResolver {
  @UseMiddleware(isAdmin)
  @Mutation(() => District)
  async create_new_district(@Arg("options") options: CreateNewDistrictInput): Promise<District> {
    return await districtService.create_new_district(options);
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => District)
  async delete_district(@Arg("options") options: DeleteDistrictInput): Promise<District> {
    return await districtService.delete_district({ district_id: options.district_id });
  }
}
