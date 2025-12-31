import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn ,Unique} from "typeorm";
import { Item } from "./item";
import { User } from "./user";

// @Unique(['item', 'user'])
@Entity()
export class ItemCart {
	@PrimaryGeneratedColumn('uuid')
	cart_item_id!: string

	@ManyToOne(() => Item,{nullable:true})
	@JoinColumn({ name: 'item_id' } )
	item_id! : Item
	
    @ManyToOne(() => User,{nullable:true})
	@JoinColumn({ name: 'user_id' })
	user_id!: User 

	@Column({ type: 'int', nullable: false })
	quantity!: number

	@CreateDateColumn({ type: 'timestamp' })
	added_at!: Date
}

