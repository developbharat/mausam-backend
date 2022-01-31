import { ObjectType, Int, Field } from "type-graphql";

@ObjectType()
export class PaginatedResult {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field()
  is_last_page: Boolean;
}
