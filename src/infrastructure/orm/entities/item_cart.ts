import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,Unique} from "typeorm";
import { Relation } from "typeorm";

import { Item } from "./item";
import { User } from "./user";
@Entity()
@Unique(['item', 'user'])
export class ItemCart {
	@CreateDateColumn({ type: 'timestamp' })
	added_at!: Date

	@PrimaryGeneratedColumn('uuid')
	cart_item_id!: string

    @JoinColumn({ name: 'item_id' })
	@ManyToOne(() => Item, { nullable: false, onDelete: "CASCADE" })
	item! : Relation<Item>
   
	@Column({ nullable: false, type: 'int' })
	quantity!: number

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
	user!: Relation<User>
}

