import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { __AUTH_ROLE_ID_ADMIN__ } from "../../../../constants";
import { UserProfile } from "./UserProfile";
import { UserRole } from "./UserRole";

@ObjectType()
@Index(["id", "email", "mobile"])
@Entity("users")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ length: 10, nullable: true })
  mobile?: string;

  @Column({ type: "text" })
  passcode: string;

  @Field(() => UserProfile, { nullable: true })
  @JoinColumn()
  @OneToOne(() => UserProfile, { nullable: true, eager: true })
  profile?: UserProfile;

  @JoinColumn()
  @ManyToOne(() => UserRole, { nullable: true, eager: true })
  role: UserRole;

  @Field()
  @UpdateDateColumn()
  updated_at?: Date;

  @Field()
  @CreateDateColumn()
  created_at?: Date;

  public get is_admin(): boolean {
    return !!this.role && this.role.id === __AUTH_ROLE_ID_ADMIN__;
  }

  public static clean(user: User): User {
    Reflect.deleteProperty(user, "passcode");
    Reflect.deleteProperty(user, "role");
    return user;
  }
}
