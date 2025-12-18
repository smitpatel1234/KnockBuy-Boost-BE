import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Address } from "./address";
import { User } from "./user";
import { OrderItems } from "./order_items";

@Entity()
export class Order {
	@PrimaryGeneratedColumn('uuid')
	order_id!: string

	@ManyToOne(() => Address) //many address can map to one order
	@JoinColumn({ name: 'address_id' })
	address!: Address

	@CreateDateColumn({ type: 'timestamp' })
	order_date!: Date

	@Column({ type: 'varchar', nullable: true, length: 50 })
	status?: string

	@ManyToOne(() => User) // many user can map to one order
	@JoinColumn({ name: 'user_id' })
	user!: User

	@Column({ type: 'decimal', nullable: true, precision: 12, scale: 2 })
	TotalAmount?: number

	@Column({ type: 'timestamp', nullable: true })
	invoice_date?: Date

	@Column({ type: 'decimal', nullable: true, precision: 12, scale: 2 })
	subtotal?: number

	@Column({ type: 'decimal', nullable: true, precision: 12, scale: 2 })
	tax?: number

	@Column({ type: 'decimal', nullable: true, precision: 12, scale: 2 })
	total_amount?: number

	@Column({ type: 'varchar', nullable: true, length: 50 })
	payment_status?: string

	@Column({ type: 'varchar', nullable: true, length: 50 })
	payment_method?: string

	@OneToMany(() => OrderItems, oi => oi.order) 
	order_items?: OrderItems[]
}

