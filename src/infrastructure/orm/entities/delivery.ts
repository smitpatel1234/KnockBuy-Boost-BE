import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Order } from "./order";

@Entity()
export class Delivery {
	@PrimaryGeneratedColumn('uuid')
	delivery_id!: string

	@Column({ type: 'varchar', length: 100 })
	delivery_state?: string

	@OneToOne(() => Order)
	@JoinColumn({ name: 'order_id' })
	order?: Order
}

