import { Field, InputType } from "type-graphql";

@InputType()
export class LoginViaMobileInput {
  @Field()
  mobile: string;

  @Field()
  passcode: string;
}

@InputType()
export class CreateNewAccountInput {
  @Field()
  full_name: string;

  @Field()
  email: string;

  @Field()
  passcode: string;
}

@InputType()
export class LoginViaEmailInput {
  @Field()
  email: string;

  @Field()
  passcode: string;
}

@InputType()
export class UpdateProfileInput {
  @Field()
  full_name: string;
}
