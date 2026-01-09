import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, Unique } from "typeorm";

import { Item } from "./item";
import { User } from "./user";
@Entity()
@Unique(['user', 'item'])
export class Wishlist {
	@JoinColumn({ name: 'item_id' })
	@ManyToOne(() => Item,{ nullable: false ,onDelete:"CASCADE"})
	item!: Relation<Item>

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User,{ nullable: false ,onDelete:"CASCADE"})
	user!: Relation<User>

	@PrimaryGeneratedColumn('uuid')
	wish_list_id!: Relation<string>
}

