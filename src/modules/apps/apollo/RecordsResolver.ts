import { Arg, Ctx, Query, Resolver } from "type-graphql";
import * as recordService from "../services/records.service";
import { ListObservationResult, ListObservationsInput } from "./records";

@Resolver()
export class RecordsResolver {
  @Query(() => ListObservationResult)
  async list_observations(
    @Ctx() { req }: ExpressContext,
    @Arg("options") options: ListObservationsInput
  ): Promise<ListObservationResult> {
    const ip = req.ip;
    return await recordService.list_observations({ ...options, ip: ip });
  }
}
