import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Item } from "./item";
import { VariantValues } from "./variantValues";
import { on } from "events";

@Entity()
export class ItemVariantValueMapping {
	@PrimaryGeneratedColumn('uuid')
	item_variantvalue_mapping_id!: string

	@ManyToOne(() => Item, {onDelete:'SET NULL'})
	@JoinColumn({ name: 'item_id' } )
	item!: Item | string

	@ManyToOne(() => VariantValues , {onDelete:'SET NULL'})
	@JoinColumn({ name: 'variantValue_id' })
	variantValue!: VariantValues
}

