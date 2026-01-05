import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Order } from "./order";

@Entity()
export class Delivery {
	@PrimaryGeneratedColumn('uuid')
	delivery_id!: string

	@Column({ length: 100, type: 'varchar' })
	delivery_state?: string

	@JoinColumn({ name: 'order_id' })
	@OneToOne(() => Order)
	order?: Order
}

