import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAdmin } from "../../../../apollo/middlewares/isAdmin";
import { State } from "../../entities/area/State";
import * as stateService from "../../services/admin/state.service";
import { CreateNewStateInput, DeleteStateInput } from "./state";

@Resolver()
export class StateResolver {
  @UseMiddleware(isAdmin)
  @Mutation(() => State)
  async create_new_state(@Arg("options") options: CreateNewStateInput): Promise<State> {
    const user = await stateService.create_new_state(options);
    return user;
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => State)
  async delete_state(@Arg("options") options: DeleteStateInput): Promise<State> {
    return await stateService.delete_state({ state_id: options.state_id });
  }
}
