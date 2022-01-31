import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { cache } from "../../../apollo/middlewares/cache";
import * as recordService from "../services/records.service";
import { ListObservationResult, ListObservationsInput } from "./records";

@Resolver()
export class RecordsResolver {
  @UseMiddleware(cache(60000)) // cache 1 minute
  @Query(() => ListObservationResult)
  async list_observations(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: ListObservationsInput
  ): Promise<ListObservationResult> {
    const ip = req.ip;
    return await recordService.list_observations({ ...options, ip: ip });
  }
}
