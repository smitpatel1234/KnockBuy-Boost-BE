import { UserProfile } from "./User.models";

export interface OrderAllType {
  delivery_status?: string;
  isNew?:number
  order_date: Date;
  order_id: string;
  payment_method?: string;
  payment_status?: string;
  status?: string;
  total_amount?: number;
  user?:UserProfile
  username?: string;
}

export interface PlaceOrder {
  address_id: string;
  discount_id?: string;
  payment_method: "CASH_ON_DELIVERY" | "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL"; // Required now
  user_id?: string;
}

export interface UpdateOrderModel {
  address_id?: string;
  delivery_status?: string;
  order_id: string;
  payment_method?: string;
  payment_status?: string;
  status?: string;
}
