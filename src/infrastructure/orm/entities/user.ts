import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Address } from "./address";
@Entity()
export class User {
  @OneToMany(() => Address, (address) => address.user_id)
  addresses!: Address[] | string[];

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ length: 255, nullable: false, type: "varchar", unique: true })
  email!: string;

  @Column({ length: 255, nullable: false, type: "varchar" })
  password!: string;

  @Column({ length: 10, nullable: false, type: "varchar", unique: true })
  phone_number!: string;

  @Column({ nullable: true, type: "varchar" })
  profile_image!: string;

  @Column({ nullable: true, type: "timestamp" })
  refresh_expires_at?: Date;

  @Column({ default: false, type: "boolean" })
  refresh_is_revoked?: boolean;

  @Column({ nullable: true, type: "text" })
  refresh_token?: null | string;

  @Column({default: "USER", enum: ["ADMIN", "USER"], type: "enum"})
  role!: "ADMIN" | "USER";

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column({ length: 50, nullable: false, type: "varchar", unique: true })
  username!: string;
  
  @Column({ length: 20, nullable: true, type: "varchar" })
  wishlist_name!: string;
}
