import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../auth/User";
import { ObservationStation } from "../weather/ObservationStation";
import { IPV4Address } from "./IPV4Address";

@ObjectType()
@Entity("user_apps")
export class UserApplication {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  description?: string;

  @Field()
  @Column({ type: "text", unique: true })
  access_token: string;

  @Field(() => [IPV4Address], { nullable: true })
  @JoinTable()
  @ManyToMany(() => IPV4Address, { eager: true })
  ips?: IPV4Address[];

  @Field(() => [ObservationStation], { nullable: true })
  @JoinTable()
  @ManyToMany(() => ObservationStation, { eager: true })
  stations?: ObservationStation[];

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  public static clean(app: UserApplication): UserApplication {
    Reflect.deleteProperty(app, "user");
    return app;
  }
}
