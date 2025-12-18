import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Item } from "./item";

@Entity()
export class Discount {
	@PrimaryGeneratedColumn('uuid')
	discount_id!: string

	@ManyToOne(() => Item)
	item?: Item

	@Column({ type: 'decimal', nullable: true, precision: 2, scale: 2 })
	discount_percentage?: number

	@Column({ type: 'timestamp', nullable: true })
	discount_start_date?: Date

	@Column({ type: 'timestamp', nullable: true })
	discount_end_date?: Date

	@Column({ type: 'boolean', nullable: true, default: false })
	active_flag?: boolean
}

