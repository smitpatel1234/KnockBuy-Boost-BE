import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { Relation } from "typeorm";

import { BaseSlugEntity } from "../commanEntity/base-slug.entity";
import { Category } from "./category";
import { Image } from "./image";
import { VariantCollection } from "./variant_collection";

@Entity()
export class Item extends BaseSlugEntity {
	@JoinColumn({ name: 'category_id' })
	@ManyToOne(() => Category, (category) => category.items, { nullable: true, onDelete: "SET NULL" })
	category!: Relation<Category>;

	@DeleteDateColumn()
	deleted_at?: Date;

	@Column({ length: 255, nullable: true, type: 'varchar' })
	description!: string

	@OneToMany(() => Image, (image) => image.item)
	images?: Image[];


	@PrimaryGeneratedColumn('uuid')
	item_id!: string


	@Column({ length: 255, nullable: false, type: 'varchar' })
	item_name!: string

	@Column({ type: 'int' })
	item_price!: number

	@Column({ nullable: true, precision: 3, scale: 2, type: 'decimal' })
	rating?: number

	@Column({ length: 100, nullable: true, type: 'varchar' })
	sku?: string

	@Column({ nullable: true, type: 'int' })
	stock!: number

	@OneToMany(() => VariantCollection, vc => vc.variant_collection_id)
	variant_collections?: string[]
   
	getSlugSource(): string {
		return `${this.item_name}-${String(this.item_price)}-${this.category.category_id}-${this.description}-${crypto.randomUUID()}`;
	}
	@VersionColumn()
    version!: number
}

