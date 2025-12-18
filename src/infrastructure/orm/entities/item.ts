import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { VariantCollection } from "./variant_collection";
import { BaseSlugEntity } from "../commanEntity/base-slug.entity";

@Entity()
export class Item extends BaseSlugEntity {
	@PrimaryGeneratedColumn('uuid')
	item_id!: string
    
	getSlugSource(): string {
	return `${this.item_name}-${this.item_price}-${this.category}-${this.item_id.substring(0, 8)}`;
   }
 

	@Column({ type: 'varchar', nullable: false, length: 255 })
	item_name!: string

	@Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
	item_price!: number

	@Column({ type: 'varchar', nullable: true, length: 100 })
	category?: string

	@Column({ type: 'decimal', nullable: true, precision: 3, scale: 2 })
	rating?: number

	@Column({ type: 'varchar', nullable: true, length: 100 })
	sku?: string

	@Column({ type: 'int', nullable: true })
	stock?: number

	@Column({ type: 'text', nullable: true })
	text?: string

	@OneToMany(() => VariantCollection, vc => vc.item_id)
	variant_collections?: VariantCollection[]
}

