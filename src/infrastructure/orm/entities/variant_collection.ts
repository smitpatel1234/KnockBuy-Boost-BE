import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

import { Item } from "./item";

@Entity()
export class VariantCollection {
	@JoinColumn({ name: 'item_id' })
	@ManyToOne(() => Item, { nullable: false, onDelete: "CASCADE" })
	main_item!: Relation<Item>

	@PrimaryGeneratedColumn('uuid')
	variant_collection_id!: string
	@JoinColumn({ name: 'variant_item_id' })
	@ManyToOne(() => Item,  { nullable:false , onDelete:"CASCADE"  })
	variant_item?: Relation<Item>
}

