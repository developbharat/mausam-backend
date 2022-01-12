import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateNewDistrictInput {
  @Field()
  name: string;

  @Field()
  aws_code: string;
}

@InputType()
export class DeleteDistrictInput {
  @Field(() => ID)
  district_id: number;
}
