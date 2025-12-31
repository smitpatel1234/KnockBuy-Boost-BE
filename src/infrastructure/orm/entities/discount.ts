import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { BooleanTransformer } from "../Transformer/numbertoboolean";
@Entity()
export class Discount {
	@PrimaryGeneratedColumn('uuid')
	discount_id!: string

	@Column({ type: 'varchar', nullable: false, length: 255 })
	discount_name!: string
	@Column({ type: 'varchar', nullable: false, length: 255 })
	discount_code!: string

	@Column({ type: 'varchar', nullable: true, length: 20 })
	discount_type?: "percentage" | "flat"

	@Column({ type: 'float', nullable: true  })
	discount_amount?: number

	@Column({ type: 'int', nullable: true })
	duration?: number

	@Column({ type: 'varchar', nullable: true, length: 255 })
	description?: string

	@Column({ type: 'timestamp', nullable: true })
	discount_start_date?: Date
    
	@Column({ type: 'tinyint', nullable: true, default: false , transformer:new BooleanTransformer() })
	active_flag?: 1|0
}

