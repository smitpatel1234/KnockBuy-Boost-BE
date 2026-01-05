import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Item } from "./item";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  image_items_id!: string;

  @Column({ length: 2048, nullable: false, type: "varchar" })
  image_URL!: string;

  @JoinColumn({ name: "items_id" })
  @ManyToOne(() => Item,{nullable:false,onDelete:"CASCADE"})
  item?: Item;
}
