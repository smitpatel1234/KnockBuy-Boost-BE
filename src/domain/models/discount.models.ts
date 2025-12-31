export interface AddDiscountModel {
    discount_name: string;
    discount_code: string;
    discount_type: "percentage" | "flat";
    discount_amount: number;
    duration?: number;
    description?: string;
    discount_start_date?: Date;
    active_flag?: 1|0;
}

export interface DiscountModel extends AddDiscountModel {
    discount_id: string;
}

export interface GetDiscountModel extends AddDiscountModel {
    discount_id: string;
}
