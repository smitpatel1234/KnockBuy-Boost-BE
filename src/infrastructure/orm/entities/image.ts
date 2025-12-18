import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Item } from "./item";

@Entity()
export class Image {
	@PrimaryGeneratedColumn('uuid')
	image_items_id!: string

	@Column({ type: 'varchar', nullable: false, length: 2048 })
	image_URL!: string

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'items_id' })
	item?: Item
}

