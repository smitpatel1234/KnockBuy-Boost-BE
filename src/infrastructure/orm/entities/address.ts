import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./user";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  address_id!: string;
  @Column({ length: 255, nullable: false, type: "varchar" })
  address_line1!: string;
  @Column({ length: 255, nullable: true, type: "varchar" })
  address_line2!: string;
  @Column({ length: 255, nullable: false, type: "varchar" })
  city!: string;
  @Column({ length: 255, nullable: false, type: "varchar" })
  country!: string;
  @DeleteDateColumn()
  deletedAt?: Date;
  @Column({ nullable: false, type: "int" })
  pincode!: number;
  @Column({ length: 255, nullable: false, type: "varchar" })
  state!: string;
  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user_id!: string | User;
}
