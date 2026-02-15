import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { Relation } from "typeorm";

import { BaseSlugEntity } from "../commanEntity/base-slug.entity";
import { Category } from "./category";
import { Image } from "./image";
import { ItemDescription } from "./item_description";
import { Review } from "./review";
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

	@OneToMany(() => Review, (review) => review.item)
	reviews?: Review[];

	@OneToOne(() => ItemDescription, (id) => id.item)
	rich_description?: Relation<ItemDescription>;

	@Column({ length: 100, nullable: true, type: 'varchar' })
	sku?: string

	@Column({ nullable: true, type: 'int' })
	stock!: number

	@OneToMany(() => VariantCollection, vc => vc.variant_collection_id)
	variant_collections?: string[]

	@VersionColumn()
	version!: number
	getSlugSource(): string {
		const category = this.category as unknown as null | { category_id?: null | string };
		const categoryId = category?.category_id ?? '';

		return `${this.item_name}-${String(this.item_price)}-${categoryId}-${this.description}-${crypto.randomUUID()}`;
	}
}

