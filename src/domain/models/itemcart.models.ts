import e from "express"
import { Item } from "../../infrastructure/orm/entities/item"
export type ItemCartType ={
    cart_item_id: string,
    item: string ,
    user: string,
    quantity: number,
}
export type ItemCartUpdateType = Pick<ItemCartType , 'cart_item_id' | 'quantity'>
export type ItemCartDeleteType = Pick<ItemCartType , 'cart_item_id'>
export type AddItemCartType = Omit<ItemCartType , 'cart_item_id'> 
export type GetAllItemCartType ={
    cart_item_id: string,
    item: Pick<Item , 'item_id' | 'item_name' | 'item_price' | 'stock'  > ,
    user: string,
    quantity: number,
    added_at: Date
}
