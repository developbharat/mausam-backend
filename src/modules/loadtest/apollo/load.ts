import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field()
  full_name: string;
}

@ObjectType()
export class LoadResult {
  @Field(() => ID)
  id: number;

  @Field(() => Profile)
  profile: Profile;

  @Field()
  email: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
