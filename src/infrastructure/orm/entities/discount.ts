import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Discount {
	@PrimaryGeneratedColumn('uuid')
	discount_id!: string

    @Column({ type: 'varchar', nullable: false, length: 255 })
	discount_name!: string
	@Column({ type: 'varchar', nullable: false, length: 255 })
	discount_code!: string

	@Column({ type: 'decimal', nullable: true, precision: 2, scale: 2 })
	discount_type?: "percentage"|"falt amount"

    @Column({ type: 'decimal', nullable: true, precision: 2, scale: 2 })
	discount_amount?: number

	@Column({ type: 'varchar', nullable: true, length: 255 })
	duration?: string

    @Column({ type: 'varchar', nullable: true, length: 255 })
	description?: string

	@Column({ type: 'timestamp', nullable: true })
	discount_start_date?: Date

	@Column({ type: 'boolean', nullable: true, default: false })
	active_flag?: boolean
}

