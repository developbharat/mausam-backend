import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int, { nullable: true })
  limit: number;
}
