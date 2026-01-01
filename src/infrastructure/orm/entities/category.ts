import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Item } from "./item";
@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  category_id!: string;

  @Column({ type: "varchar", length: 100 })
  category_name!: string;

  @ManyToOne(() => Category, (category) => category.childCategories, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_category_id" })
  parentCategory!: Category | string | null;
  @OneToMany(() => Item, (Item) => Item.category)
  items!: Item[] | string[];

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories!: Category[] | string[];

  @Column({ nullable: true, type: "varchar", length: 255 })
  image_url?: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  description?: string;
}
