import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { VariantPropertys } from "./variantPropertys";

@Entity()
export class VariantValues {
	@PrimaryGeneratedColumn('uuid')
	variantValue_id!: string

	@Column({ type: 'varchar', nullable: false, length: 255 })
	variant_value!: string


	@ManyToOne(() => VariantPropertys, vp => vp.variant_property_values,{onDelete:"CASCADE" ,nullable:false})
	@JoinColumn({ name: 'variant_property_id', referencedColumnName: 'variantProperty_id' })
	variantProperty!: VariantPropertys
}

