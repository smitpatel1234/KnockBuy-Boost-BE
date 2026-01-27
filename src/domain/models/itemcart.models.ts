import { Item } from "../../infrastructure/orm/entities/item"
export type AddItemCartType = Omit<ItemCartType , 'cart_item_id'>
export type GetAllItemCartType =Pick<Item , 'item_id' | 'item_name' | 'item_price' | 'stock'  > &  {
    added_at: Date
   
    cart_item_id: string,
    quantity: number,
    user: string,
}
export type ItemCartDeleteType = Pick<ItemCartType , 'cart_item_id'>
export interface ItemCartType {
    cart_item_id: string,
    item: string ,
    quantity: number,
    user: string,
} 
export type ItemCartUpdateType = Pick<ItemCartType , 'cart_item_id' | 'item' | 'quantity'> 
