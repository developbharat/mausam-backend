import { Field, ID, InputType, ObjectType } from "type-graphql";
import { PaginatedResult } from "../../../apollo/common/PaginatedResult";
import { PaginationInput } from "../../../apollo/common/PaginationInput";
import { WeatherObservation } from "../../../entities/weather/WeatherObservation";

@InputType()
export class ListObservationsInput extends PaginationInput {
  @Field()
  access_token: string;

  @Field(() => ID)
  station_id: number;

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;
}

@ObjectType()
export class ListObservationResult extends PaginatedResult {
  @Field(() => [WeatherObservation])
  data: WeatherObservation[];
}
