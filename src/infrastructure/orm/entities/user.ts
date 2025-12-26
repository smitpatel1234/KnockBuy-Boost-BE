import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany ,DeleteDateColumn} from "typeorm";
import { Address } from "./address";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({ type: "varchar", unique: true, nullable: false, length: 50 })
  username!: string;

  @Column({ type: "varchar", nullable: false, unique: true, length: 255 })
  email!: string;

  @Column({ type: "varchar", nullable: false, length: 255 })
  password!: string;

  @Column({ type: "int", nullable: false, unique: true })
  phone_number!: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @Column({ type: "varchar", length: 20, nullable: true })
  wishlist_name!: string;

  @OneToMany(() => Address, (address) => address.user_id)
  addresses!: Address[] | string[];

  @Column({ type: 'text', nullable: true })
  refresh_token?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  refresh_expires_at?: Date;

  @Column({ type: 'boolean', default: false })
  refresh_is_revoked?: boolean;
  @DeleteDateColumn()
  deletedAt?: Date; 
  
}
