import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn ,Unique} from "typeorm";
import { Order } from "./order";
import { Item } from "./item";
@Unique(['order','item'])
@Entity()
export class OrderItems {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@ManyToOne(() => Order, o => o.order_items)
	@JoinColumn({ name: 'order_id' })
	order!: Order

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item!: Item

	@Column({ type: 'int', nullable: false })
	item_quantity!: number

	@Column({ type: 'decimal', nullable: true, precision: 12, scale: 2 })
	item_purchase_price?: number
}

