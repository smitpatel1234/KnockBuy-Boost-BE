import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn ,Unique} from "typeorm";
import { Item } from "./item";
import { User } from "./user";
import { Relation } from "typeorm";
@Unique(['item', 'user'])
@Entity()
export class ItemCart {
	@PrimaryGeneratedColumn('uuid')
	cart_item_id!: string

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' } )
	item! : Relation<Item>
	
    @ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user!: Relation<User>
   
	@Column({ type: 'int', nullable: false })
	quantity!: number

	@CreateDateColumn({ type: 'timestamp' })
	added_at!: Date
}

