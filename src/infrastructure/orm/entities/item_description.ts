import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Relation } from "typeorm";

import { Item } from "./item";

@Entity()
export class ItemDescription {
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @PrimaryGeneratedColumn("uuid")
    description_id!: string;

    @Column({ nullable: true, type: "text" })
    how_its_made?: string;

    @Column({ nullable: true, type: "text" })
    how_to_use?: string;

    @JoinColumn({ name: "item_id" })
    @OneToOne(() => Item, { onDelete: "CASCADE" })
    item!: Relation<Item>;

    @Column()
    item_id!: string;

    @Column({ nullable: true, type: "json" })
    key_features?: Record<string, string>;

    @Column({ nullable: true, type: "json" })
    specifications?: string[];

    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}
