import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Item } from "./item";
@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  category_id!: string | undefined ;

  @Column({ length: 100, type: "varchar" })
  category_name!: string;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories!: Category[] | string[];
  @Column({ length: 255, nullable: true, type: "varchar" })
  description?: string;

  @Column({ length: 255, nullable: true, type: "varchar" })
  image_url?: string;

  @OneToMany(() => Item, (Item) => Item.category)
  items!: Item[] | string[];

  @JoinColumn({ name: "parent_category_id" })
  @ManyToOne(() => Category, (category) => category.childCategories, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parentCategory!: Category | null | string;
}
