import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { VariantValues } from "./variantValues";

@Entity()
export class VariantPropertys {
	@PrimaryGeneratedColumn('uuid')
	variantProperty_id!: string

	@Column({ type: 'varchar', nullable: false, length: 255 })
	property_name!: string

	@OneToMany(() => VariantValues, vv => vv.variantProperty)
	variant_property_values?: VariantValues[]
}
