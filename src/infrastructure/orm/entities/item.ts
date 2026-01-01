import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { VariantCollection } from "./variant_collection";
import { BaseSlugEntity } from "../commanEntity/base-slug.entity";
import { Category } from "./category";
import { Relation } from "typeorm";
@Entity()
export class Item extends BaseSlugEntity {
	@PrimaryGeneratedColumn('uuid')
	item_id!: string

	getSlugSource(): string {
		return `${this.item_name}-${this.item_price}-${this.category || 'default'}-${this.item_id?.substring(0, 8) || ''}`;
	}

	@Column({ type: 'varchar', nullable: false, length: 255 })
	item_name!: string

	@Column({ type: 'int' })
	item_price!: number


	@ManyToOne(() => Category, (category) => category.items, { nullable: true, onDelete: "CASCADE" })
	@JoinColumn({ name: 'category_id' })
	category!: Relation<Category>;


	@Column({ type: 'decimal', nullable: true, precision: 3, scale: 2 })
	rating?: number

	@Column({ type: 'varchar', nullable: true, length: 100 })
	sku?: string

	@Column({ type: 'int', nullable: true })
	stock!: number

	@Column({ type: 'varchar', nullable: true, length: 255 })
	description!: string

	@OneToMany(() => VariantCollection, vc => vc.item_id)
	variant_collections?: string[]
}

