import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { VariantPropertys } from "./variantPropertys";

@Entity()
export class VariantValues {
	@Column({ length: 255, nullable: false, type: 'varchar' })
	variant_value!: string

	@JoinColumn({ name: 'variant_property_id', referencedColumnName: 'variantProperty_id' })
	@ManyToOne(() => VariantPropertys, vp => vp.variant_property_values,{nullable:false ,onDelete:"CASCADE"})
	variantProperty!: VariantPropertys


	@PrimaryGeneratedColumn('uuid')
	variantValue_id!: string
}

