import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { Relation } from "typeorm";

import { Item } from "./item";
import { User } from "./user";

@Entity()
@Unique(["user", "item"])
export class Review {
    @Column({ nullable: true, type: "text" })
    comment?: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @JoinColumn({ name: "item_id" })
    @ManyToOne(() => Item, { onDelete: "CASCADE" })
    item!: Relation<Item>;

    @Column()
    item_id!: string;

    @Column({ type: "tinyint" })
    rating!: number;

    @PrimaryGeneratedColumn("uuid")
    review_id!: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    user!: Relation<User>;

    @Column()
    user_id!: string;
}
