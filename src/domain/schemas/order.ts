import * as z from "zod"
export interface PlaceOrder {
  address_id: string;
  discount_id?: string;
  payment_method: "CASH_ON_DELIVERY" | "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL";
  user_id: string;
}
export const PlaceOrderSchema = z.object({
  address_id: z.string().optional(),
  discount_id: z.string().optional(),
  payment_method: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "CASH_ON_DELIVERY"]).optional()
})