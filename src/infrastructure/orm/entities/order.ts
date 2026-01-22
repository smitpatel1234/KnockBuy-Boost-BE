import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation ,DeleteDateColumn} from "typeorm";

import { Address } from "./address";
import { Discount } from "./discount";
import { OrderItems } from "./order_items";
import { User } from "./user";
@Entity()
export class Order {
	@JoinColumn({ name: 'address_id' })
	@ManyToOne(() => Address, { nullable: true ,onDelete:"SET NULL"} )
	address?: Relation<Address>

	@Column({ default: 'pending', length: 50, nullable: true, type: 'varchar' })
	delivery_status?: string

	@JoinColumn({ name: 'discount_id' },)
	@ManyToOne(() => Discount, { nullable: true ,onDelete:"SET NULL"})
	discount?: Relation<Discount>

	@Column({ nullable: true, type: 'timestamp' })
	invoice_date?: Date

	@CreateDateColumn({ type: 'timestamp' })
	order_date!: Date

	@PrimaryGeneratedColumn('uuid')
	order_id!: string

	@OneToMany(() => OrderItems, oi => oi.order)
	order_items?: OrderItems[]

	@Column({ length: 50, nullable: true, type: 'varchar' })
	payment_method?: string

	@Column({ length: 50, nullable: true, type: 'varchar' })
	payment_status?: string

	@Column({ length: 50, nullable: true, type: 'varchar' })
	status?: string

	@Column({ nullable: true, precision: 12, scale: 2, type: 'decimal' })
	subtotal?: number

	@Column({ nullable: true, precision: 12, scale: 2, type: 'decimal' })
	tax?: number

	@Column({ nullable: true, precision: 12, scale: 2, type: 'decimal' })
	total_amount?: number

	@Column({ type:'tinyint', default: 1})
	isNew?: number

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	user!: Relation<User>
	@DeleteDateColumn()
	deleted_at?: Date;
}

