import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ListDistrictsInput {
  @Field(() => ID)
  state_id: number;
}
