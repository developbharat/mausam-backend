import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Index(["id", "name", "aws_code"])
@Entity("states")
export class State {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  aws_code: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
