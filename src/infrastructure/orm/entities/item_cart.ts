import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn ,Unique} from "typeorm";
import { Item } from "./item";
import { User } from "./user";

@Unique(['item', 'user'])
@Entity()
export class ItemCart {
	@PrimaryGeneratedColumn('uuid')
	cart_item_id!: string

	@ManyToOne(() => Item,{onDelete:"CASCADE",nullable:false})
	@JoinColumn({ name: 'item_id' } )
	item!: Item
	
    @ManyToOne(() => User,{onDelete:"CASCADE",nullable:false})
	@JoinColumn({ name: 'user_id' })
	user!: User

	@Column({ type: 'int', nullable: false })
	quantity!: number

	@CreateDateColumn({ type: 'timestamp' })
	added_at!: Date
}

