import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { Item } from "./item";
import { Order } from "./order";
@Entity()
@Unique(['order', 'item'])
export class OrderItems {
	@JoinColumn({ name: 'item_id' })
	@ManyToOne(() => Item)
	item!: Item

	@Column({ nullable: true, precision: 12, scale: 2, type: 'decimal' })
	item_purchase_price?: number

	@Column({ nullable: false, type: 'int' })
	item_quantity!: number

	@JoinColumn({ name: 'order_id' })
	@ManyToOne(() => Order, o => o.order_items)
	order!: Order

	@PrimaryGeneratedColumn('uuid')
	order_items_id!: string
}

