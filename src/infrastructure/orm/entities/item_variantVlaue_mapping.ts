import { on } from "events";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Item } from "./item";
import { VariantValues } from "./variantValues";

@Entity()
export class ItemVariantValueMapping {
	@JoinColumn({ name: 'item_id' } )
	@ManyToOne(() => Item, {onDelete:'SET NULL'})
	item!: Item | string

	@PrimaryGeneratedColumn('uuid')
	item_variantvalue_mapping_id!: string

	@JoinColumn({ name: 'variantValue_id' })
	@ManyToOne(() => VariantValues , {onDelete:'SET NULL'})
	variantValue!: VariantValues
}

