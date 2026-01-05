import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { VariantValues } from "./variantValues";

@Entity()
export class VariantPropertys {
	@Column({ length: 255, nullable: false, type: 'varchar' })
	property_name!: string

	@OneToMany(() => VariantValues, vv => vv.variantProperty)
	variant_property_values?: VariantValues[]

	@PrimaryGeneratedColumn('uuid')
	variantProperty_id!: string
}
