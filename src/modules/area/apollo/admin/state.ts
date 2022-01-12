import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateNewStateInput {
  @Field()
  name: string;

  @Field()
  aws_code: string;
}

@InputType()
export class DeleteStateInput {
  @Field(() => ID)
  state_id: number;
}
