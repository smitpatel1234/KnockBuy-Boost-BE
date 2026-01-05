import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { Item } from "./item";
import { User } from "./user";
@Entity()
@Unique(['user', 'item'])
export class Wishlist {
	@JoinColumn({ name: 'item_id' })
	@ManyToOne(() => Item,{ nullable: false ,onDelete:"CASCADE"})
	item!: Item

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User,{ nullable: false ,onDelete:"CASCADE"})
	user!: User

	@PrimaryGeneratedColumn('uuid')
	wish_list_id!: string
}

