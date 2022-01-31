import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateApplicationInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class SetApplicationIPv4StatusInput {
  @Field(() => ID)
  application_id: number;

  @Field()
  ipv4: string;
}

@InputType()
export class UpdateApplicationObservationStationInput {
  @Field(() => ID)
  application_id: number;

  @Field(() => ID)
  station_id: number;
}
