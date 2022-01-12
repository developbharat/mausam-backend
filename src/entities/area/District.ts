import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { State } from "./State";

@ObjectType()
@Index(["id", "name", "aws_code"])
@Entity("districts")
export class District {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  aws_code: string;

  @JoinColumn()
  @ManyToOne(() => State, { eager: true })
  state: State;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  public static clean(district: District): District {
    Reflect.deleteProperty(district, "state");
    return district;
  }
}
