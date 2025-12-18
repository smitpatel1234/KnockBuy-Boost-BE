import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,Unique } from "typeorm";
import { User } from "./user";
import { Item } from "./item";
@Unique(['user', 'item'])
@Entity()
export class Wishlist {
	@PrimaryGeneratedColumn('uuid')
	wish_list_id!: string

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user!: User

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item!: Item
}

