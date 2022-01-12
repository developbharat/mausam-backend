import { Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "../../../apollo/middlewares/isAuthenticated";
import { State } from "../../../entities/area/State";
import * as stateService from "../services/state.service";

@Resolver()
export class StateResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [State])
  async list_states(): Promise<State[]> {
    return await stateService.list_states();
  }
}
