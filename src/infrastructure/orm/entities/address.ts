import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,Check } from "typeorm";
import { User } from "./user";
@Entity()
export class Address{
    @PrimaryGeneratedColumn('uuid')
    address_id!:string  
    @Column({type:"varchar",nullable:false,length:255})
    address_line1!:string
    @Column({type:"varchar",nullable:true,length:255})
    address_line2!:string
    @Column({type:"varchar",nullable:false,length:255})
    city!:string
    @Column({type:"varchar",nullable:false,length:255})
    state!:string
    @Column({type:"varchar",nullable:false,length:255})
    country!:string
    @Column({type:'int',nullable:false})
    pincode!:number
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;
    
}