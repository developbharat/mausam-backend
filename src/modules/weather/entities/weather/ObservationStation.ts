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
import { District } from "../../../area";

@ObjectType()
@Entity("observation_stations")
@Index(["id", "name", "aws_code"])
export class ObservationStation {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  aws_code: string;

  @Field()
  @Column({ length: 20 })
  cat_code?: string;

  @Field(() => District)
  @JoinColumn()
  @ManyToOne(() => District, { eager: true })
  district: District;

  @Field()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @UpdateDateColumn()
  updated_at?: Date;
}
