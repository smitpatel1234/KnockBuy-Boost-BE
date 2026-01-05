import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BooleanTransformer } from "../Transformer/numbertoboolean";
@Entity()
export class Discount {
	@Column({ default: false, nullable: true, transformer:new BooleanTransformer() , type: 'tinyint' })
	active_flag?: 0|1

	@Column({ length: 255, nullable: true, type: 'varchar' })
	description?: string
	@Column({ nullable: true, type: 'float'  })
	discount_amount?: number

	@Column({ length: 255, nullable: false, type: 'varchar' })
	discount_code!: string

	@PrimaryGeneratedColumn('uuid')
	discount_id!: string

	@Column({ length: 255, nullable: false, type: 'varchar' })
	discount_name!: string

	@Column({ nullable: true, type: 'timestamp' })
	discount_start_date?: Date

	@Column({ length: 20, nullable: true, type: 'varchar' })
	discount_type?: "flat" | "percentage"
    
	@Column({ nullable: true, type: 'int' })
	duration?: number
}

