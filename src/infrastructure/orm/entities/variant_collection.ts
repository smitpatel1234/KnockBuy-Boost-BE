import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Item } from "./item";

@Entity()
export class VariantCollection {
	@PrimaryGeneratedColumn('uuid')
	variant_collection_id!: string
 
	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item_id!: Item
    @ManyToOne(() => Item)
	@JoinColumn({ name: 'variant_item_id' })
	variant_item_id?: Item
}

