import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("user_profiles")
export class UserProfile {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column()
  full_name: string;
}
