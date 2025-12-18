import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Item } from "./item";
import { VariantValues } from "./variantValues";

@Entity()
export class ItemVariantValueMapping {
	@PrimaryGeneratedColumn('uuid')
	item_variantvalue_mapping_id!: string

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item!: Item

	@ManyToOne(() => VariantValues)
	@JoinColumn({ name: 'variantValue_id' })
	variantValue!: VariantValues
}

