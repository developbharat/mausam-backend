import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_roles")
export class UserRole {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ unique: true })
  role_name: string;

  @Column({ type: "text", nullable: true })
  description: string;
}
